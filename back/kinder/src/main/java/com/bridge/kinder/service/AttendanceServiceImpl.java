package com.bridge.kinder.service;

import com.bridge.kinder.dto.AttendanceDto;
//import com.bridge.kinder.dto.AttendanceDto.ClassAttendance;
import com.bridge.kinder.dto.AttendanceDto.CreateAttendance;
import com.bridge.kinder.dto.AttendanceDto.Response;
import com.bridge.kinder.dto.AttendanceDto.UpdateAttendance;
import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.ChildAttendanceStatus;
import com.bridge.kinder.repository.AttendanceRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ChildRepository;
import com.bridge.kinder.repository.ClassRoomRepository;
import com.bridge.kinder.repository.MemberRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;
    private final ClassRoomRepository classRoomRepository;

    //로그인 시 당일 조회
    @Override
    public AttendanceDto.Response getTodayAttendance(int memberNo) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay(); //2025-01-01T00:00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); //2025-01-01T23:59:59.999

        List<Attendance> result = attendanceRepository.findByMemberNoAndDateRange(memberNo, startOfDay, endOfDay);

        // 출근 기록이 있으면 toDto 변환
        return result.stream()
                .findFirst()
                .map(AttendanceDto.Response::toDto) // 이미 출근 기록 있으면
                .orElseGet(() -> AttendanceDto.Response.builder() //출근 기록 없으면
                        .in_time(null)
                        .out_time(null)
                        .member_no(memberNo)
                        .build());
    }

    //출근기록
    @Override
    public AttendanceDto.Response recordWorkIn(int memberNo) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay(); //2025-01-01T00:00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); //2025-01-01T23:59:59.999

        //멤버 불러오기
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        //멤버의 센터 정보
        Center center = Optional.ofNullable(member.getCenter())
                .orElseThrow(() -> new RuntimeException("멤버에 센터 정보가 없습니다"));

        //오늘 출근 기록 여부 확인
        List<Attendance> result = attendanceRepository.findByMemberNoAndDateRange(memberNo, startOfDay, endOfDay);
        if(!result.isEmpty()){
            throw new RuntimeException("이미 출근 기록이 존재합니다.");
        }

        //출근 기록 생성
        Attendance newAttendance = Attendance.builder()
                .member(member)
                .inTime(LocalDateTime.now())
                .outTime(null)
                .center(center)
                .build();

        Attendance savedAttendance = attendanceRepository.save(newAttendance);
        return AttendanceDto.Response.toDto(savedAttendance);
    }

    //퇴근 기록
    @Override
    public AttendanceDto.Response recordWorkOut(int memberNo) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay(); //2025-01-01T00:00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); //2025-01-01T23:59:59.999
        //멤버 불러오기
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        //현재 날짜 시간
        LocalDateTime now = LocalDateTime.now();

        //오늘 출퇴근 기록 조회하기
        List<Attendance> result = attendanceRepository.findByMemberNoAndDateRange(memberNo, startOfDay, endOfDay);
        Attendance attendance = result.stream().findFirst()
                .orElseThrow(() -> new RuntimeException("출근 기록이 존재하지 않습니다.")) ;

        //이미 퇴근이 있는 경우 예외 처리
        if(attendance.getOutTime() != null){
            throw new RuntimeException("이미 퇴근 기록이 존재합니다.");
        }

        attendance.updateOutTime(LocalDateTime.now());
        return AttendanceDto.Response.toDto(attendance);
    }

    //교사 월별 기록
    @Override
    public List<AttendanceDto.Response> getTeacherMonthlyAttendance(int memberNo, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1); //시작 날짜  06.01
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth()); //끝 날짜 06.30

        LocalDateTime startDateTime = startDate.atStartOfDay(); // 2025-06-01T00:00
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX); // 2025-06-30T23:59:59.999

        List<Attendance> monthlyList = attendanceRepository.findByMemberNoAndDateRange(memberNo, startDateTime, endDateTime);

        return monthlyList.stream()
                .map(AttendanceDto.Response::toDto)
                .collect(Collectors.toList());
    }

    //아동 출결 추가 및 정보 불러오기
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    public List<AttendanceDto.CreateAttendance> createChildAttendance(AttendanceDto.CreateAttendance dto) {
        // 1. 반 조회
        ClassRoom classRoom = classRoomRepository.findById(dto.getClass_no())
                .orElseThrow(() -> new IllegalArgumentException("해당 반이 존재하지 않습니다. classNo=" + dto.getClass_no()));

        // 2. 해당 반에 해당 날짜의 출결 정보를 미리 모두 조회
        List<ChildAttendance> existingAttendances = attendanceRepository.findByClassNoAndCreateDate(
                dto.getClass_no(), dto.getCreate_date()
        );

        // 3. 이미 출결 등록된 아동 번호 목록 만들기
        Set<Integer> existingChildNos = existingAttendances.stream()
                .map(att -> att.getChild().getChildNo())
                .collect(Collectors.toSet());

        // 4. 반에 속한 전체 아동 조회
        List<Child> childList = childRepository.findByClassRoom(classRoom);

        // 5. 아직 출결 정보가 없는 아동만 필터링해서 저장 리스트 생성
        List<ChildAttendance> toSaveList = childList.stream()
                .filter(child -> !existingChildNos.contains(child.getChildNo()))
                .map(child -> ChildAttendance.builder()
                        .child(child)
                        .classRoom(classRoom)
                        .createDate(dto.getCreate_date())
                        .status(null)
                        .build())
                .toList();

        if (toSaveList.isEmpty()) {
            log.info("이미 모든 출결이 등록되어 저장할 데이터가 없습니다.");
            return existingAttendances.stream()
                    .map(AttendanceDto.CreateAttendance::toDto)
                    .collect(Collectors.toList());
        }

        // 6. 중복 제외된 출결 정보 저장
        try {
            attendanceRepository.createChildAttendance(toSaveList);
        } catch (DataIntegrityViolationException e) {
            log.warn("출결 저장 중 일부 중복 발생, 무시하고 진행: {}", e.getMessage());
        }

        // 7. 전체 출결 정보 다시 조회해서 반환
        return attendanceRepository.findByClassNoAndCreateDate(dto.getClass_no(), dto.getCreate_date())
                .stream()
                .map(AttendanceDto.CreateAttendance::toDto)
                .collect(Collectors.toList());
    }

//    @Override
//    public List<AttendanceDto.ClassAttendance> getChildAttendanceList(int classNo) {
//
//        return attendanceRepository.findByChildNoCenterNoCreateDate(classNo)
//                .stream()
//                .map(AttendanceDto.ClassAttendance::toDto)
//                .collect(Collectors.toList());
//    }

    @Override
    public AttendanceDto.UpdateAttendance updateChildAttendance(UpdateAttendance updateDto) {
        int classNo = updateDto.getClass_no();
        int childNo = updateDto.getChild_no();
        LocalDate createDate = updateDto.getCreate_date();
        CommonEnums.ChildAttendanceStatus status = updateDto.getStatus();

        ChildAttendance attendance = attendanceRepository.getChildAttendance(classNo, childNo, createDate);
        attendance.updateAttendance(status);
        return AttendanceDto.UpdateAttendance.toDto(attendance);
    }
}
