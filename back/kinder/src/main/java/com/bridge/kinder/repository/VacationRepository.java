package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Vacation;
import com.bridge.kinder.enums.CommonEnums.VacationType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VacationRepository extends JpaRepository<Vacation, Long> {
    List<Vacation> findByMember_MemberNo(int memberNo);
    @Query("SELECT v FROM Vacation v WHERE v.member.center.centerNo = :centerNo AND v.type = :type ORDER BY v.createDate DESC")
    Page<Vacation> findByMember_Center_CenterNoAndType(@Param("centerNo") int centerNo, @Param("type") VacationType type, Pageable pageable);
    @Query("SELECT v FROM Vacation v WHERE v.member.center.centerNo = :centerNo ORDER BY v.createDate DESC")
    Page<Vacation> findByMember_Center_CenterNo(@Param("centerNo") int centerNo, Pageable pageable);
}
