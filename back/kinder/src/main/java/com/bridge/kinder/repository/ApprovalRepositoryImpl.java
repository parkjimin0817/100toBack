package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Approval;
import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ApprovalRepositoryImpl implements ApprovalRepository {

    @PersistenceContext
    EntityManager em;

    //승인 대기 리스트
    @Override
    public List<Approval> findAllApprovals(int centerNo) {
        return em.createQuery(
                        "SELECT a FROM Approval a " +
                                "WHERE a.center.centerNo = :centerNo " +
                                "AND a.status = :status", Approval.class)
                .setParameter("centerNo", centerNo)
                .setParameter("status", CommonEnums.AdmissionStatus.PENDING)
                .getResultList();
    }

    @Override
    public void save(Approval approval) {
        em.persist(approval);
    }
}
