package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ClassRoomDto;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.service.ClassRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/classroom")
@RequiredArgsConstructor
public class ClassRoomController {

    private final ClassRoomService classRoomService;

    //반 생성하기
    @PostMapping("/create")
    public ResponseEntity<Long> createClass(@ModelAttribute ClassRoomDto.Create classRoomCreate) throws IOException {
        return ResponseEntity.ok(classRoomService.createClass(classRoomCreate));
    }

}
