package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Center;

import java.util.Optional;

public interface CenterRepository {
    //센터 생성
    Center save(Center center);
    //센터 찾기
    Optional<Center> findById(Integer centerNo);
}
