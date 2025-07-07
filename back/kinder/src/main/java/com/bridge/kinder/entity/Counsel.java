package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums.CounselStatus;
import com.bridge.kinder.enums.CommonEnums.CounselType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "COUNSEL")
public class Counsel {  //상담

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COUNSEL_NO")
    private int counselNo;
    //상담 번호

    @Column(name = "COUNSEL_TYPE")
    @Enumerated(EnumType.STRING)
    private CounselType counselType;
    //상담 형태

    @Column(name = "COUNSEL_STATS")
    @Enumerated(EnumType.STRING)
    private CounselStatus counselStatus;
    //상담 상태

    @Column(name = "COUNSEL_DATE")
    private LocalDate counselDate;
    //상담 날짜

    @Column(name = "COUNSEL_START")
    private LocalTime counselStart;
    //상담 시작 시간

    @Column(name = "COUNSEL_END")
    private LocalTime counselEnd;
    //상담 종료 시간


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
        if(this.counselStatus == null){
            this.counselStatus = CounselStatus.PENDING;
        }
    }


    //---------------------------------------------------------------------------------------------
    public void changeStatus(CounselStatus newStatus) {
        this.counselStatus = newStatus;
    }

    //---------------------------------------------------------------------------------------------
    public void update( CounselType counselType, CounselStatus counselStatus, LocalDate counselDate,
                       LocalTime counselStart, LocalTime counselEnd) {
        this.counselType = counselType;
        this.counselStatus = counselStatus;
        this.counselDate = counselDate;
        this.counselStart = counselStart;
        this.counselEnd = counselEnd;
    }

}
