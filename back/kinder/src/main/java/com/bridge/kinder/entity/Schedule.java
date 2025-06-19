package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "SCHEDULE")
public class Schedule {// 일정

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SCHADULE_NO")
    private int scheduleNo;
    //일정 번호

    @Column(name = "ITLE", length = 50, nullable = false)
    private String title;
    //제목

    @Column(name = "DESCRIPTION", columnDefinition = "TEXT")
    private String description;
    //내용

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;
    //생성일

    @Column(name = "START_TIME")
    private LocalTime startTime;
    //시작시간

    @Column(name = "END_TIME")
    private LocalTime endTime;
    //종료시간

    @Column(name = "TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private CommonEnums.RollType type;
    //분류(시설, 반, 멤버)


    //---------------------------------------------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "CENTER_NO")
    private Center center;
    //시설

    @ManyToOne
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
    }
}
