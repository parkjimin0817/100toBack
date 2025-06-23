package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/childs")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    //아동 생성
    @PostMapping
    public ResponseEntity<String> createManager(@ModelAttribute ChildDto.CreateChild dto) throws IOException {
        String childNo = childService.createChild(dto);
        return ResponseEntity.ok(childNo);
    }
}
