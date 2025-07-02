package com.bridge.kinder.repository;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.entity.Child;

import com.bridge.kinder.entity.ChildActivityData;
import com.bridge.kinder.entity.ChildActivityLog;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.ChildHealthData;
import com.bridge.kinder.entity.ChildHealthLog;
import com.bridge.kinder.entity.ClassRoom;
import java.time.LocalDate;
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
    //반에 속한 아동 조회
    List<Child> findByClassRoom(ClassRoom classRoom);
    //센터번호로 아동 불러오기(해당 시설 아이 전체 조회)
    List<Child> findByCenterNo(int centerNo);
    //아동 번호로 아동 찾아오기
    Optional<Child> getByChildNo(int child_no);
    //아동 번호로 반 수정하기
    Optional<Child> updateClass(int child_no,int class_no);

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
    //아동 번호로 아동 키,몸무게 조회
    Optional<ChildHealthLog> recentPhysicalInfo(int childNo);
    //아동 건강 데이터 수정
    Optional<ChildHealthData> updateHealthData(int childNo, ChildDto.health data);
    //아동 생활 데이터 수정
    Optional<ChildActivityData> updateActivityData(int childNo, ChildDto.activity data);
    //아동 건강 로그 데이터 날짜,반 필터링해서 불러오기
    List<ChildHealthLog> getHealthLog(int classNo, LocalDate date);
    //아동 생활 로그 데이터 날짜,반 필터링해서 불러오기
    List<ChildActivityLog> getActivityLog(int classNo, LocalDate date);
    //부모 번호로 해당 연결된 아동 리스트 가져오기
    List<Child> findByMemberNo(int memberNo);
    //아동 건강 로그 데이터 삽입 혹은 수정하기
    Optional<ChildHealthLog> updateHealthLog(int childNo, LocalDate date, ChildDto.healthLog data);
    //아동 생활 로그 데이터 삽입 혹은 수정하기
    Optional<ChildActivityLog> updateActivityLog(int childNo, LocalDate date, ChildDto.activityLog data);
    //부모 멤버 번호로 본인 아동들의 건강 로그 데이터 가져오기
    List<ChildHealthLog> healthLogByParent(int memberNo, LocalDate date);
    //부모 멤버 번호로 본인 아동들의 생활 로그 데이터 가져오기
    List<ChildActivityLog> activityLogByParent(int memberNo, LocalDate date);

}
