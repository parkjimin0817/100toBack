package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Leave;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    Optional<Leave> findByMember_MemberNo(int memberNo);
}
