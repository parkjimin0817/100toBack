package com.bridge.kinder.controller;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    //시설장(시설) 생성
    @PostMapping("/manager")
    public ResponseEntity<String> registerManager(@RequestBody CreateManagerDto dto) {
        String memberNo = memberService.CreateManager(dto);
        return ResponseEntity.ok(memberNo);
    }

    //교사 생성
//    @PostMapping("/teacher")


    //멤버 조회(임시)
    //서비스에서 처리해야할 로직 미완
    @GetMapping("/{memberNo}")
    public ResponseEntity<MemberDto.Response> getMember(@PathVariable int memberNo){
        return ResponseEntity.ok(memberService.findMEmber(memberNo));
    }
}
