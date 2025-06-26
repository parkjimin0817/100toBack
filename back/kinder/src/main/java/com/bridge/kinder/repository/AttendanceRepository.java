package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Attendance;
import java.util.Optional;

public interface AttendanceRepository {

    Optional<Attendance> findByMemberNoAndDate(int memberNo);
    Attendance save(Attendance attendance);
}
