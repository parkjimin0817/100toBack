package com.bridge.kinder.repository;

import com.bridge.kinder.dto.MypageDto;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MemberRepository  {

    //아이디 중복 체크
    boolean existsByMemberId(String memberId);
    //멤버 생성
    void save(Member member);
    //멤버 로그인
    Optional<Member> findByMemberId(String memberId);
    //멤버 ID 찾기(이름, 생년월일)
    Optional<Member> searchId(String memberName, LocalDate memberBirth);
    //멤버 PWD 찾기(아이디)
    Optional<Member> pwdSearchId(String memberId);

    //학부모 검색
    Optional<Member> findByParentNo(int memberNo);

    //아이디, 이름, 전화번호 멤버찾기
    Member findByIdAndNameAndPhone(String memberId, String memberName, String memberPhone);

    //시설별 교사 목록(for셀렉트바 / 간단)
    List<Member> findTeacherByCenterNo(int centerNo);
    //클래스no으로 담당 교사 찾기
    Optional<Member> findTeacherByClassNo(int classNo);
    //memberNo으로 교사 찾기
    Optional<Member> findMemberByMemberNo(int memberNo);

    //멤버no으로 한명 찾기
    Optional<Member> findByMemberNo(int memberNo);


    //마이페이지 정보 수정
    Optional<Member> myPageUpdate(int id, MypageDto.Update dto);

    //시설 번호로 선생 목록 조회
    List<Member> findByCenterNo(int centerNo);

    //멤버 번호로 멤버 조회
    Optional<Member> getByMemberNo(int member_no);

    //멤버 번호로 반 수정하기
    Optional<Member> updateClass(int member_no, int class_no);

}
