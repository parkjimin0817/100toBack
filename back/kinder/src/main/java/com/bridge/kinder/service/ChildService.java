package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;

import java.io.IOException;

public interface ChildService {
    //아동 생성
    String createChild(ChildDto.CreateChild dto) throws IOException;
}
