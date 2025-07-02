package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;

import java.time.LocalDate;
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
    //아동 상세보기 건강 데이터 수정
    ChildDto.health updateHealthData(int childNo,ChildDto.health data);
    //아동 상세보기 생활 데이터 수정
    ChildDto.activity updateActivityData(int childNo, ChildDto.activity data);
    //아동 건강 체크리스트 날짜,반 별로
    List<ChildDto.healthLog> getHealthLog(int classNo, LocalDate date);
    //아동 생활 체크리스트 날짜,반 별로
    List<ChildDto.activityLog> getActivityLog(int classNo, LocalDate date);
    //아동 건강 로그 데이터 삽입,수정하기
    ChildDto.healthLog updateHealthLog(int childNo, LocalDate date, ChildDto.healthLog data);
    //아동 생활 로그 데이터 삽입,수정하기
    ChildDto.activityLog updateActivityLog(int childNo, LocalDate date, ChildDto.activityLog data);
    //부모 번호로 해당 연결된 아동 리스트 가져오기
    List<ChildDto.myPageChilds> myPageChilds(int memberNo);
    //부모 번호로 아동들의 건강 로그 체크리스트 불러오기
    List<ChildDto.healthLog> healthLogByParent(int memberNo, LocalDate date);
    //부모 번호로 아동들의 생활 로그 체크리스트 불러오기
    List<ChildDto.activityLog> activityLogByParent(int memberNo, LocalDate date);
}
