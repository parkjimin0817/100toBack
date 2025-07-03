package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ScheduleDto;
import com.bridge.kinder.dto.ScheduleDto.DailyResponse;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.service.ScheduleService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    //스케줄 생성
    @PostMapping("/create")
    public ResponseEntity<String> addSchedule(@RequestBody ScheduleDto.CreateScheduleDto dto) {
        String scheduleNo = scheduleService.createSchedule(dto);
        return ResponseEntity.ok(scheduleNo);
    }

    //스케줄 리스트 불러오기
    @GetMapping("/lists")
    public ResponseEntity<List<ScheduleDto.ScheduleResponse>> getSchedules(@RequestParam int centerNo,
                                                                           @RequestParam int memberNo) {
        List<ScheduleDto.ScheduleResponse> response = scheduleService.getSchedules(centerNo, memberNo);
        return ResponseEntity.ok(response);
    }

    //오늘 스케줄 리스트 불러오기
    @GetMapping("/lists/main")
    public ResponseEntity<List<ScheduleDto.ScheduleSimpleResponse>> getTodaySchedules(@RequestParam int centerNo,
                                                                           @RequestParam int memberNo, @RequestParam LocalDate today) {
        List<ScheduleDto.ScheduleSimpleResponse> response = scheduleService.getTodaySchedules(centerNo, memberNo, today);
        return ResponseEntity.ok(response);
    }

    //스케줄 수정하기
    @PatchMapping("/edit")
    public ResponseEntity<String> editSchedule(@RequestBody ScheduleDto.ScheduleUpdateDto dto){
        return ResponseEntity.ok(scheduleService.updateSchedule(dto));
    }

    //스케줄 삭제하기
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteSchedule(@RequestParam int scheduleNo) {
        scheduleService.deleteSchedule(scheduleNo);
        return ResponseEntity.ok().build();
    }

    //반 일과표 생성하기
    @PostMapping("/dailyCreate")
    public ResponseEntity<List<Integer>> createDailySchedule(@RequestBody List<ScheduleDto.DailyScheduleDto> dto){
        return ResponseEntity.ok(scheduleService.createDailySchedule(dto));
    }

    //반 일과표 조회
    @GetMapping("/dailyList")
    public ResponseEntity<List<ScheduleDto.DailyResponse>> dailyList(@RequestParam int centerNo, int classNo, LocalDate scheduleDate) {
        return ResponseEntity.ok(scheduleService.dailyList(centerNo,classNo,scheduleDate));
    }

    //반 일과표 등록(수정)
    @PatchMapping("/dailyUpdate")
    public ResponseEntity<List<ScheduleDto.DailyResponse>> updateDailySchedule(@RequestBody List<ScheduleDto.DailyScheduleUpdateDto> dto){
        return ResponseEntity.ok(scheduleService.updateDailySchedule(dto));
    }

    //반 일과표 삭제
    @DeleteMapping("/dailyDelete/{scheduleNo}")
    public ResponseEntity<String> deleteDailySchedule(@PathVariable int scheduleNo){
        scheduleService.deleteSchedule(scheduleNo);
        return ResponseEntity.ok("삭제 성공");
    }
}
