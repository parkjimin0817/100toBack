package com.bridge.kinder.controller;

import com.bridge.kinder.dto.AttendanceDto;
import com.bridge.kinder.dto.AttendanceDto.Response;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.dto.AttendanceStatusDto;
import com.bridge.kinder.service.AttendanceService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    //로그인 시 당일 출퇴근 기록 불러오기
    @GetMapping("/today/{memberNo}")
    public ResponseEntity<AttendanceDto.Response> getTodayAttendance(@PathVariable int memberNo) {
        return ResponseEntity.ok(attendanceService.getTodayAttendance(memberNo));
    }

    //출근 시간 기록하기
    @PostMapping("/workin/{memberNo}")
    public ResponseEntity<AttendanceDto.Response> recordWorkIn(@PathVariable int memberNo) {
        return ResponseEntity.ok(attendanceService.recordWorkIn(memberNo));
    }

    //퇴근 시간 기록하기
    @PatchMapping("/workout/{memberNo}")
    public ResponseEntity<AttendanceDto.Response> recordWorkOut(@PathVariable int memberNo) {
        return ResponseEntity.ok(attendanceService.recordWorkOut(memberNo));
    }

    //달별 교사 근태 기록 불러오기
    @GetMapping("/teacher")
    public ResponseEntity<List<AttendanceStatusDto>> getTeacherMonthlyAttendance(@RequestParam int memberNo, @RequestParam int centerNo, @RequestParam int year, @RequestParam int month) {
        return ResponseEntity.ok(attendanceService.getTeacherMonthlyAttendance(memberNo, centerNo, year, month));
    }

    //반 번호로 출결 상태 생성
    @PostMapping("/createChildAttendance")
    public ResponseEntity<List<AttendanceDto.CreateAttendance>> createChildAttendance(@RequestBody AttendanceDto.CreateAttendance dto) {
        return ResponseEntity.ok(attendanceService.createChildAttendance(dto));

    }

    //반 출결 상태를 변경
    @PatchMapping("/updateAttendance")
    public ResponseEntity<AttendanceDto.UpdateAttendance> updateAttendance(@RequestBody AttendanceDto.UpdateAttendance updateDto) {
        return ResponseEntity.ok(attendanceService.updateChildAttendance(updateDto));
    }
}
