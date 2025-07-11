package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.ChildAttendanceStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository {

    //당일 출근 기록
    //Optional<Attendance> findByMemberNoAndDate(int memberNo, LocalDateTime startOfDay, LocalDateTime endOfDay);
    //기록 저장
    Attendance save(Attendance attendance);
    //no으로 출결 찾기
    Optional<Attendance> findById(int attendanceNo);
    //월별 출근 기록
    List<Attendance> findByMemberNoAndDateRange(int memberNo, int centerNo, LocalDateTime startDate, LocalDateTime endDate);
    //아동 출결 추가
    void createChildAttendance(List<ChildAttendance> attendances);
    //아동 출결 해당 반과 해당 날짜 조회
    List<ChildAttendance> findByClassNoAndCreateDate(int classNo, LocalDate createDate);
    //아동 출결 해당 조회
    ChildAttendance getChildAttendance(int classNo, int childNo, LocalDate createDate);

    //반 별 출석 아동 수
    Optional<Long> countPresentChild(int classNo, LocalDate today, ChildAttendanceStatus status);

    boolean existsByMemberAndDateBetween(int memberNo, LocalDate startDate, LocalDate endDate);

}
