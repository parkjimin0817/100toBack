package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Holiday;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    boolean existsByHolidayDate(LocalDate holidayDate); //이미 있는 날짜 중복 저장 방지
    boolean existsByHolidayDateBetween(LocalDate start, LocalDate end);
    List<Holiday> findByHolidayDateBetween(LocalDate start, LocalDate end);

    long countByHolidayDateBetween(LocalDate start, LocalDate end);
    Optional<Holiday> findByHolidayDate(LocalDate holidayDate);
}
