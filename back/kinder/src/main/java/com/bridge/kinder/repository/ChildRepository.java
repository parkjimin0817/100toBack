package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;

import java.util.List;
import java.util.Optional;

public interface ChildRepository {
    //아동 생성
    void save(Child child);
    //번호로 아동 찾기
    Optional<Child> findByChildNo(int childNo);
    //주민번호로 아동 찾기
    Optional<Child> findByResidentNo(String residentNo);
    //반으로 아동 목록
    List<Child> findByClassNo(int classNo);
    //센터번호로 아동 불러오기(해당 시설 아이 전체 조회)
    List<Child> findByCenterNo(int centerNo);

}
