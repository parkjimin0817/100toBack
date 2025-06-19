package com.bridge.kinder.controller;

import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.entity.Member;
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

    //멤버생성
    @PostMapping
    public ResponseEntity<String> create(@RequestBody MemberDto.Create createDto) {
        String memberId = memberService.createMember(createDto);
        return ResponseEntity.ok(memberId);
    }


}
