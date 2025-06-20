package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Center;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

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
}
