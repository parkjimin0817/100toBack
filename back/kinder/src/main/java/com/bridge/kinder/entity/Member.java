package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "MEMBER")
public class Member {// 멤버
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_NO")
    private int memberNo;
    //멤버 번호

    @Column(name = "MEMBER_NAME", length = 20, nullable = false)
    private String memberName;
    //이름

    @Column(name = "MEBER_BIRTH", nullable = false)
    private Date memberBirth;
    //생년월일

    @Column(name = "MEMBER_ID", length = 30, nullable = false)
    private String memberId;
    //아이디

    @Column(name = "MEMBER_PWD", length = 20, nullable = false)
    private String memberPwd;
    //비밀번호

    @Column(name = "MEMBER_PHONE", length = 20, nullable = false)
    private String memberPhone;
    //전화번호

    @Column(name = "MEMBER_TYPE", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.MemberType memberType;
    //분류(시설장,교사,학부모)

    @Column(name = "MEMBER_PROFILE", length = 100)
    private String memberProfile;
    //프로필 이미지

    @Column(name = "ADDRESS", length = 254)
    private String address;
    //주소

    @Column(name = "CREATE_DATE", nullable = false)
    private LocalDateTime createDate;
    //생성일

    @Column(name = "STATUS", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.AdmissionStatus status;
    //상태(승인, 거절, 대기)


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CENTER_NO")
    private Center center;
    //시설

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLASS_NO")
    private ClassRoom classRoom;
    //반

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    List<Resign> resigns = new ArrayList<>();
    //퇴직

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    List<Approval> approvals = new ArrayList<>();
    //승인, 거부

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    List<Attendance> attendances = new ArrayList<>();
    //근태

    @OneToOne(mappedBy = "member")
    private Leave leave;
    //연차

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    List<Vacation> vacations = new ArrayList<>();
    //휴가, 워케이션

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    List<MemberChild> memberChilds = new ArrayList<>();
    //멤버-아동 중계테이블

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    List<Schedule> schedules = new ArrayList<>();
    //일정

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    List<Board> boards = new ArrayList<>();
    //게시판

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    List<MemberHealthLog> memberHealthLogs = new ArrayList<>();
    //건강 기록


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
        if(this.status == null) {
            this.status = CommonEnums.AdmissionStatus.PENDING;
        }
    }
}
