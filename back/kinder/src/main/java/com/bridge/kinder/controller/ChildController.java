package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.io.IOException;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/childs")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;


    //반 번호로 아동 목록 가져오기
    @GetMapping
    public ResponseEntity<List<ChildDto.Response>> getChildrenByClassNo(@RequestParam int classNo){
        return ResponseEntity.ok(childService.findChildrenByClassNo(classNo));
    }

    //아동 생성
    @PostMapping("/add")
    public ResponseEntity<String> createChild(@ModelAttribute ChildDto.CreateChild dto) throws IOException {
        String childNo = childService.createChild(dto);
        return ResponseEntity.ok(childNo);
    }

    //로그인된 부모의 아동 연결
    @PostMapping("/link")
    public ResponseEntity<String> linkChild(@RequestBody ChildDto.LinkChildRequest dto) throws IOException {
        String childNo = childService.linkChild(dto);
        return ResponseEntity.ok(childNo);
    }

    //시설장 아동 목록 가져오기
    @GetMapping("/manager/childlist")
    public ResponseEntity<List<ChildDto.childListResponse>> managerChildList(@RequestParam int centerNo){
        return ResponseEntity.ok(childService.managerChildList(centerNo));
    }
}
