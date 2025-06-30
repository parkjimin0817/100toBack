package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Resign;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResignRepository extends JpaRepository<Resign, Long> {
    Optional<Resign> findByCenter_CenterNoAndMember_MemberNo(int centerNo, int memberNo);
}
