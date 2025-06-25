package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
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
    //전화번호 멤버찾기
    Optional<Member> findByPhone(String memberPhone);
}
