package com.bridge.kinder.service;

import com.bridge.kinder.dto.ScheduleDto;
import com.bridge.kinder.dto.ScheduleDto.DailyResponse;
import com.bridge.kinder.enums.CommonEnums;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {

    //스케줄 생성
    String createSchedule(ScheduleDto.CreateScheduleDto dto);

    //스케줄 리스트 불러오기
    List<ScheduleDto.ScheduleResponse> getSchedules(int centerNo, int memberNo);

    //스케줄 수정
    String updateSchedule(ScheduleDto.ScheduleUpdateDto dto);

    //스케줄 삭제
    void deleteSchedule(int scheduleNo);

    //반 일과표 생성
    String createDailySchedule(List<ScheduleDto.DailyScheduleDto> dto );

    //반 일과표 조회
    List<ScheduleDto.DailyResponse> dailyList(int centerNo, int memberNo, int classNo, LocalDate scheduleDate);
}
