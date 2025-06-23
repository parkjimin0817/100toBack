package com.bridge.kinder.controller;

import com.bridge.kinder.dto.CenterDto;
import com.bridge.kinder.service.CenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/center")
@RequiredArgsConstructor
public class CenterController {

    private final CenterService centerService;

    //시설 목록 가져오기
    @GetMapping
    public ResponseEntity<List<CenterDto.Response>> getCenters(){
        return ResponseEntity.ok(centerService.findAllCenter());
    }



}
