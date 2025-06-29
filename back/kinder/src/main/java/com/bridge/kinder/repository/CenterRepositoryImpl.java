package com.bridge.kinder.repository;

import com.bridge.kinder.dto.MypageDto;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AdmissionStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CenterRepositoryImpl implements CenterRepository {

    @PersistenceContext
    private EntityManager em;

    //센터 생성
    @Override
    public Center save(Center center) {
        em.persist(center);
        return center;
    }

    //센터 검색
    @Override
    public Optional<Center> findById(Integer centerNo) {
        if(centerNo == null) return Optional.empty();
        return Optional.ofNullable(em.find(Center.class, centerNo));
    }

    //센터 전체 리스트 불러오기
    @Override
    public List<Center> findAll() {
        return em.createQuery("SELECT c FROM Center c WHERE c.status = :status", Center.class)
                .setParameter("status", CommonEnums.AdmissionStatus.APPROVED)
                .getResultList();
    }

    //마이페이지 시설정보 수정
    @Override
    public Optional<Center> myPageUpdate(int id, MypageDto.Update dto) {
        // 1. memberNo → Member 조회
        Member member = em.createQuery("SELECT m FROM Member m WHERE m.memberNo = :memberNo", Member.class)
                .setParameter("memberNo", String.valueOf(id))
                .getSingleResult();

        if (member == null || member.getCenter() == null) {
            return Optional.empty();
        }

        // 2. centerNo 추출
        int centerNo = member.getCenter().getCenterNo();

        // 3. UPDATE 실행
        String jpql = "UPDATE Center c SET c.centerName = :name, c.centerTel = :tel, c.centerAddress = :addr, c.centerType = :type WHERE c.centerNo = :centerNo";

        int updated = em.createQuery(jpql)
                .setParameter("name", dto.getCenterName())
                .setParameter("tel", dto.getCenterTel())
                .setParameter("addr", dto.getCenterAddress())
                .setParameter("type", dto.getCenterType())
                .setParameter("centerNo", centerNo)
                .executeUpdate();

        if (updated > 0) {
            Center updatedCenter = em.createQuery("SELECT c FROM Center c WHERE c.centerNo = :centerNo", Center.class)
                    .setParameter("centerNo", centerNo)
                    .getSingleResult();
            return Optional.of(updatedCenter);
        }

        return Optional.empty();
    }
}
