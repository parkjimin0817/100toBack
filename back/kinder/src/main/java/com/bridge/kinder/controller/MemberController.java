package com.bridge.kinder.controller;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberChildDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.entity.Member;
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
    public ResponseEntity<String> createManager(@ModelAttribute CreateManagerDto dto) throws IOException {
        String memberNo = memberService.createManager(dto);
        return ResponseEntity.ok(memberNo);
    }

    //교사 생성
    @PostMapping("/teacher")
    public ResponseEntity<String> createTeacher(@ModelAttribute MemberDto.CreateMember dto) throws IOException {
        String memberNo = memberService.createTeacher(dto);
        return ResponseEntity.ok(memberNo);
    }

    //학부모 생성, 아동 등록
    @PostMapping("/parent")
    public ResponseEntity<String> createParentChild(@ModelAttribute MemberChildDto dto) throws IOException {
        String memberNo = memberService.createParentChild(dto);
        return ResponseEntity.ok(memberNo);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<MemberDto.LoginResponse> loginMember(@RequestBody MemberDto.LoginRequest dto) throws IOException {
        MemberDto.LoginResponse response = memberService.getLoginMember(dto.getMemberId(), dto.getMemberPwd());
        return ResponseEntity.ok(response);
    }


}
