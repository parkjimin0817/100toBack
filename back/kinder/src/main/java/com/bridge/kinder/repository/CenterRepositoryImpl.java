package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CenterRepositoryImpl implements CenterRepository {

    @PersistenceContext
    private EntityManager em;

    //센터 생성
    @Override
    public Center save(Center center) {
        em.persist(center);
        return center;
    }

    @Override
    public Optional<Center> findById(Integer centerNo) {
        if(centerNo == null) return Optional.empty();
        return Optional.ofNullable(em.find(Center.class, centerNo));
    }

    @Override
    public List<Center> findAll() {
        return em.createQuery("SELECT c FROM Center c WHERE c.status = :status", Center.class)
                .setParameter("status", CommonEnums.AdmissionStatus.APPROVED)
                .getResultList();
    }
}
