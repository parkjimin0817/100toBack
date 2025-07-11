package com.bridge.kinder.service;


import com.bridge.kinder.dto.VacationDto;
import com.bridge.kinder.dto.VacationDto.Request;
import com.bridge.kinder.dto.VacationDto.Response;
import com.bridge.kinder.entity.*;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AdmissionStatus;
import com.bridge.kinder.enums.CommonEnums.VacationType;
import com.bridge.kinder.repository.*;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class VacationServiceImpl implements VacationService {

    private final VacationRepository vacationRepository;
    private final MemberRepository memberRepository;
    private final LeaveRepository leaveRepository;
    private final AttendanceRepository attendanceRepository;
    private final String UPLOAD_PATH = "C://test_upload/";

    //휴가 신청
    @Override
    public Response requestVacation(int memberNo, VacationDto.Request request) throws IOException {
        //멤버 조회
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 교사입니다."));

        //첨부파일 처리
        String originName = null;
        String attachmentPath = null;

        if(request.getAttachment() != null && !request.getAttachment().isEmpty()) {
            originName = request.getAttachment().getOriginalFilename();
            attachmentPath = UUID.randomUUID().toString() + "_vacation_" + originName;

            File uplodadDir = new File(UPLOAD_PATH);
            if (!uplodadDir.exists()) {
                uplodadDir.mkdirs();
            }

            request.getAttachment().transferTo(new File(UPLOAD_PATH + attachmentPath));
        }

            //휴가 신청
            Vacation vacation = request.toEntity(member, attachmentPath);
            vacationRepository.save(vacation);


            //휴가인 경우 연차 일수 삭감
            if(!vacation.getType().equals(VacationType.WORKATION)) {
                Leave leave = leaveRepository.findByMember_MemberNo(memberNo)
                        .orElseThrow(() -> new RuntimeException("해당 교사의 연차 정보가 없습니다."));

                long days = ChronoUnit.DAYS.between(vacation.getStartDate(), vacation.getEndDate()) + 1;
                leave.useLeave((int) days);
            }


        return VacationDto.Response.toDto(vacation, member);
    }

    //멤버 별 휴가 조회
    @Override
    public List<Response> getVacationsByMember(int memberNo) {
        List<Vacation> vacations = vacationRepository.findByMember_MemberNo(memberNo);

        return vacations.stream()
                .map( v -> VacationDto.Response.toDto(v, v.getMember()))
                .collect(Collectors.toList());
    }

    //휴가 신청 삭제
    @Override
    public void deleteVacation(long vacationNo) {

        Vacation vacation = vacationRepository.findById(vacationNo)
                .orElseThrow(() -> new RuntimeException("해당 휴가 신청이 존재하지 않습니다."));
        if(!vacation.getStatus().equals(AdmissionStatus.PENDING)) {
            throw new IllegalArgumentException("승인 대기 중인 휴가만 삭제할 수 있습니다.");
        }

        //연차 일수 복구
        if(!vacation.getType().equals(VacationType.WORKATION)) {
            Member member = vacation.getMember();
            Leave leave = leaveRepository.findByMember_MemberNo(member.getMemberNo())
                    .orElseThrow(() -> new RuntimeException("해당 교사의 연차 정보가 없습니다."));

            long days = ChronoUnit.DAYS.between(vacation.getStartDate(), vacation.getEndDate()) + 1;
            leave.cancelLeave((int) days);
        }
        vacationRepository.deleteById(vacationNo);
    }

    @Override
    public Page<Response> getVacationListPaged(int centerNo, String type, Pageable pageable) {
        VacationType vacationType = null;

        try{
            vacationType = VacationType.valueOf(type);
        } catch(IllegalArgumentException | NullPointerException e){
            //잘못된 타입이나 null이 들어온 경우 vacationType null유지
        }

        Page<Vacation> vacationPage;
        if(vacationType != null) {
            //vacated,workcation 핕터
            vacationPage = vacationRepository.findByMember_Center_CenterNoAndType(centerNo, vacationType, pageable);
        } else {
            //전체
            vacationPage = vacationRepository.findByMember_Center_CenterNo(centerNo, pageable);
        }

        return vacationPage.map(v -> VacationDto.Response.toDto(v, v.getMember()));

    }


    //휴가 승인
    @Override
    public Response approveVacation(long vacationNo) {
        Vacation vacation = vacationRepository.findById(vacationNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 휴가 신청입니다."));

        if(!vacation.getStatus().equals(AdmissionStatus.PENDING)) {
            throw new RuntimeException("이미 처리된 휴가 신청입니다.");
        }

        vacation.approve();
        Vacation updated = vacationRepository.save(vacation);

        //휴가 승인된 날짜 근태 상태 휴가로 바꾸기
        LocalDate startDate = vacation.getStartDate();
        LocalDate endDate = vacation.getEndDate();
        Member member = vacation.getMember();
        Center center = vacation.getMember().getCenter();
        CommonEnums.VacationType type = updated.getType();

        //for (int i = 0; i < 10; i++)
        for(LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {

            CommonEnums.TeacherAttendanceStatus attendanceStatus;

            if ( type.equals(CommonEnums.VacationType.WORKATION) ) {
                attendanceStatus = CommonEnums.TeacherAttendanceStatus.WORKCATION;
            } else if ( type.equals(VacationType.VACATED)) {
                attendanceStatus = CommonEnums.TeacherAttendanceStatus.VACATION;
            } else {
                throw new IllegalArgumentException("올바른 휴가 유형이 아닙니다.");
            }

            Attendance attendance = Attendance.builder()
                    .member(member)
                    .center(center)
                    .attendanceDate(date)
                    .status(attendanceStatus)
                    .build();

            attendanceRepository.save(attendance);
        }

        return VacationDto.Response.toDto(updated, updated.getMember());
    }

    //휴가 거절
    @Override
    public Response rejectVacation(long vacationNo) {
        Vacation vacation = vacationRepository.findById(vacationNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 휴가 신청입니다."));

        if(!vacation.getStatus().equals(AdmissionStatus.PENDING)) {
            throw new RuntimeException("이미 처리된 휴가 신청입니다.");
        }

        //휴가 거절 되면 연차 복구
        if(!vacation.getType().equals(VacationType.WORKATION)) {
            Member member = vacation.getMember();
            Leave leave = leaveRepository.findByMember_MemberNo(member.getMemberNo())
                    .orElseThrow(() -> new RuntimeException("해당 교사의 연차 정보가 없습니다."));

            long days = ChronoUnit.DAYS.between(vacation.getStartDate(), vacation.getEndDate()) + 1;
            leave.cancelLeave((int) days);
        }

        vacation.reject();
        Vacation updated = vacationRepository.save(vacation);
        return VacationDto.Response.toDto(updated, updated.getMember());
    }
}
