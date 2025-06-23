package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;

import java.util.Optional;

public interface ChildRepository {
    //아동 생성
    void save(Child child);
    //아동 찾기
    Optional<Child> findByResidentNo(String residentNo);
}
