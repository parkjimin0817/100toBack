package com.bridge.kinder.service;

import com.bridge.kinder.dto.ClassRoomDto;

import com.bridge.kinder.entity.ClassRoom;
import java.io.IOException;
import java.util.List;

public interface ClassRoomService {
    //반 생성
    ClassRoomDto.Response createClass(ClassRoomDto.Create classRoomCreate) throws IOException;
    //시설별 반 목록
    List<ClassRoomDto.Response> findClassesByCenterNo(int centerNo);
}
