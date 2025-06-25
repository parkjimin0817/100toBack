package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ScheduleDto;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.service.ScheduleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

}
