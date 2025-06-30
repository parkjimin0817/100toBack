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
    //반 배정 모달 아동 조회
    ChildDto.modalResponse getChild(int child_no);
    //아동 번호로 반 배정
    ChildDto.updateClass updateClass(int child_no,int class_no);
    //아동 번호로 건강 로그 조회
    List<ChildDto.healthLog> healthLog(int childNo);
    //아동 번호로 건강 데이터 조회
    ChildDto.health health(int childNo);
    //아동 번호로 생활 로그 조회
    List<ChildDto.activityLog> activityLog(int childNo);
    //아동 번호로 생활 데이터 조회
    ChildDto.activity activity(int childNo);
    //아동 번호로 아동 출석 조회
    List<ChildDto.attendance> attendance(int childNo);
    //아동 상세보기
    ChildDto.detail detail(int childNo);

    //부모 번호로 해당 연결된 아동 리스트 가져오기
    List<ChildDto.myPageChilds> myPageChilds(int memberNo);
}
