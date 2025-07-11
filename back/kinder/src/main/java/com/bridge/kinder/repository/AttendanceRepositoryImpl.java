package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.enums.CommonEnums.ChildAttendanceStatus;
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

    //기록 저장
    @Override
    public Attendance save(Attendance attendance) {
        em.persist(attendance);
        return attendance;
    }

    @Override
    public Optional<Attendance> findById(int attendanceNo) {
        return Optional.ofNullable(em.find(Attendance.class, attendanceNo));
    }

    //달별 출근 기록
    @Override
    public List<Attendance> findByMemberNoAndDateRange(int memberNo, int centerNo, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        String jpql = "SELECT a FROM Attendance a WHERE a.member.memberNo =:memberNo AND a.center.centerNo = :centerNo  AND a.attendanceDate BETWEEN :start AND :end";

        return em.createQuery(jpql, Attendance.class)
                .setParameter("memberNo", memberNo)
                .setParameter("centerNo", centerNo)
                .setParameter("start", startDateTime.toLocalDate())
                .setParameter("end", endDateTime.toLocalDate())
                .getResultList();
    }

    //아동 출결 추가
    @Override
    public void createChildAttendance(List<ChildAttendance> attendances) {
        for (ChildAttendance attendance : attendances) {
            em.persist(attendance);
        }
    }

    //아동 출결 해당 반과 해당 날짜 조회
    @Override
    public List<ChildAttendance> findByClassNoAndCreateDate(int classNo, LocalDate createDate) {
        return em.createQuery(
                "SELECT c FROM ChildAttendance c " +
                        "WHERE c.classRoom.classNo = :classNo AND c.createDate = :createDate", ChildAttendance.class)
                .setParameter("classNo", classNo)
                .setParameter("createDate",createDate)
                .getResultList();
    }


    @Override
    public ChildAttendance getChildAttendance(int classNo, int childNo, LocalDate createDate) {
        String query = "SELECT c FROM ChildAttendance c WHERE c.classRoom.classNo = :classNo AND c.child.childNo = :childNo AND c.createDate = :createDate";
        return (em.createQuery(query, ChildAttendance.class)
                .setParameter("classNo",classNo)
                .setParameter("childNo",childNo)
                .setParameter("createDate",createDate)
                .getSingleResult());
    }

    @Override
    public Optional<Long> countPresentChild(int classNo, LocalDate today, ChildAttendanceStatus status) {
        String jpql = "SELECT COUNT (ca) FROM ChildAttendance ca " +
                " WHERE ca.classRoom.classNo = :classNo " +
                "AND ca.createDate = :today " +
                " AND ca.status = :status";
        Long count = em.createQuery(jpql, Long.class)
                .setParameter("classNo", classNo)
                .setParameter("today", today)
                .setParameter("status", status)
                .getSingleResult();
        return Optional.ofNullable(count);

    }
}
