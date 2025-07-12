package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findByMember_MemberNoAndIsReadFalseOrderByCreatedAtDesc(int memberNo);
}
