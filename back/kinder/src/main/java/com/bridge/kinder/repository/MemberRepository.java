package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Member;

import java.util.Optional;

public interface MemberRepository {
    void save(Member member);
    Optional<Member> findOne(int memberNo);
}
