package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.entity.ClassRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class ClassRoomRepositoryImpl implements ClassRoomRepository {

    @PersistenceContext
    private EntityManager em;

    //반 생성하기
    @Override
    public void save(ClassRoom classRoom) { em.persist(classRoom); }

    @Override
    public Optional<ClassRoom> findById(int classRoomNo) {
        return Optional.ofNullable(em.find(ClassRoom.class, classRoomNo));
    }

}
