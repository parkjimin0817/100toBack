package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CHILD_HEALTH_DATA")
public class ChildHealthData {// 건강정보
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HEALTH_DATA_NO")
    private int healthDataNo;
    //아동 건강 정보 번호

    @Column(name = "MEDICATION_NAME", length = 100)
    private String medicationName;
    //약이름

    @Column(name = "MEDICATION_AMOUNT", length = 100)
    private String medicationAmount;
    //복용용량

    @Column(name = "MEDICATION_TIME", length = 100)
    private String medicationTime;
    //복용시간

    @Column(name = "MEDICATION_PERIOD", length = 100)
    private String medicationPeriod;
    //복용기간

    @Column(name = "MEDICATION_PURPOSE", length = 100)
    private String medicationPurpose;
    //복용목적

    @Column(name = "MEDICATION_MEMO", length = 200)
    private String medicationMemo;
    //복용메모

    @Column(name = "VACCINATION", columnDefinition = "TEXT")
    private String vaccination;
    //예방접종

    @Column(name = "ALLERGY", length = 100)
    private String allergy;
    //알레르기

    @Column(name = "ALLERGY_REACTION", length = 100)
    private String allergyReaction;
    //알레르기 반응

    @Column(name = "ALLERGY_SEVERITY", length = 100)
    private String allergySeverity;
    //알레르기 심각도

    @Column(name = "ALLERGY_MEMO", length = 200)
    private String allergyMemo;
    //알레르기 메모


    //---------------------------------------------------------------------------------------------
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHILD_NO")
    private Child child;
    //아동
}
