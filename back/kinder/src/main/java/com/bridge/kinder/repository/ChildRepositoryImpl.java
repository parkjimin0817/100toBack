package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Member;
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

    //child_no로 아동 찾기
    @Override
    public Optional<Child> getByChildNo(int child_no) {
        Child child = em.createQuery("SELECT c FROM Child c WHERE c.childNo = :child_no", Child.class)
                .setParameter("child_no", child_no)
                .getSingleResult();
        return Optional.ofNullable(child);
    }

    //아동번호와 반 번호로 반 수정(시설장)
    @Override
    public Optional<Child> updateClass(int child_no, int class_no) {
        String jpql = "UPDATE Child c SET c.classRoom.classNo = :class_no WHERE c.childNo = :child_no";
        int updated = em.createQuery(jpql)
                .setParameter("class_no", class_no)
                .setParameter("child_no", child_no)
                .executeUpdate();
        // JPQL UPDATE는 반환값이 없음 → 다시 조회해서 Optional로 감싸야 함
        if (updated > 0) {
            Child child = em.createQuery(
                            "SELECT c FROM Child c WHERE c.childNo = :child_no", Child.class)
                    .setParameter("child_no", child_no)
                    .getSingleResult();
            return Optional.of(child);
        } else {
            return Optional.empty();
        }
    }
}