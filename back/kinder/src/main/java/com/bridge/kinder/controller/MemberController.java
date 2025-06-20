package com.bridge.kinder.controller;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    //아이디 중복체크
    @GetMapping("/checkId")
    public ResponseEntity<Boolean> checkId(@RequestParam String memberId){
        boolean exists = memberService.checkIdDuplicate(memberId); //true : 이미 사용중인 아이디, false :  사용가능한 아이디
        return ResponseEntity.ok(exists);
    }

    //시설장(시설) 생성
    @PostMapping("/manager")
    public ResponseEntity<String> createManager(@RequestBody CreateManagerDto dto) {
        String memberNo = memberService.createManager(dto);
        return ResponseEntity.ok(memberNo);
    }

    //교사/학부모 생성
    @PostMapping("/member")
    public ResponseEntity<String> createMember(@ModelAttribute MemberDto.CreateMember dto) throws IOException {
        String memberNo = memberService.createMember(dto);
        return ResponseEntity.ok(memberNo);
    }

    //멤버 조회(임시)
    //서비스에서 처리해야할 로직 미완
    @GetMapping("/{memberNo}")
    public ResponseEntity<MemberDto.Response> getMember(@PathVariable int memberNo){
        return ResponseEntity.ok(memberService.findMEmber(memberNo));
    }
}
