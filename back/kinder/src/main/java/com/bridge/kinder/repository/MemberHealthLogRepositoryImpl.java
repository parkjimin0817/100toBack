package com.bridge.kinder.repository;

import com.bridge.kinder.entity.MemberHealthLog;
import com.bridge.kinder.service.MemberHealthServiceLog;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class MemberHealthLogRepositoryImpl implements MemberHealthLogRepository {

    @PersistenceContext
    private EntityManager em;

    //기록 생성
    @Override
    public void save(MemberHealthLog memberHealthLog) {
        em.persist(memberHealthLog);
    }

    //멤버 번호로 기록 리스트 불러오기
    @Override
    public List<MemberHealthLog> findByMemberNo(int memberNo) {
        return em.createQuery(
                "SELECT l FROM MemberHealthLog l " +
                        "WHERE l.member.memberNo = :memberNo ", MemberHealthLog.class)
                .setParameter("memberNo", memberNo)
                .getResultList();
    }

    //기록 번호로 기록 찾기
    @Override
    public Optional<MemberHealthLog> findByMemberHealthLogNo(int memberHealthLogNo) {
        return Optional.ofNullable(em.find(MemberHealthLog.class, memberHealthLogNo));
    }

    //기록 삭제
    @Override
    public void deleteByMemberHealthLogNo(MemberHealthLog memberHealthLog) {
        em.remove(memberHealthLog);
    }
}
