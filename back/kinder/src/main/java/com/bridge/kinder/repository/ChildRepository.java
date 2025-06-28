package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;

import com.bridge.kinder.entity.ChildActivityData;
import com.bridge.kinder.entity.ChildActivityLog;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.ChildHealthData;
import com.bridge.kinder.entity.ChildHealthLog;
import java.util.List;
import java.util.Optional;

public interface ChildRepository {
    //아동 생성
    void save(Child child);
    //번호로 아동 찾기
    Optional<Child> findByChildNo(int childNo);
    //주민번호로 아동 찾기
    Optional<Child> findByResidentNo(String residentNo);
    //반으로 아동 목록
    List<Child> findByClassNo(int classNo);
    //반 별 아동 수
    int countChildByClassroom(int classNo);
    //센터번호로 아동 불러오기(해당 시설 아이 전체 조회)
    List<Child> findByCenterNo(int centerNo);
    //아동 번호로 아동 찾아오기
    Optional<Child> getByChildNo(int child_no);
    //아동 번호로 반 수정하기
    Optional<Child> updateClass(int child_no,int class_no);
    //아동 번호, 시설 번호로 아동 찾아오기
    List<Child> findByChildNoCenterNo(int classNo, int centerNo);
    //아동 번호로 건강 로그 조회하기
    List<ChildHealthLog> healthLog(int childNo);
    //아동 번호로 건강 데이터 조회하기
    Optional<ChildHealthData> health(int childNo);
    //아동 번호로 생활 로그 조회하기
    List<ChildActivityLog> activityLog(int childNo);
    //아동 번호로 생활 데이터 조회하기
    Optional<ChildActivityData> activity(int childNo);
    //아동 번호로 아동 출석 조회
    List<ChildAttendance> attendance(int childNo);

}
