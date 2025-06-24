package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
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

    //멤버 로그인
    @Override
    public Optional<Member> findByMemberId(String memberId) {
        String jpql = "SELECT m FROM Member m WHERE m.memberId = :memberId";
        Member member = em.createQuery(jpql, Member.class)
                .setParameter("memberId", memberId)
                .getResultStream()
                .findFirst()
                .orElse(null);
        return Optional.ofNullable(member);
    }

    //아동 생성 시 학부모 검색
    @Override
    public Optional<Member> findByParentNo(int memberNo) {
        return Optional.ofNullable(em.find(Member.class, memberNo));
    }

    @Override
    public List<Member> findByCenterNo(int centerNo) {
        return em.createQuery("select m from Member m where m.memberType =:memberType and m.status =: status and m.center.centerNo =:centerNo", Member.class)
                .setParameter("memberType", CommonEnums.MemberType.TEACHER)
                .setParameter("status", CommonEnums.AdmissionStatus.APPROVED)
                .setParameter("centerNo", centerNo)
                .getResultList();
    }

    //member_no으로 멤버 찾기
    @Override
    public Optional<Member> findByMemberNo(int memberNo) {
        String jpql = "SELECT m FROM Member m WHERE m.memberNo = :memberNo";
        Member member = em.createQuery(jpql, Member.class)
                .setParameter("memberNo", memberNo)
                .getResultStream()
                .findFirst()
                .orElse(null);
        return Optional.ofNullable(member);
    }
}
