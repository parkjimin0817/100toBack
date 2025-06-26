package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.entity.ClassRoom;

import java.util.List;

import java.util.Optional;

public interface ClassRoomRepository {
    
    //반 생성
    void save(ClassRoom classRoom);

    //시설 별 반 목록
    List<ClassRoom> findByCenterNo(int centerNo);

    // 반 번호로 조회
    Optional<ClassRoom> findById(int classRoomNo);
}
