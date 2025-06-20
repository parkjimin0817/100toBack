package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;

public interface ChildRepository {
    //아동 생성
    void save(Child child);
}
