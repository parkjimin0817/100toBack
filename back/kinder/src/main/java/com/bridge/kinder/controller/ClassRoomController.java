package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ClassRoomDto;
import com.bridge.kinder.dto.ClassRoomDto.HealthLogProgressResponse;
import com.bridge.kinder.dto.CounselDto;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.service.ClassRoomService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/classroom")
@RequiredArgsConstructor
public class ClassRoomController {

    private final ClassRoomService classRoomService;

    //반 생성하기
    @PostMapping("/create")
    public ResponseEntity<ClassRoomDto.Response> createClass(@ModelAttribute ClassRoomDto.Create classRoomCreate) {
        return ResponseEntity.ok(classRoomService.createClass(classRoomCreate));
    }

    //시설 별 반 목록 불러오기
    @GetMapping("/list/{centerNo}")
    public ResponseEntity<List<ClassRoomDto.Response>> findClasses(@PathVariable int centerNo) {
        return ResponseEntity.ok(classRoomService.findClassesByCenterNo(centerNo));
    }

    //반별 출석률
    @GetMapping("/main/attendance-rate/{centerNo}")
    public ResponseEntity<List<ClassRoomDto.AttendanceRateResponse>> getAttendanceRate(@PathVariable int centerNo){
        return ResponseEntity.ok(classRoomService.getAttendanceRate(centerNo));
    }

    //반별 건강 로그 완료 현황
    @GetMapping("/main/healthlog-progress/{centerNo}")
    public ResponseEntity<List<HealthLogProgressResponse>> getHealthLogProgress(@PathVariable int centerNo){
        return ResponseEntity.ok(classRoomService.getHealthLogProgress(centerNo));
    }

    //반 수정하기
    @PutMapping("/update/{classNo}")
    public ResponseEntity<ClassRoomDto.Response> updateClass(@RequestBody ClassRoomDto.Update dto, @PathVariable int classNo) {
       return ResponseEntity.ok(classRoomService.updateClass(dto,classNo));
    }


    //반 삭제하기
    @DeleteMapping("/delete/{classNo}")
    public ResponseEntity<?> deleteClass(@PathVariable int classNo) {
        return ResponseEntity.ok(classRoomService.deleteClass(classNo));
    }
}
