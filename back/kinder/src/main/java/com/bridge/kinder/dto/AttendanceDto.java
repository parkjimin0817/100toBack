package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.enums.CommonEnums;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
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

        public static Response toDto(Attendance attendance) {
            return Response.builder()
                    .attendance_no(attendance.getAttendanceNo())
                    .in_time(attendance.getInTime())
                    .out_time(attendance.getOutTime())
                    .member_no(attendance.getMember().getMemberNo())
                    .center_no(attendance.getMember().getCenter().getCenterNo())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateTeacherAttendance {
        private CommonEnums.TeacherAttendanceStatus status;
        private LocalDate attendanceDate;
        private LocalDateTime inTime;
        private LocalDateTime outTime;
        private int memberNo;
        private int centerNo;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class CreateAttendance{
        private int class_no;

        private String child_name; //아동 이름
        private CommonEnums.ChildAttendanceStatus status; //아동 출결 상태
        private String class_name; //반 이름
        private LocalDate create_date; //생성일
        private int child_no; //아동 번호

        public static CreateAttendance toDto(ChildAttendance childAttendance) {
            return CreateAttendance.builder()
                    .child_no(childAttendance.getChild().getChildNo())
                    .child_name(childAttendance.getChild().getChildName())
                    .class_name(childAttendance.getClassRoom().getClassName())
                    .create_date(childAttendance.getCreateDate())
                    .status(childAttendance.getStatus())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UpdateAttendance {
        private int child_no;
        private int class_no;
        private LocalDate create_date;

        private CommonEnums.ChildAttendanceStatus status;

        public static UpdateAttendance toDto(ChildAttendance childAttendance) {
            return UpdateAttendance.builder()
                    .status(childAttendance.getStatus())
                    .build();
        }
    }
}

