package com.bridge.kinder.repository;

import com.bridge.kinder.service.MemberHealthService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PrePersist;
import org.springframework.stereotype.Repository;

@Repository
public class MemberHealthImpl implements MemberHealthService {

    @PersistenceContext
    private EntityManager em;


}
