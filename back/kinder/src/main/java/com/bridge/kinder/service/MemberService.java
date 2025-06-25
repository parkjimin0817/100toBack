package com.bridge.kinder.service;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberChildDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.dto.MemberTeacherDto;
import com.bridge.kinder.dto.MypageDto;

import java.io.IOException;
import java.util.List;

public interface MemberService {

    //아이디 중복 체크
    boolean checkIdDuplicate(String memberId);
    //시설장(시설) 생성
    String createManager(CreateManagerDto dto) throws IOException;
    //교사 생성
    String createTeacher(MemberTeacherDto dto) throws IOException;
    //학부모 생성, 아동 등록
    String createParentChild(MemberChildDto dto) throws IOException;
    //멤버 ID 조회(이름, 생년월일)
    MemberDto.SearchId searchId(MemberDto.SearchId dto);
    //멤버 로그인
    MemberDto.LoginResponse getLoginMember(String memberId, String memberPwd);

    //교사 목록 (시설별 for 셀렉트바)
    List<MemberDto.SimpleDto> findTeachersByCenterNo(int centerNo);
    //교사 목록 (시설별 for 목록페이지)
    List<MemberDto.DetailMemberDto> findDetailedTeachersByCenterNo(int centerNo);

    //마이페이지
    MemberDto.MyPageResponse getMyInfo(int memberNo);

    //마이페이지 수정
    String updateMyPage(int id ,MypageDto.Update dto);
}
