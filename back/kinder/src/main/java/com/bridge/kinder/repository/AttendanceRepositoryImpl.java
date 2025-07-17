package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AdmissionStatus;
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
                        "WHERE c.classRoom.classNo = :classNo AND c.createDate = :createDate AND c.child.status = :status", ChildAttendance.class)
                .setParameter("classNo", classNo)
                .setParameter("createDate",createDate)
                .setParameter("status", AdmissionStatus.APPROVED)
                .getResultList();
    }


    @Override
    public ChildAttendance getChildAttendance(int classNo, int childNo, LocalDate createDate) {
        String query = "SELECT c FROM ChildAttendance c WHERE c.classRoom.classNo = :classNo AND c.child.childNo = :childNo AND c.createDate = :createDate AND c.child.status = :status";
        return (em.createQuery(query, ChildAttendance.class)
                .setParameter("classNo",classNo)
                .setParameter("childNo",childNo)
                .setParameter("createDate",createDate)
                .setParameter("status", AdmissionStatus.APPROVED)
                .getSingleResult());
    }

    @Override
    public Optional<Long> countPresentChild(int classNo, LocalDate today, ChildAttendanceStatus status) {
        String jpql = "SELECT COUNT(ca) FROM ChildAttendance ca " +
                " WHERE ca.classRoom.classNo = :classNo " +
                " AND ca.createDate = :today " +
                " AND ca.status = :status" +
                " AND ca.child.status = :statusc";

        Long count = em.createQuery(jpql, Long.class)
                .setParameter("classNo", classNo)
                .setParameter("today", today)
                .setParameter("status", status)
                .setParameter("statusc", AdmissionStatus.APPROVED)
                .getSingleResult();
        return Optional.ofNullable(count);

    }

    @Override
    public boolean existsByMemberAndDateBetween(int memberNo, LocalDate startDate, LocalDate endDate) {
        String jpql = "SELECT COUNT(a) FROM Attendance a " +
                "WHERE a.member.memberNo = :memberNo " +
                "AND a.attendanceDate BETWEEN :startDate AND :endDate" ;

        Long count = em.createQuery(jpql, Long.class)
                .setParameter("memberNo", memberNo)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getSingleResult();

        return count > 0;
    }

    @Override
    public List<Attendance> findByAttendanceDateAndStatus(LocalDate today, CommonEnums.TeacherAttendanceStatus status) {
        return em.createQuery("SELECT a FROM Attendance a WHERE a.attendanceDate = :today AND a.status = :status", Attendance.class)
                .setParameter("today", today)
                .setParameter("status", status)
                .getResultList();
    }
}
