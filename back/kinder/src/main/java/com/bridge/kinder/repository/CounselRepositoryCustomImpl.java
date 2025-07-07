package com.bridge.kinder.repository;

import com.bridge.kinder.dto.CounselDto.Update;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Counsel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CounselRepositoryCustomImpl implements CounselRepositoryCustom {

    private final CounselRepository counselRepository;

    @PersistenceContext
    private EntityManager em;

    //반번호로 상담일정 리스트 조회
    @Override
    public List<Counsel> findCounselByClassNo(int classNo) {
        return em.createQuery("SELECT c FROM Counsel c WHERE c.child.classRoom.classNo = :classNo", Counsel.class)
                .setParameter("classNo", classNo)
                .getResultList();
    }

    //상담 번호로 상담일정 수정
    @Override
    public Optional<Counsel> updateCounsel(Update dto, int counselNo) {
        Counsel counsel = counselRepository.findById(counselNo).orElse(null);

        if(counsel == null) {return  Optional.empty();}

        counsel.update(
                dto.getCounsel_type(),
                dto.getCounsel_status(),
                dto.getCounsel_date(),
                dto.getCounsel_start(),
                dto.getCounsel_end()
        );

        Counsel updateCounsel = counselRepository.save(counsel);

        return Optional.of(updateCounsel);
    }

    @Override
    public List<Counsel> getCounselByMemberNo(int memberNo) {
        return List.of();
    }
}
