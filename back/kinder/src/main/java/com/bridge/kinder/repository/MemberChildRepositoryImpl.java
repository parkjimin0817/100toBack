package com.bridge.kinder.repository;

import com.bridge.kinder.entity.MemberChild;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class MemberChildRepositoryImpl implements MemberChildRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void save(MemberChild memberChild) {
        em.persist(memberChild);
    }
}
