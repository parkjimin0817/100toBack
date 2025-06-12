package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "ATTENDANCE")
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


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CENTER_NO")
    private Center center;
    //시설

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.inTime = LocalDateTime.now();
    }
}
