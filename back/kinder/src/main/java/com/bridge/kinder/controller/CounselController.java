package com.bridge.kinder.controller;

import com.bridge.kinder.dto.CounselDto;
import com.bridge.kinder.entity.Counsel;
import com.bridge.kinder.service.CounselService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/counsel")
@RequiredArgsConstructor
public class CounselController {

    private final CounselService counselService;

    @PostMapping("/add")
    public ResponseEntity<String> addCounsel(@RequestBody CounselDto.CreateDto dto) {
        return null;
    }
}
