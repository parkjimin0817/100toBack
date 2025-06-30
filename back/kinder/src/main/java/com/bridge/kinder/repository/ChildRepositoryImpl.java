package com.bridge.kinder.repository;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.dto.ChildDto.activityLog;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildActivityData;
import com.bridge.kinder.entity.ChildActivityLog;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.ChildHealthData;
import com.bridge.kinder.entity.ChildHealthLog;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ChildRepositoryImpl implements ChildRepository {

    @PersistenceContext
    private EntityManager em;

    //아동 생성
    @Override
    public void save(Child child) {
        em.persist(child);
    }

    //번호로 아동 찾기
    @Override
    public Optional<Child> findByChildNo(int childNo) {
        return Optional.ofNullable(em.find(Child.class, childNo));
    }

    //주민번호로 아동 찾기
    @Override
    public Optional<Child> findByResidentNo(String residentNo) {
        List<Child> result = em.createQuery("select c from Child c where c.childResidentNo = :residentNo", Child.class)
                .setParameter("residentNo", residentNo)
                .getResultList();

        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }

    //반 별 아동 목록
    @Override
    public List<Child> findByClassNo(int classNo) {
        return em.createQuery("SELECT c FROM Child c WHERE c.classRoom.classNo = :classNo", Child.class)
                .setParameter("classNo", classNo)
                .getResultList();
    }

    //시설 번호로 아동들 전부 조회
    @Override
    public List<Child> findByCenterNo(int centerNo) {
        return em.createQuery("SELECT c FROM Child c WHERE c.center.centerNo  = :centerNo", Child.class)
                .setParameter("centerNo", centerNo)
                .getResultList();
    }

    //반별 아동 수 카운트
    @Override
    public int countChildByClassroom(int classNo) {
       Long count =  em.createQuery("SELECT COUNT(c) FROM Child c WHERE c.classRoom.classNo =: classNo", Long.class)
                .setParameter("classNo", classNo)
                .getSingleResult();

       return count.intValue();
    }

    //반에 속한 아동 조회
    @Override
    public List<Child> findByClassRoom(ClassRoom classRoom) {
        int classNo = classRoom.getClassNo();
        return em.createQuery("SELECT c FROM Child c WHERE c.classRoom.classNo  = :classNo", Child.class)
                .setParameter("classNo", classNo)
                .getResultList();
    }

    //child_no로 아동 찾기
    @Override
    public Optional<Child> getByChildNo(int childNo) {
        System.out.println("전달된 childNo: " + childNo);
        Child child = em.createQuery("SELECT c FROM Child c WHERE c.childNo = :child_no", Child.class)
                .setParameter("child_no", childNo)
                .getSingleResult();
        return Optional.ofNullable(child);
    }

    //아동번호와 반 번호로 반 수정(시설장)
    @Override
    public Optional<Child> updateClass(int childNo, int classNo) {
        Child child = em.find(Child.class, childNo);
        if (child == null) return Optional.empty();

        if (classNo == 0) {
            child.setClassRoom(null); //  미배정으로 선택할 경우
        } else {
            ClassRoom classRoom = em.find(ClassRoom.class, classNo);
            if (classRoom == null) return Optional.empty();
            child.setClassRoom(classRoom); //  반 배정
        }

        return Optional.of(child); //  반영된 child 반환
    }



    //아동 번호로 해당 아동의 건강 로그 데이터 불러오기(매일 적는 거)
    @Override
    public List<ChildHealthLog> healthLog(int childNo) {
        return em.createQuery("SELECT c FROM ChildHealthLog c WHERE c.child.childNo  = :childNo", ChildHealthLog.class)
                .setParameter("childNo", childNo)
                .getResultList();
    }

    //아동 번호로 해당 아동의 건강 데이터 불러오기(복약정보,예방접종,알레르기)
    @Override
    public Optional<ChildHealthData> health(int childNo) {
        List<ChildHealthData> results = em.createQuery(
                        "SELECT c FROM ChildHealthData c WHERE c.child.childNo = :childNo", ChildHealthData.class)
                .setParameter("childNo", childNo)
                .getResultList();

        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }


    //아동 번호로 해당 아동의 행동 로그 데이터 불러오기(매일 적는 거)
    @Override
    public List<ChildActivityLog> activityLog(int childNo) {
        return em.createQuery("SELECT c FROM ChildActivityLog c WHERE c.child.childNo  = :childNo", ChildActivityLog.class)
                .setParameter("childNo", childNo)
                .getResultList();
    }

    //아동 번호로 해당 아동의 생활 데이터 불러오기
    @Override
    public Optional<ChildActivityData> activity(int childNo) {
        List<ChildActivityData> results = em.createQuery(
                        "SELECT c FROM ChildActivityData c WHERE c.child.childNo = :childNo", ChildActivityData.class)
                .setParameter("childNo", childNo)
                .getResultList();

        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }


    //아동 번호로 해당 아동의 출석 내역 리스트 불러오기
    @Override
    public List<ChildAttendance> attendance(int childNo) {
        return em.createQuery("SELECT c FROM ChildAttendance c WHERE c.child.childNo  = :childNo", ChildAttendance.class)
                .setParameter("childNo", childNo)
                .getResultList();
    }

    //아동 번호로 해당 아동의 제일 최근 건강 로그 데이터 가져오기
    @Override
    public Optional<ChildHealthLog> recentPhysicalInfo(int childNo) {
        List<ChildHealthLog> results = em.createQuery(
                        "SELECT c FROM ChildHealthLog c WHERE c.child.childNo = :childNo ORDER BY c.createDate DESC",
                        ChildHealthLog.class)
                .setParameter("childNo", childNo)
                .setMaxResults(1)
                .getResultList();

        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    //아동 건강 데이터 수정
    @Override
    public Optional<ChildHealthData> updateHealthData(int childNo, ChildDto.health dto) {
        Child child = em.find(Child.class, childNo);
        if (child == null) return Optional.empty();

        List<ChildHealthData> results = em.createQuery(
                        "SELECT c FROM ChildHealthData c WHERE c.child.childNo = :childNo", ChildHealthData.class)
                .setParameter("childNo", childNo)
                .getResultList();

        ChildHealthData entity;

        if (results.isEmpty()) {
            // 새로 생성
            entity = ChildHealthData.builder()
                    .child(child)
                    .build();
            em.persist(entity); // 새 엔티티 저장 (영속 상태 진입)
        } else {
            entity = results.get(0);
        }

        // 공통: 기존이든 신규든 DTO로부터 값 복사
        entity.updateFromDto(dto);

        return Optional.of(entity);
    }

    //아동 생활 데이터 수정
    @Override
    public Optional<ChildActivityData> updateActivityData(int childNo, ChildDto.activity dto) {
        Child child = em.find(Child.class, childNo);
        if (child == null) return Optional.empty();

        List<ChildActivityData> results = em.createQuery(
                        "SELECT c FROM ChildActivityData c WHERE c.child.childNo = :childNo", ChildActivityData.class)
                .setParameter("childNo", childNo)
                .getResultList();

        ChildActivityData entity;

        if (results.isEmpty()) {
            // 새로 생성
            entity = ChildActivityData.builder()
                    .child(child)
                    .build();
            em.persist(entity); // 새 엔티티 저장 (영속 상태 진입)
        } else {
            entity = results.get(0);
        }

        // 공통: 기존이든 신규든 DTO로부터 값 복사
        entity.updateFromDto(dto);

        return Optional.of(entity);
    }

    @Override
    public List<ChildHealthLog> getHealthLog(int classNo, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        return em.createQuery("SELECT c FROM ChildHealthLog c WHERE c.child.classRoom.classNo = :classNo AND c.createDate >= :start AND c.createDate < :end", ChildHealthLog.class)
                .setParameter("classNo", classNo)
                .setParameter("start", start)
                .setParameter("end", end)
                .getResultList();
    }

    @Override
    public List<ChildActivityLog> getActivityLog(int classNo, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        return em.createQuery("SELECT c FROM ChildActivityLog c WHERE c.child.classRoom.classNo = :classNo AND c.createDate >= :start AND c.createDate < :end", ChildActivityLog.class)
                .setParameter("classNo", classNo)
                .setParameter("start", start)
                .setParameter("end", end)
                .getResultList();
    }

    @Override
    public List<Child> findByMemberNo(int memberNo) {
        return em.createQuery(
                        "SELECT c FROM MemberChild mc JOIN mc.child c WHERE mc.member.memberNo = :memberNo", Child.class)
                .setParameter("memberNo", memberNo)
                .getResultList();
    }

    @Override
    public Optional<ChildActivityLog> updateActivityLog(int childNo, LocalDate date, activityLog data) {
        // 날짜 기준 범위 계산
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        // 기존 로그 조회
        List<ChildActivityLog> logs = em.createQuery(
                        "SELECT log FROM ChildActivityLog log " +
                                "WHERE log.child.childNo = :childNo AND log.createDate >= :start AND log.createDate < :end",
                        ChildActivityLog.class)
                .setParameter("childNo", childNo)
                .setParameter("start", start)
                .setParameter("end", end)
                .getResultList();

        ChildActivityLog targetLog;

        if (!logs.isEmpty()) {
            // 기존 로그가 있을 경우 → 수정
            targetLog = logs.get(0);
            targetLog.update(
                    data.getDailyMeal_amount(),
                    data.getNapStart_time(),
                    data.getNapEnd_time(),
                    data.getPlay_participation(),
                    data.getDaily_friendship(),
                    data.getActivity_log_memo()
            );
        } else {
            // 없을 경우 → 새로 생성
            Child child = em.find(Child.class, childNo); // 자식 엔티티 로드
            if (child == null) return Optional.empty(); // child가 없으면 실패

            targetLog = ChildActivityLog.builder()
                    .child(child)
                    .createDate(start)
                    .dailyMealAmount(data.getDailyMeal_amount())
                    .napStartTime(data.getNapStart_time())
                    .napEndTime(data.getNapEnd_time())
                    .playParticipation(data.getPlay_participation())
                    .dailyFriendship(data.getDaily_friendship())
                    .activityLogMemo(data.getActivity_log_memo())
                    .build();

            em.persist(targetLog);
        }

        return Optional.of(targetLog);
    }
}