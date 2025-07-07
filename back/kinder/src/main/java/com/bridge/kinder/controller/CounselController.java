package com.bridge.kinder.controller;

import com.bridge.kinder.dto.CounselDto;
import com.bridge.kinder.dto.CounselDto.CreateDto;
import com.bridge.kinder.entity.Counsel;
import com.bridge.kinder.service.CounselService;
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
@RequestMapping("/api/counsel")
@RequiredArgsConstructor
public class CounselController {

    private final CounselService counselService;

    //상담일정 생성
    @PostMapping("/add")
    public ResponseEntity<CounselDto.CreateDto> addCounsel(@RequestBody CounselDto.CreateDto dto) {
        return ResponseEntity.ok(counselService.addCounsel(dto));
    }

    //해당 반의 상담일정 리스트 조회
    @GetMapping
    public ResponseEntity<List<CounselDto.Response>> getCounsel(@RequestParam int classNo) {
        return ResponseEntity.ok(counselService.findCounselByClassNo(classNo));
    }
}
