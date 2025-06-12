package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

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
    //연차번호

    @Column(name = "LEAVE_DAYS")
    private int leaveDays;
    //전체 연차 일수

    @Column(name = "UUSED_LEAVE")
    private int usedLeave;
    //사용한 연차 일수

    @Column(name = "REMAIN_LEAVE")
    private int remainLeave;
    //남은 연차 일수
}
