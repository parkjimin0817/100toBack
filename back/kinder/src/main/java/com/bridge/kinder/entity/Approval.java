package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "APPROVAL")
public class Approval {// 승인, 거부 신텅

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "APPROVAL_NO")
    private int approvalNo;
    //승인요청 번호

    @Column(name = "APPROVAL_REQUEST_DATE", nullable = false)
    private LocalDateTime approvalRequestDate;
    //승인요청일

    @Column(name = "STATUS", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.AdmissionStatus status;
    //승인여부

    @Column(name = "DECISION_DATE")
    private LocalDateTime decisionDate;
    //결정일


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CENTER_NO")
    private Center center;
    //시설

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHILD_NO")
    private Child child;
    //아동


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.approvalRequestDate = LocalDateTime.now();
        if(this.status == null) {
            this.status = CommonEnums.AdmissionStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.decisionDate = LocalDateTime.now();
    }

}
