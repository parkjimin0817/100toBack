package com.bridge.kinder.repository;

import com.bridge.kinder.entity.ChildAttendance;
import java.util.List;

public interface ChildAttendanceRepository {

    //반 번호로 출석 데이터 조회
    List<ChildAttendance> findByClassNo(int classNo);
}
