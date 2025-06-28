package com.bridge.kinder.service;

import com.bridge.kinder.dto.AttendanceDto;
import com.bridge.kinder.dto.AttendanceDto.Response;
import com.bridge.kinder.enums.CommonEnums;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    //당일 출퇴근 기록 불러오기
    AttendanceDto.Response getTodayAttendance(int memberNo);
    //출근 기록하기
    AttendanceDto.Response recordWorkIn(int memberNo);
    //퇴근 기록하기
    AttendanceDto.Response recordWorkOut(int memberNo);
    //교사 월별 기록
    List<Response> getTeacherMonthlyAttendance(int memberNo, int year, int month);
    //아동 이름, 아동 출석 상태
    List<AttendanceDto.ClassAttendance> getChildAttendanceList(int classNo, LocalDate createDate);
    //아동 출결 상태 변경
    AttendanceDto.UpdateAttendance updateChildAttendance(AttendanceDto.UpdateAttendance updateDto);
}
