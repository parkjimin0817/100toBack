package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.enums.CommonEnums;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceStatusDto {
    private int member_no;
    private int center_no;
    private int attendance_no;
    private LocalDate attendance_date;
    private LocalDateTime in_time;
    private LocalDateTime out_time;
    private CommonEnums.TeacherAttendanceStatus status;

    public static AttendanceStatusDto toDto(Attendance attendance, int memberNo, int centerNo) {
        return AttendanceStatusDto.builder()
                .attendance_no(attendance.getAttendanceNo())
                .attendance_date(attendance.getAttendanceDate())
                .in_time(attendance.getInTime())
                .out_time(attendance.getOutTime())
                .member_no(memberNo)
                .center_no(centerNo)
                .status(
                        attendance.getStatus() != null
                                ? attendance.getStatus()
                                : attendance.getOutTime() == null
                                ? CommonEnums.TeacherAttendanceStatus.WORKING
                                : CommonEnums.TeacherAttendanceStatus.PRESENT
                )
                .build();
    }
}