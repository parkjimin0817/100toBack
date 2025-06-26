package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Attendance;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository {

    //당일 출근 기록
    //Optional<Attendance> findByMemberNoAndDate(int memberNo, LocalDateTime startOfDay, LocalDateTime endOfDay);
    //기록 저장
    Attendance save(Attendance attendance);
    //월별 출근 기록
    List<Attendance> findByMemberNoAndDateRange(int memberNo, LocalDateTime startDate, LocalDateTime endDate);
}
