package com.bridge.kinder.repository;

import com.bridge.kinder.dto.ScheduleDto.CreateScheduleDto;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import java.io.IOException;
import java.util.List;

public interface ScheduleRepository {
    //스케줄 생성
    void save(Schedule schedule);

    //스케줄 리스트 불러오기
    List<Schedule> findScheduleAll(int centerNo, int memberNo);
}
