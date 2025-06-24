package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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

    //반번호로 찾기
    @Override
    public List<Child> findByClassNo(int classNo) {
        return em.createQuery("SELECT c FROM Child c WHERE c.classRoom.classNo = :classNo", Child.class)
                .setParameter("classNo", classNo)
                .getResultList();
    }
}
