package com.bridge.kinder.repository;

import com.bridge.kinder.dto.ScheduleDto.CreateScheduleDto;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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

    //스케줄 리스트 불러오기
    @Override
    public List<Schedule> findScheduleAll(int centerNo, int memberNo, CommonEnums.RollType type) {
        return em.createQuery(
                "SELECT s FROM Schedule s " +
                        "WHERE s.center.centerNo = :centerNo " +
                        "AND s.member.memberNo = : memberNo " +
                        "AND s.type = :type", Schedule.class)
                .setParameter("centerNo", centerNo)
                .setParameter("memberNo", memberNo)
                .setParameter("type", type)
                .getResultList();
    }
}
