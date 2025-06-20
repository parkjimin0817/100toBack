package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository  {

    //아이디 중복 체크
    boolean existsByMemberId(String memberId);
    //멤버 생성
    void save(Member member);
    //멤버 조회(임시)
    Optional<Member> findById(int memberNo);
}
