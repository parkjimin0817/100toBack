package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Approval;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AdmissionStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ApprovalRepositoryImpl implements ApprovalRepository {

    @PersistenceContext
    EntityManager em;

    @Override
    public List<Approval> findCenterApprovals() {
        return em.createQuery(
                        "SELECT a FROM Approval a " +
                                "WHERE a.center.status = :centerStatus " +
                                "AND a.member.status = :memberStatus " +
                                "AND a.status = :status", Approval.class)
                .setParameter("centerStatus", AdmissionStatus.PENDING)
                .setParameter("memberStatus", AdmissionStatus.PENDING)
                .setParameter("status", CommonEnums.AdmissionStatus.PENDING)
                .getResultList();
    }

    //승인 대기 리스트
    @Override
    public List<Approval> findMemberApprovals(int centerNo) {
        return em.createQuery(
                        "SELECT a FROM Approval a " +
                                "WHERE a.center.centerNo = :centerNo " +
                                "AND a.status = :status", Approval.class)
                .setParameter("centerNo", centerNo)
                .setParameter("status", CommonEnums.AdmissionStatus.PENDING)
                .getResultList();
    }

    //승인 요청 생성
    @Override
    public void save(Approval approval) {
        em.persist(approval);
    }

    //승인 요청 찾기
    @Override
    public Optional<Approval> findByApprovalNo(int approvalNo) {
        return Optional.ofNullable(em.find(Approval.class, approvalNo));
    }
}
