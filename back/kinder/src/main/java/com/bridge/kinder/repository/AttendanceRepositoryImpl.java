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
}
