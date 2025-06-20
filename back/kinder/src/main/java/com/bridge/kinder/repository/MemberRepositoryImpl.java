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

    //아이디 중복체크
    @Override
    public boolean existsByMemberId(String memberId) {
        String query = "SELECT COUNT(m) FROM Member m WHERE m.memberId = :memberId";
        Long count = em.createQuery(query, Long.class)
                .setParameter("memberId", memberId)
                .getSingleResult();
        return count > 0;
    }

    //멤버 생성
    @Override
    public void save(Member member) {
        em.persist(member);
    }

    //멤버 조회(임시)
    @Override
    public Optional<Member> findById(int memberNo) {
        return Optional.ofNullable(em.find(Member.class, memberNo));
    }
}
