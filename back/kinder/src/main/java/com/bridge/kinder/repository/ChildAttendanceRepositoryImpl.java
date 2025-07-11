package com.bridge.kinder.repository;

import com.bridge.kinder.entity.ChildAttendance;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ChildAttendanceRepositoryImpl implements ChildAttendanceRepository{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<ChildAttendance> findByClassNo(int classNo) {
        return em.createQuery(
                        "SELECT ca FROM ChildAttendance ca WHERE ca.classRoom.classNo = :classNo",
                        ChildAttendance.class)
                .setParameter("classNo", classNo)
                .getResultList();
    }
}
