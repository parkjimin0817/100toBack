package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "Resign")
public class Resign {// 퇴직

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RESIGN_NO")
    private int resignNo;
    //퇴직 번호

    @Column(name = "ENROLL_DATE")
    private LocalDateTime enrollDate;
    //입사일

    @Column(name = "RESIGN_DATE")
    private LocalDateTime resignDate;
    //퇴사일

    @Column(name = "STATUS", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.ResignStatus status;
    //퇴사 여부


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
        this.enrollDate = LocalDateTime.now();
        this.resignDate = LocalDateTime.now();
        if(this.status == null) {
            this.status = CommonEnums.ResignStatus.WORKING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.resignDate = LocalDateTime.now();
    }
}
