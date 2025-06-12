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

    @Column(name = "END_TIME")
    private LocalDate endDate;
    //종료일

    @Column(name = "STATUS", length = 20)
    @Enumerated(EnumType.STRING)
    private CommonEnums.AdmissionStatus status;
    //상태(승인, 거절, 대기)

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;


    //---------------------------------------------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버

    @ManyToOne
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

}
