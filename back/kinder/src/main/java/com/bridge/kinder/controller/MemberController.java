package com.bridge.kinder.controller;

import com.bridge.kinder.auth.JwtTokenProvider;
import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberChildDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.dto.MypageDto;
import com.bridge.kinder.dto.MemberTeacherDto;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

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
    public ResponseEntity<MemberDto.LoginResponse> loginMember(@RequestBody MemberDto.LoginRequest dto) {
        Member member = memberService.login(dto);
        String jwtToken = jwtTokenProvider.createToken(member.getMemberId(), member.getMemberType().toString());

        MemberDto.LoginResponse response = MemberDto.LoginResponse.toDto(jwtToken, member);
        return ResponseEntity.ok(response);
    }

    //시설 별 교사 목록 불러오기 for 셀렉트바
    @GetMapping("/teacher/select/{centerNo}")
    public ResponseEntity<List<MemberDto.SimpleDto>> findTeachers(@PathVariable int centerNo){
        return ResponseEntity.ok(memberService.findTeachersByCenterNo(centerNo));
    }

    //시설 별 교사 목록 조회 for 목록 페이지
    @GetMapping("/teacher/list/{centerNo}")
    public ResponseEntity<List<MemberDto.DetailMemberDto>> findDetailTeachers(@PathVariable int centerNo){
        return ResponseEntity.ok(memberService.findDetailedTeachersByCenterNo(centerNo));
    }

    //교사 조회 memberNo으로
    @GetMapping("/teacher/{memberNo}")
    public ResponseEntity<MemberDto.DetailMemberWithApprovalDto> findDetailTeacher(@PathVariable int memberNo){
        return ResponseEntity.ok(memberService.findTeacherByMemberNo(memberNo));
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
    public ResponseEntity<String> updateMyPage(@RequestParam int id, @RequestBody MypageDto.Update dto){
        String memberNo = memberService.updateMyPage(id, dto);
        return ResponseEntity.ok(memberNo);
    }

    //학부모 마이페이지 수정
    @PatchMapping("/mypage/parent")
    public ResponseEntity<MemberDto.updateParentInfo> updateParentIfo(@RequestBody MemberDto.updateParentInfo dto){
        return ResponseEntity.ok(memberService.updateParentInfo(dto));
    }

    //멤버 PWD 찾기(아이디 비교)
    @PostMapping("/pwdSearchId")
    public ResponseEntity<MemberDto.SearchPwd> pwdSearchId(@RequestBody MemberDto.SearchPwd dto){
        return ResponseEntity.ok(memberService.pwdSearchId(dto));
    }

    //비밀번호 변경
    @PatchMapping("/pwdUpdate")
    public ResponseEntity<MemberDto.PwdUpdate> updatePwd(@RequestBody MemberDto.PwdUpdate dto){
        return ResponseEntity.ok(memberService.updatePwd(dto));
    }

    //시설장 선생 목록 가져오기(시설 번호를 받아서)
    @GetMapping("/getteacher")
    public ResponseEntity<List<MemberDto.teacherListResponse>> getTeacherList(@RequestParam int id){
        return ResponseEntity.ok(memberService.managerTeacherList(id));
    }

    //멤버 번호로 멤버 가져오기
    @GetMapping("/get")
    public ResponseEntity<MemberDto.modalResponse> getChild(@RequestParam int member_no){
        return ResponseEntity.ok(memberService.getMember(member_no));
    }

    //멤버 번호로 반 수정하기
    @PatchMapping("/updateclass")
    public ResponseEntity<MemberDto.updateClass> updateClass(@RequestParam int member_no,@RequestParam int class_no){
        return ResponseEntity.ok(memberService.updateClass(member_no,class_no));
    }

    //센터 번호로 교사 소개 리스트 가져오기
    @GetMapping("/introList")
    public ResponseEntity<List<MemberDto.TeacherIntroList>> introList(@RequestParam int centerNo){
        return ResponseEntity.ok(memberService.teacherIntroList(centerNo));
    }

    //센터별 멤버 목록 조회
    @GetMapping("/memberList")
    public ResponseEntity<List<MemberDto.SimpleDto>> centerMemberList(@RequestParam int centerNo){
        return ResponseEntity.ok(memberService.centerMemberList(centerNo));
    }

}
