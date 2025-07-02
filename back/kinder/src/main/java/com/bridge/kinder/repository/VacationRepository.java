package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Vacation;
import com.bridge.kinder.enums.CommonEnums.VacationType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacationRepository extends JpaRepository<Vacation, Long> {
    List<Vacation> findByMember_MemberNo(int memberNo);
    Page<Vacation> findByMember_Center_CenterNoAndType(int centerNo, VacationType type, Pageable pageable);
    Page<Vacation> findByMember_Center_CenterNo(int centerNo, Pageable pageable);
}
