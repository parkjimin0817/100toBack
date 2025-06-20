package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class MemberRepositoryImpl implements MemberRepository {

    @PersistenceContext
    private EntityManager em;

    //멤버 생성
    @Override
    public void save(Member member) {
        em.persist(member);
    }

    //멤버 조회(임시)
    @Override
    public Optional<Member> findOne(int memberNo) {
        return Optional.ofNullable(em.find(Member.class, memberNo));
    }
}
