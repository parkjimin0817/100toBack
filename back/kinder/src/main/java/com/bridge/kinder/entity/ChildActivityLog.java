package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CHILD_ACTIVITY_Log")
public class ChildActivityLog {// 아동 생활 기록

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHILD_ACTIVITY_LOG_NO")
    private int childActivityLogNo;
    //아동 생활 기록 번호

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;
    //기록일

    @Column(name = "DAILY_MEAL_AMOUNT", length = 100)
    private String dailyMealAmount;
    //금일 식사량

    @Column(name = "NAP_START_TIME")
    private LocalTime napStartTime;
    //낮잠 시작 시간

    @Column(name = "NAP_END_TIME")
    private LocalTime napEndTime;
    //낮잠 종료 시간

    @Column(name = "PLAY_PARTICIPATION", length = 100)
    private String playParticipation;
    //놀이 참여도

    @Column(name = "DAILY_FRIENDSHIP")
    private String dailyFriendship;
    //금일 교우관계

    @Column(name = "ACTIVITY_LOG_MEMO")
    private String activityLogMemo;
    //아동 생활 기록 메모


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHILD_NO")
    private Child child;
    //아동


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
    }
}
