package com.bridge.kinder.repository;

import com.bridge.kinder.dto.ScheduleDto.CreateScheduleDto;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository {
    //스케줄 생성
    void save(Schedule schedule);

    //개인 스케줄 리스트 불러오기
    List<Schedule> findMemberScheduleAll(int centerNo, int memberNo);

    //시설 스케줄 리스트 불러오기
    List<Schedule> findCenterScheduleAll(int centerNo);

    //스케줄 번호로 찾기
    Schedule findScheduleByScheduleNo(int scheduleNo);

    //스케줄 삭제
    void deleteSchedule(Schedule schedule);

    //반 일과표 생성
    void saveDailySchedule(List<Schedule> schedules);

    //반 일과표 조회
    List<Schedule> findDailyList(int centerNo, int memberNo, int classNo, LocalDate scheduleDate);

    //반 일과표 조회
    List<Schedule> findDailySchedule(int centerNo, int memberNo, int classNo, int scheduleNo, LocalDate scheduleDate);

}
