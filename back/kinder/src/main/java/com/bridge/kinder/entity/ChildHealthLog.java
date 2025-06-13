package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CHILD_HEALTH_LOG")
public class ChildHealthLog {// 아동 건강 기록
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHILD_HEALTH_LOG_NO")
    private int childHealthLogNo;
    //아동 건강 기록 번호

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;
    //기록일

    @Column(name = "TEMPERATURE", precision = 4, scale = 2)
    private BigDecimal temperature;
    //체온

    @Column(name = "HEIGHT", precision = 5, scale = 2)
    private BigDecimal height;
    //신장

    @Column(name = "WEIGHT", precision = 5, scale = 2)
    private BigDecimal weight;
    //체중

    @Column(name = "SYMPTOMS", length = 100)
    private String symptoms;
    //증상
    
    @Column(name = "HEALTH_LOG_MEMO", length = 200)
    private String healthLogMemo;
    //건강 기록 메모
    
    
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
