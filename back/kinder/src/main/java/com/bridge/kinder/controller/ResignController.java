package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ResignDto;
import com.bridge.kinder.service.ResignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/resign")
@RequiredArgsConstructor
public class ResignController {

    private final ResignService resignService;

    //퇴사처리
    @PatchMapping("/member")
    public ResponseEntity<String> memberResign(@RequestBody ResignDto.updateResign dto) {
        return ResponseEntity.ok(resignService.resignMember(dto));
    }
}
