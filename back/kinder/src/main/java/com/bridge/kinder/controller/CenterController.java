package com.bridge.kinder.controller;

import com.bridge.kinder.dto.CenterDto;
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

    //시설 목록 가져오기
    @GetMapping("/centers")
    public ResponseEntity<List<CenterDto.Response>> getCenters(){
        return null;
    }



}
