package com.bridge.kinder.repository;

import com.bridge.kinder.dto.ScheduleDto.CreateScheduleDto;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.RollType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ScheduleRepositoryImpl implements ScheduleRepository {

    @PersistenceContext
    private EntityManager em;

    //스케줄 생성
    @Override
    public void save(Schedule schedule) {
        em.persist(schedule);
    }

    //개인 스케줄 리스트 불러오기
    @Override
    public List<Schedule> findMemberScheduleAll(int centerNo, int memberNo) {
        return em.createQuery(
                "SELECT s FROM Schedule s " +
                        "WHERE s.center.centerNo = :centerNo " +
                        "AND s.member.memberNo = : memberNo ", Schedule.class)
                .setParameter("centerNo", centerNo)
                .setParameter("memberNo", memberNo)
                .getResultList();
    }

    //시설 스케줄 리스트 불러오기
    @Override
    public List<Schedule> findCenterScheduleAll(int centerNo) {
        return em.createQuery(
                "SELECT s FROM Schedule s " +
                        "WHERE s.center.centerNo = :centerNo " +
                        "AND s.type = : type ", Schedule.class)
                .setParameter("centerNo", centerNo)
                .setParameter("type", RollType.CENTER)
                .getResultList();
    }

    @Override
    public Schedule findScheduleByScheduleNo(int scheduleNo) {
        return em.find(Schedule.class, scheduleNo);
    }

    @Override
    public void deleteSchedule(Schedule schedule) {
        em.remove(schedule);
    }

    @Override
    public void saveDailySchedule(List<Schedule> schedules) {
        for(Schedule schedule : schedules) {
            em.persist(schedule);
        }
    }

    @Override
    public List<Schedule> findDailyList(int centerNo, int memberNo, int classNo, LocalDate scheduleDate) {
        return em.createQuery("select s from Schedule s "
                        + "where s.center.centerNo = :centerNo"
                        + " and s.member.memberNo = :memberNo"
                        + " and s.classRoom.classNo = :classNo"
                        + " and s.scheduleDate = :scheduleDate", Schedule.class)
                .setParameter("centerNo", centerNo)
                .setParameter("memberNo", memberNo)
                .setParameter("classNo",classNo)
                .setParameter("scheduleDate", scheduleDate)
                .getResultList();
    }
}
