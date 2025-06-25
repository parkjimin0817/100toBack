package com.bridge.kinder.service;

import com.bridge.kinder.dto.ScheduleDto;
import com.bridge.kinder.enums.CommonEnums;
import java.io.IOException;
import java.util.List;

public interface ScheduleService {

    //스케줄 생성
    String createSchedule(ScheduleDto.CreateScheduleDto dto);

    //스케줄 리스트 불러오기
    List<ScheduleDto.ScheduleResponse> getSchedules(int centerNo, int memberNo);
}
