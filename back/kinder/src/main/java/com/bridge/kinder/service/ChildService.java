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
    //시설장 아동목록 조회(전부)
    List<ChildDto.childListResponse> managerChildList(int centerNo);
    //반 배정 모달 아동 조회
    ChildDto.modalResponse getChild(int child_no);
    //아동 번호로 반 배정
    ChildDto.updateClass updateClass(int child_no,int class_no);
}
