package com.bridge.kinder.controller;

import com.bridge.kinder.dto.VacationDto;
import com.bridge.kinder.service.VacationService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
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




}
