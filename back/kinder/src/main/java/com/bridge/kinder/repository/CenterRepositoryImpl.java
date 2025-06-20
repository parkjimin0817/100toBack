package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Center;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

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
}
