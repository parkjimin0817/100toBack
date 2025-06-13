package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "MEMBER_HEALTH_LOG")
public class MemberHealthLog {// 멤버 건강 기록

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_HEALTH_LOG_NO")
    private int memberHealthLogNo;
    //멤버 건강 기록 번호

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;
    //생성일(기록일)

    @Column(name = "TEMPERATURE", precision = 4, scale = 2)
    private BigDecimal temperature;
    //체온

    @Column(name = "STRESS")
    private int stress;
    //스트레스 지수

    @Column(name = "SLEEP")
    private int sleep;
    //수면시간

    @Column(name = "SYMPTOMS", length = 100)
    private String symptoms;
    //증상
    
    //---------------------------------------------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버

}
