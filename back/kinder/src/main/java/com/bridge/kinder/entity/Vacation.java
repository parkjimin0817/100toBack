package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AdmissionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "VACATION")
public class Vacation { //휴가, 워케이션

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VACATION_NO")
    private int vacationNo;
    //휴가, 워케이션 번호

    @Column(name = "TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private CommonEnums.VacationType type;
    //종류(휴가, 워케이션)

    @Column(name = "TYPE_DETAIL", length = 30)
    private String typeDetail;
    //종류 상세

    @Column(name = "START_DATE")
    private LocalDate startDate;
    //시작일

    @Column(name = "END_DATE")
    private LocalDate endDate;
    //종료일

    @Column(name = "REASON", columnDefinition = "TEXT")
    private String reason;
    //사유

    @Column(name = "ATTACHMENT", length = 100)
    private String attachment;
    //첨부파일 경로

    @Column(name = "ATTACHMENT_ORIGIN", length = 100)
    private String attachmentOrigin;
    //첨부파일 원본

    @Column(name = "CREATE_DATE", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createDate;
    //생성일

    @Column(name = "STATUS", length = 20)
    @Enumerated(EnumType.STRING)
    private CommonEnums.AdmissionStatus status;
    //상태(승인, 거절, 대기)

    @Column(name = "DECISION_DATE")
    private LocalDateTime decisionDate;
    //결정일


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CENTER_NO")
    private Center center;
    //시설

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LEAVE_NO")
    private Leave leave;
    //연차


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
        if(this.status == null) {
            this.status = CommonEnums.AdmissionStatus.PENDING;
        }
    }

    public void approve() {
        if(this.status != AdmissionStatus.PENDING) throw new IllegalStateException("이미 처리됨");
        this.status = CommonEnums.AdmissionStatus.APPROVED;
        this.decisionDate = LocalDateTime.now();
    }

    public void reject() {
        if(this.status != AdmissionStatus.PENDING) throw new IllegalStateException("이미 처리됨");
        this.status = AdmissionStatus.REJECTED;
        this.decisionDate = LocalDateTime.now();
    }

}
