package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Attendance;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository

public class AttendanceRepositoryImpl implements AttendanceRepository {

    @PersistenceContext
    private EntityManager em;


//    //당일 출근 기록
//    @Override
//    public Optional<Attendance> findByMemberNoAndDate(int memberNo, LocalDateTime startOfDay, LocalDateTime endOfDay) {
//        String jpql = "SELECT a FROM Attendance a WHERE a.member.memberNo = :memberNo AND (a.inTime BETWEEN :start AND :end)";
//
//        List<Attendance> result = em.createQuery(jpql, Attendance.class)
//                .setParameter("memberNo", memberNo)
//                .setParameter("start", startOfDay)
//                .setParameter("end", endOfDay)
//                .getResultList();
//
//        return result.stream().findFirst();
//    }

    //기록 저장
    @Override
    public Attendance save(Attendance attendance) {
        em.persist(attendance);
        return attendance;
    }

    //달별 출근 기록
    @Override
    public List<Attendance> findByMemberNoAndDateRange(int memberNo, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        String jpql = "SELECT a FROM Attendance a WHERE a.member.memberNo =:memberNo AND (a.inTime BETWEEN :start AND :end)";

        return em.createQuery(jpql, Attendance.class)
                .setParameter("memberNo", memberNo)
                .setParameter("start", startDateTime)
                .setParameter("end", endDateTime)
                .getResultList();
    }
}
