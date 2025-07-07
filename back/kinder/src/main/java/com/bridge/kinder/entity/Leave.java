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
@Table(name = "`LEAVE`")
public class Leave {// 연차
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LEAVE_NO")
    private int leaveNo;
    //연차 번호

    @Column(name = "LEAVE_DAYS")
    private int leaveDays;
    //전체 연차 일수

    @Column(name = "USED_LEAVE")
    private int usedLeave;
    //사용한 연차 일수


    //---------------------------------------------------------------------------------------------
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버

    @OneToMany(mappedBy = "leave", cascade = CascadeType.ALL)
    @Builder.Default
    List<Vacation> vacations = new ArrayList<>();
    //휴가, 워케이션

    //----------------------------------------------------------------------------------------------

    //남은 연차 계산
    @Transient
    public int getRemainLeave() {
        return leaveDays - usedLeave;
    }
    //연차 사용
    public void useLeave(int days){
        if( getRemainLeave() < days ){ //남은 연차보다 사용하고싶은 연차가 많다면
            throw new IllegalArgumentException("남은 연차가 부족합니다.");
        }
        this.usedLeave += days; //사용한 연차 + 사용할 연차
    }

    //연차 취소
    public void cancelLeave(int days){
        this.usedLeave -= days; //사용한 연차 - 신청했던 연차
        if(usedLeave < 0) usedLeave = 0; //사용한 연차는 0보다 작은 음수가 되면 안된다
    }
}


