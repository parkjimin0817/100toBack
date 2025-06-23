package com.bridge.kinder.service;

import com.bridge.kinder.dto.ClassRoomDto;

import java.io.IOException;

public interface ClassRoomService {

    Long createClass(ClassRoomDto.Create classRoomCreate) throws IOException;
}
