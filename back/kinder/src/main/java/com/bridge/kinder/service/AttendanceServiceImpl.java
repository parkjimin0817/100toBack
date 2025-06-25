package com.bridge.kinder.service;

import com.bridge.kinder.dto.AttendanceDto;
import com.bridge.kinder.dto.AttendanceDto.Response;
import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.AttendanceRepository;
import com.bridge.kinder.repository.MemberRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final MemberRepository memberRepository;

    @Override
    public AttendanceDto.Response getTodayAttendance(int memberNo) {
        Optional<Attendance>  attendanceOpt = attendanceRepository.findByMemberNoAndDate(memberNo);

        if(attendanceOpt.isPresent()){
            return AttendanceDto.Response.toDto(attendanceOpt.get());
        } else{
            return AttendanceDto.Response.builder()
                    .in_time(null)
                    .out_time(null)
                    .member_no(memberNo)
                    .build();
        }
    }

    @Override
    public AttendanceDto.Response recordWorkIn(int memberNo) {
        //멤버 불러오기
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        //오늘 출퇴근 기록 가져오기
        Optional<Attendance>  attendanceOpt = attendanceRepository.findByMemberNoAndDate(memberNo);

        //이미 출근이 있는지 확인
        if(attendanceOpt.isPresent()){
            throw new RuntimeException("이미 출근 기록이 존재합니다.");
        }

        Attendance newAttendance = Attendance.builder()
                .member(member)
                .inTime(LocalDateTime.now())
                .outTime(null)
                .build();

        Attendance savedAttendance = attendanceRepository.save(newAttendance);
        return AttendanceDto.Response.toDto(savedAttendance);
    }

    @Override
    public AttendanceDto.Response recordWorkOut(int memberNo) {
        //멤버 불러오기
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));
        //현재 날짜 시간
        LocalDateTime now = LocalDateTime.now();

        //오늘 출퇴근 기록 조회하기
        Attendance attendance = attendanceRepository.findByMemberNoAndDate(memberNo)
                .orElseThrow(() -> new RuntimeException("출근 기록이 존재하지 않습니다"));

        //이미 퇴근이 있는 경우 예외 처리
        if(attendance.getOutTime() != null){
            throw new RuntimeException("이미 퇴근 기록이 존재합니다.");
        }

        attendance.updateOutTime(LocalDateTime.now());


        return AttendanceDto.Response.toDto(attendance);

    }
}
