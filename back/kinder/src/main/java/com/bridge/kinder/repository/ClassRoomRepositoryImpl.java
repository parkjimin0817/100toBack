package com.bridge.kinder.repository;

import com.bridge.kinder.entity.ClassRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClassRoomRepositoryImpl implements ClassRoomRepository {

    @PersistenceContext
    private EntityManager em;

    //반 생성하기
    @Override
    public void save(ClassRoom classRoom) { em.persist(classRoom); }

    //시설 별 반 목록
    @Override
    public List<ClassRoom> findByCenterNo(int centerNo) {
        return em.createQuery("select c from ClassRoom c where c.center.centerNo =:centerNo", ClassRoom.class)
                .setParameter("centerNo", centerNo)
                .getResultList();

    }

}
