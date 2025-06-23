package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;

import java.util.List;

import java.io.IOException;

public interface ChildService {

    //반으로 아동 목록 불러오기
    List<ChildDto.Response> findChildrenByClassNo(int class_no);
    //아동 생성
    String createChild(ChildDto.CreateChild dto) throws IOException;
    String linkChild(ChildDto.LinkChildRequest dto) throws IOException;
}
