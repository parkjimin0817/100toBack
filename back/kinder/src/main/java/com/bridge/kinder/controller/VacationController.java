package com.bridge.kinder.controller;

import com.bridge.kinder.dto.VacationDto;
import com.bridge.kinder.dto.VacationDto.Response;
import com.bridge.kinder.entity.Leave;
import com.bridge.kinder.service.VacationService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/vacation")
@RequiredArgsConstructor
public class VacationController {

    private final VacationService vacationService;

    //휴가 신청
    @PostMapping("/request/{memberNo}")
    public ResponseEntity<VacationDto.Response> requestVacation(@PathVariable int memberNo, @ModelAttribute VacationDto.Request request) throws IOException  {
        return ResponseEntity.ok(vacationService.requestVacation(memberNo, request));
    }

    //멤버 별 휴가 목록 불러오기
    @GetMapping("/{memberNo}")
    public ResponseEntity<List<Response>> getVacation(@PathVariable int memberNo)  {
        return ResponseEntity.ok(vacationService.getVacationsByMember(memberNo));
    }

    //휴가 신청 삭제하기
    @DeleteMapping("/delete/{vacationNo}")
    public ResponseEntity<Void> deleteVacation(@PathVariable int vacationNo) {
        vacationService.deleteVacation(vacationNo);
        return ResponseEntity.noContent().build();
    }

    //시설 별 휴가 목록 불러오기
    @GetMapping("/all/{centerNo}")
    public ResponseEntity<List<Response>> getVacationAll(@PathVariable int centerNo)  {
        return ResponseEntity.ok(vacationService.getVacationsByCenter(centerNo));
    }

    //휴가 승인
    @PatchMapping("/approve/{vacationNo}")
    public ResponseEntity<VacationDto.Response> approveVacation(@PathVariable int vacationNo) {
        return ResponseEntity.ok(vacationService.approveVacation(vacationNo));
    }

    //휴가 거절
    @PatchMapping("/reject/{vacationNo}")
    public ResponseEntity<VacationDto.Response> rejectVacation(@PathVariable int vacationNo) {
        return ResponseEntity.ok(vacationService.rejectVacation(vacationNo));
    }



}
