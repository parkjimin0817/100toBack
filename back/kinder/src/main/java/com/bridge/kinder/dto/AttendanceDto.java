package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Attendance;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class AttendanceDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    //근태관리 리스폰스
    public static class Response {
        private int attendance_no;
        private LocalDateTime in_time;
        private LocalDateTime out_time;
        private int member_no;
        private int center_no;

        public static Response toDto(Attendance attendance){
            return Response.builder()
                    .attendance_no(attendance.getAttendanceNo())
                    .in_time(attendance.getInTime())
                    .out_time(attendance.getOutTime())
                    .member_no(attendance.getMember().getMemberNo())
                    .center_no(attendance.getMember().getCenter().getCenterNo())
                    .build();
        }
    }

}
