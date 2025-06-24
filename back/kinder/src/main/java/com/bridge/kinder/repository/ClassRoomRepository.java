package com.bridge.kinder.repository;

import com.bridge.kinder.entity.ClassRoom;

import java.util.List;

public interface ClassRoomRepository {
    
    //반 생성
    void save(ClassRoom classRoom);

    //시설 별 반 목록
    List<ClassRoom> findByCenterNo(int centerNo);
}
