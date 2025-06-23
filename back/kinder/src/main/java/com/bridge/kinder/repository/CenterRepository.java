package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Center;

import java.util.List;
import java.util.Optional;

public interface CenterRepository {
    //센터 생성
    Center save(Center center);
    //센터 찾기
    Optional<Center> findById(Integer centerNo);
    //센터 전체 리스트 불러오기
    List<Center> findAll();
}
