package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberChildDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.dto.MypageDto;
import com.bridge.kinder.dto.MemberTeacherDto;
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
    public ResponseEntity<String> createTeacher(@ModelAttribute MemberTeacherDto dto) throws IOException {
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

    //멤버 ID 조회(이름, 생년월일)
    @PostMapping("/searchId")
    public ResponseEntity<MemberDto.SearchId> searchId(@RequestBody MemberDto.SearchId dto){
        return ResponseEntity.ok(memberService.searchId(dto));
    }
    //마이페이지에서 정보 조회
    @GetMapping("/mypage")
    public ResponseEntity<MemberDto.MyPageResponse> myPage(@RequestParam int id){
        MemberDto.MyPageResponse mypage = memberService.getMyInfo(id);
        return ResponseEntity.ok(mypage);
    }

    //마이페이지에서 정보 수정(교사일 경우 본인 이름,전화번호만 수정 가능, 시설장일 경우 시설정보까지 수정 가능)
    @PatchMapping("/mypage")
    public ResponseEntity<String> updateMypage(@RequestParam int id, @RequestBody MypageDto.Update dto){
        String memberNo = memberService.updateMyPage(id, dto);
        return ResponseEntity.ok(memberNo);
    }

    @PostMapping("/pwdSearchId")
    public ResponseEntity<?> pwdSearchId(@RequestBody MemberDto.SearchId dto){
        return ResponseEntity.ok(null);
    }
}
