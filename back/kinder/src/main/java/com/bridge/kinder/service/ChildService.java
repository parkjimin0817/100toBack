package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;

import java.util.List;

public interface ChildService {
    //아동 생성
//    String createChild(ChildDto.CreateChild dto);
    //반으로 아동 목록 불러오기
    List<ChildDto.Response> findChildrenByClassNo(int class_no);
}
