package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.entity.ClassRoom;

import java.util.Optional;

public interface ClassRoomRepository {
    
    //반 생성
    void save(ClassRoom classRoom);

    // 반 번호로 조회
    Optional<ClassRoom> findById(int classRoomNo);
}
