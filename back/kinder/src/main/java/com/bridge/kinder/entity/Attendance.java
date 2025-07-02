package com.bridge.kinder.entity;

import com.bridge.kinder.dto.AttendanceDto;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.TeacherAttendanceStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "ATTENDANCE",
//하루 중 중복 출근 방지 제약 조건
uniqueConstraints = {
        @UniqueConstraint(columnNames = {"MEMBER_NO", "ATTENDANCE_DATE"})
})
public class Attendance {// 근태

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ATTENDANCE_NO")
    private int attendanceNo;
    //근태 번호

    @Column(name = "IN_TIME")
    private LocalDateTime inTime;
    //출근시간

    @Column(name = "OUT_TIME")
    private LocalDateTime outTime;
    //퇴근시간

    @Column(name = "ATTENDANCE_DATE")
    private LocalDate attendanceDate;

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    private CommonEnums.TeacherAttendanceStatus status;
    //출근 상태 (결근, 출근, 출근중, 공휴일, 주말, 휴가, 워케이션)


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CENTER_NO")
    private Center center;
    //시설

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버

    //----------------------------------------------------------------------------------------------

    public void updateOutTime(LocalDateTime outTime) {
        this.outTime = outTime;
    }

    //-----------------------------------------------------------------------------------------------

    @PrePersist
    public void setAttendanceDate() {
        if(this.attendanceDate == null){
            this.attendanceDate = LocalDate.now();
        }
    }

    //------------------------------------------------------------------------------------------------

    public void updateStatus(TeacherAttendanceStatus status) {
        this.status = status;
    }

    public void updateFromDto(AttendanceDto.UpdateTeacherAttendance updateDto) {
        if(updateDto.getStatus() != null) {
            this.status = updateDto.getStatus();
        }

        if(updateDto.getInTime() != null) {
            this.inTime = updateDto.getInTime();
        }

        if(updateDto.getOutTime() != null) {
            this.outTime = updateDto.getOutTime();
        }
    }

}
