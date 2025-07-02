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
        List<Integer> memberNos = em.createQuery(
                        "SELECT m.member.memberNo FROM MemberChild m WHERE m.child.childNo = :childNo",
                        Integer.class
                )
                .setParameter("childNo", childNo)
                .getResultList();

        // 부모가 없을 수도 있으니 예외 처리도 함께
        if (memberNos.isEmpty()) {
            throw new IllegalStateException("해당 아동에 대한 부모 정보가 없습니다.");
        }

        return memberNos.get(0); // 첫 번째 부모의 memberNo 반환
    }

}
