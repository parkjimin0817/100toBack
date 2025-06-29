package com.bridge.kinder.dto;

import com.bridge.kinder.enums.CommonEnums;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceStatusDto {
    private int member_no;
    private int center_no;
    private int attendance_no;
    private LocalDate attendance_date;
    private LocalDateTime in_time;
    private LocalDateTime out_time;
    private CommonEnums.TeacherAttendanceStatus status;

}
