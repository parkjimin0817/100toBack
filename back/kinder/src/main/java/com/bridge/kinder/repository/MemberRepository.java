package com.bridge.kinder.repository;

import com.bridge.kinder.dto.MypageDto;
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

    //학부모 검색
    Optional<Member> findByParentNo(int memberNo);

    //시설별 교사 목록(for셀렉트바 / 간단)
    List<Member> findTeacherByCenterNo(int centerNo);

    //멤버no으로 한명 찾기
    Optional<Member> findByMemberNo(int memberNo);

    //클래스no으로 담당 교사 찾기
    Optional<Member> findTeacherByClassNo(int classNo);

    //마이페이지 정보 수정
    Optional<Member> myPageUpdate(int id, MypageDto.Update dto);

}
