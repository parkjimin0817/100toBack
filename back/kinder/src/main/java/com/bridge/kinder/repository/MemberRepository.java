package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Member;

import java.util.Optional;

public interface MemberRepository {
    //멤버 생성
    void save(Member member);
    //멤버 조회(임시)
    Optional<Member> findOne(int memberNo);
}
