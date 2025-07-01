package com.bridge.kinder.service;

import com.bridge.kinder.dto.AttendanceDto;
import com.bridge.kinder.dto.AttendanceDto.UpdateTeacherAttendance;
import com.bridge.kinder.dto.AttendanceStatusDto;
import java.util.List;

public interface AttendanceService {
    //당일 출퇴근 기록 불러오기
    AttendanceDto.Response getTodayAttendance(int memberNo);
    //출근 기록하기
    AttendanceDto.Response recordWorkIn(int memberNo);
    //퇴근 기록하기
    AttendanceDto.Response recordWorkOut(int memberNo);
    //교사 월별 기록
    List<AttendanceStatusDto> getTeacherMonthlyAttendance(int memberNo, int centerNo, int year, int month);
    //교사 근태 수정
    void updateTeacherAttendance(int attendanceNo, UpdateTeacherAttendance updateDto);
    //아동 출결 생성
    List<AttendanceDto.CreateAttendance> createChildAttendance(AttendanceDto.CreateAttendance dto);
    //아동 출결 상태 변경
    AttendanceDto.UpdateAttendance updateChildAttendance(AttendanceDto.UpdateAttendance updateDto);
}
