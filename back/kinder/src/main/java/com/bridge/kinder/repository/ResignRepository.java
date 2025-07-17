package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Resign;
import com.bridge.kinder.enums.CommonEnums;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResignRepository extends JpaRepository<Resign, Long> {
    Optional<Resign> findByCenter_CenterNoAndMember_MemberNoAndStatus(int centerCenterNo, int memberMemberNo, CommonEnums.ResignStatus status);
}
