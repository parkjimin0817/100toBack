package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberChildDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.dto.MemberTeacherDto;
import com.bridge.kinder.dto.MypageDto;

import com.bridge.kinder.entity.Member;
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
    //멤버 로그인
    Member login(MemberDto.LoginRequest dto);
    //MemberDto.LoginResponse getLoginMember(String memberId, String memberPwd);
    //멤버 ID 조회(이름, 생년월일)
    MemberDto.SearchId searchId(MemberDto.SearchId dto);
    //멤버 PWD 조회(아이디)
    MemberDto.SearchPwd pwdSearchId(MemberDto.SearchPwd dto);
    //전화번호 인증번호
    MemberDto.PhoneAccess sendingNumberToFindId(MemberDto.PhoneAccess dto);
    //비밀번호 변경
    MemberDto.PwdUpdate updatePwd(MemberDto.PwdUpdate dto);

    //교사 목록 (시설별 for 셀렉트바)
    List<MemberDto.SimpleDto> findTeachersByCenterNo(int centerNo);
    //교사 목록 (시설별 for 목록페이지)
    List<MemberDto.DetailMemberDto> findDetailedTeachersByCenterNo(int centerNo);
    //교사 조회
    MemberDto.DetailMemberWithApprovalDto findTeacherByMemberNo(int memberNo);

    //마이페이지
    MemberDto.MyPageResponse getMyInfo(int memberNo);

    //마이페이지 수정
    String updateMyPage(int id ,MypageDto.Update dto);

    //학부모 마이페이지 수정
    MemberDto.updateParentInfo updateParentInfo(MemberDto.updateParentInfo dto);

    //시설장 선생 목록 가져오기(시설번호를 받아서)
    List<MemberDto.teacherListResponse> managerTeacherList(int centerNo);

    //멤버 번호로 멤버 가져오기
    MemberDto.modalResponse getMember(int member_no);

    //멤버 번호로 반 배정
    MemberDto.updateClass updateClass(int member_no, int class_no);

    //센터 번호로 교사 소개 리스트 가져오기
    List<MemberDto.TeacherIntroList> teacherIntroList(int centerNo);

}
