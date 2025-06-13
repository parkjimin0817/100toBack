package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "LEAVE")
public class Leave {// 연차
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LEAVE_NO")
    private int leaveNo;
    //연차 번호

    @Column(name = "LEAVE_DAYS")
    private int leaveDays;
    //전체 연차 일수

    @Column(name = "UUSED_LEAVE")
    private int usedLeave;
    //사용한 연차 일수

    @Column(name = "REMAIN_LEAVE")
    private int remainLeave;
    //남은 연차 일수

    //---------------------------------------------------------------------------------------------
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버

    @OneToMany(mappedBy = "leave", cascade = CascadeType.ALL)
    @Builder.Default
    List<Vacation> vacations = new ArrayList<>();
    //휴가, 워케이션
}
