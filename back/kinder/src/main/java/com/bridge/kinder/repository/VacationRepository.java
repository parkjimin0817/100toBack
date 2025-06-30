package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Vacation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacationRepository extends JpaRepository<Vacation, Long> {
    List<Vacation> findByMember_MemberNo(int memberNo);
}
