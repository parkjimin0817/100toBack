package com.bridge.kinder.repository;

import com.bridge.kinder.dto.MypageDto;
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
    public Optional<Member> findByMemberNo(int memberNo) {
        String jpql = "SELECT m FROM Member m WHERE m.memberNo = :memberNo";
        Member member = em.createQuery(jpql, Member.class)
                .setParameter("memberNo", memberNo)
                .getResultStream()
                .findFirst()
                .orElse(null);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> myPageUpdate(int id, MypageDto.Update dto) {
        String jpql = "UPDATE Member m SET m.memberName = :name, m.memberBirth = :birth WHERE m.memberNo = :memberNo";

        int updated = em.createQuery(jpql)
                .setParameter("name", dto.getMemberName())
                .setParameter("birth", dto.getMemberBirth())
                .setParameter("memberNo", String.valueOf(id))
                .executeUpdate();

        // JPQL UPDATE는 반환값이 없음 → 다시 조회해서 Optional로 감싸야 함
        if (updated > 0) {
            Member member = em.createQuery(
                            "SELECT m FROM Member m WHERE m.memberNo = :memberNo", Member.class)
                    .setParameter("memberNo", String.valueOf(id))
                    .getSingleResult();
            return Optional.of(member);
        } else {
            return Optional.empty();
        }
    }
}
