package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/childs")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    //아동 생성
//    @PostMapping
//    public ResponseEntity<String> createManager(@RequestBody ChildDto.CreateChild dto) {
//        String childNo = childService.createChild(dto);
//        return ResponseEntity.ok(childNo);
//    }

    //반 번호로 아동 목록 가져오기
    @GetMapping
    public ResponseEntity<List<ChildDto.Response>> getChildrenByClassNo(@RequestParam int class_no){
        return ResponseEntity.ok(childService.findChildrenByClassNo(class_no));
    }
}
