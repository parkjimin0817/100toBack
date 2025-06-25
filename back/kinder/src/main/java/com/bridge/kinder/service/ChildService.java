package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;

import java.util.List;

import java.io.IOException;

public interface ChildService {

    //반으로 아동 목록 불러오기
    List<ChildDto.Response> findChildrenByClassNo(int classNo);
    //아동 생성
    String createChild(ChildDto.CreateChild dto) throws IOException;
    //학부모 회원가입 후 마이페이지 아동 연결
    String linkChild(ChildDto.LinkChildRequest dto) throws IOException;
    //시설장 아동목록 조회(전부)
    List<ChildDto.childListResponse> managerChildList(int centerNo);
}
