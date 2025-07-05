package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Counsel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class CounselRepositoryCustomImpl implements CounselRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    //반번호로 상담일정 리스트 조회
    @Override
    public List<Counsel> findCounselByClassNo(int classNo) {
        return em.createQuery("SELECT c FROM Counsel c WHERE c.child.classRoom.classNo = :classNo", Counsel.class)
                .setParameter("classNo", classNo)
                .getResultList();
    }
}
