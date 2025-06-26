package com.bridge.kinder.service;

import com.bridge.kinder.dto.AttendanceDto;

public interface AttendanceService {
    //당일 출퇴근 기록 불러오기
    AttendanceDto.Response getTodayAttendance(int memberNo);
    //출근 기록하기
    AttendanceDto.Response recordWorkIn(int memberNo);
    //퇴근 기록하기
    AttendanceDto.Response recordWorkOut(int memberNo);
}
