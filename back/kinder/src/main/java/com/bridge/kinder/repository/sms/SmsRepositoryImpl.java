package com.bridge.kinder.repository.sms;

import com.bridge.kinder.entity.AuthNumber;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AuthStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class SmsRepositoryImpl implements SmsRepository{
    @PersistenceContext
    private EntityManager em;

    @Override
    public void save(AuthNumber authNumber) {
        em.persist(authNumber);
    }

    @Override
    public AuthNumber findByAuthNumber(String authNumber) {
        String query = "select a from AuthNumber a where a.authNumber = :authNumber";

        List<AuthNumber> result = em.createQuery(query, AuthNumber.class)
                .setParameter("authNumber", authNumber)
                .getResultList();

        return result.isEmpty() ? null : result.get(0);
    }

    @Override
    public AuthNumber findByAuthNo(String authNumber, CommonEnums.AuthStatus authStatus) {
        String query = "select a from AuthNumber a where a.authNumber = :authNumber and a.authStatus = :authStatus";

        List<AuthNumber> result = em.createQuery(query, AuthNumber.class)
                .setParameter("authNumber", authNumber)
                .setParameter("authStatus", authStatus)
                .getResultList();

        return result.isEmpty() ? null : result.get(0);
    }
}
