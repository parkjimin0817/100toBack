package com.bridge.kinder.service;

import com.bridge.kinder.dto.AttendanceDto;
import com.bridge.kinder.dto.AttendanceDto.ClassAttendance;
import com.bridge.kinder.dto.AttendanceDto.Response;
import com.bridge.kinder.dto.AttendanceDto.UpdateAttendance;
import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.ChildAttendanceStatus;
import com.bridge.kinder.repository.AttendanceRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ChildRepository;
import com.bridge.kinder.repository.MemberRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final MemberRepository memberRepository;

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

    @Override
    public List<AttendanceDto.ClassAttendance> getChildAttendanceList(int classNo, LocalDate createDate) {

        return attendanceRepository.findByChildNoCenterNoCreateDate(classNo, createDate)
                .stream()
                .map(AttendanceDto.ClassAttendance::toDto)
                .collect(Collectors.toList());
    }

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
