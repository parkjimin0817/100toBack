package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class ChildRepositoryImpl implements ChildRepository {

    @PersistenceContext
    private EntityManager em;

    //아동 생성
    @Override
    public void save(Child child) {
        em.persist(child);
    }
}
