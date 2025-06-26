package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Attendance;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository

public class AttendanceRepositoryImpl implements AttendanceRepository {

    @PersistenceContext
    private EntityManager em;


    @Override
    public Optional<Attendance> findByMemberNoAndDate(int memberNo) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay(); //2025-01-01T00:00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); //2025-01-01T23:59:59.999

        String jpql = "SELECT a FROM Attendance a WHERE a.member.memberNo = :memberNo AND (a.inTime BETWEEN :start AND :end)";

        List<Attendance> result = em.createQuery(jpql, Attendance.class)
                .setParameter("memberNo", memberNo)
                .setParameter("start", startOfDay)
                .setParameter("end", endOfDay)
                .getResultList();

        return result.stream().findFirst();
    }

    @Override
    public Attendance save(Attendance attendance) {
        em.persist(attendance);
        return attendance;
    }
}
