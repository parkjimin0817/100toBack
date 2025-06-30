package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildActivityData;
import com.bridge.kinder.entity.MemberChild;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class MemberChildRepositoryImpl implements MemberChildRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void save(MemberChild memberChild) {
        em.persist(memberChild);
    }

    @Override
    public int findByChildNo(int childNo) {
        return em.createQuery(
                        "SELECT m.member.memberNo FROM MemberChild m WHERE m.child.childNo = :childNo",
                        Integer.class
                )
                .setParameter("childNo", childNo)
                .getSingleResult();  // Integer → autounboxing → int
    }

}
