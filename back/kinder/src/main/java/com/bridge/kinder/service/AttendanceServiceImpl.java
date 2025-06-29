package com.bridge.kinder.service;

import com.bridge.kinder.dto.AttendanceDto;
import com.bridge.kinder.dto.AttendanceDto.Response;
import com.bridge.kinder.dto.AttendanceStatusDto;
import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Holiday;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.TeacherAttendanceStatus;
import com.bridge.kinder.repository.AttendanceRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.HolidayRepository;
import com.bridge.kinder.repository.MemberRepository;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
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
    private final HolidayRepository holidayRepository;

    //로그인 시 당일 조회
    @Override
    public AttendanceDto.Response getTodayAttendance(int memberNo) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay(); //2025-01-01T00:00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); //2025-01-01T23:59:59.999

        //멤버 불러오기
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        List<Attendance> result = attendanceRepository.findByMemberNoAndDateRange(memberNo, member.getCenter().getCenterNo(), startOfDay, endOfDay);

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
        List<Attendance> result = attendanceRepository.findByMemberNoAndDateRange(memberNo, member.getCenter().getCenterNo(), startOfDay, endOfDay);
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
        List<Attendance> result = attendanceRepository.findByMemberNoAndDateRange(memberNo, member.getCenter().getCenterNo(), startOfDay, endOfDay);
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
    public List<AttendanceStatusDto> getTeacherMonthlyAttendance(int memberNo, int centerNo, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1); //시작 날짜  06.01
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth()); //끝 날짜 06.30

        LocalDateTime startDateTime = startDate.atStartOfDay(); // 2025-06-01T00:00
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX); // 2025-06-30T23:59:59.999

        //멤버 확인하기
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다"));

        //한달치 출근 기록 조회
        List<Attendance> monthlyList = attendanceRepository.findByMemberNoAndDateRange(member.getMemberNo(), centerNo, startDateTime, endDateTime);

        //출근 기록 Map<date, attendance>
        Map<LocalDate, Attendance> attendanceMap = monthlyList.stream()
                .collect(Collectors.toMap(a -> a.getInTime().toLocalDate(), a -> a)); //날짜랑 출근내용
        //공휴일 정보
        List<Holiday> holidays = holidayRepository.findByHolidayDateBetween(startDate, endDate);
        Set<LocalDate> holidaySet = holidays.stream()
                .map(Holiday::getHolidayDate)
                .collect(Collectors.toSet());

        //날짜별로 attendance status 계산
        List<AttendanceStatusDto> result = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)){
            Attendance attendance = attendanceMap.get(date); //날짜별 출근기록
            AttendanceStatusDto dto = new AttendanceStatusDto();
            dto.setMember_no(memberNo);
            dto.setCenter_no(centerNo);
            dto.setAttendance_date(date);

            if(holidaySet.contains(date)){
                dto.setStatus(TeacherAttendanceStatus.HOLIDAY); //공휴일
            } else if (date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY){
                dto.setStatus(TeacherAttendanceStatus.WEEKEND); //주말
            } else if ( attendance != null) {
                dto.setAttendance_no(attendance.getAttendanceNo());
                dto.setIn_time(attendance.getInTime());
                dto.setOut_time(attendance.getOutTime());

                if (attendance.getOutTime() == null) {
                    dto.setStatus(TeacherAttendanceStatus.WORKING); //근무중
                } else {
                    dto.setStatus(TeacherAttendanceStatus.PRESENT); //출퇴근 완료
                }
            } else {
                dto.setStatus(TeacherAttendanceStatus.ABSENT); //위에 중 아무것도 아니면 결근
            }
            result.add(dto);
        }
        return result;
    }
}
