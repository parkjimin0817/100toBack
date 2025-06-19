package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CHILD")
public class Child {// 아동

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHILD_NO")
    private int childNo;
    //아동 번호

    @Column(name = "CHILD_NAME", length = 20, nullable = false)
    private String childName;
    //아동 이름

    @Column(name = "CHILD_RESIDENT_NO", length = 15, nullable = false)
    private String childResidentNo;
    //아동 주민번호

    @Column(name = "F_PARENTS_NAME", length = 20)
    private String fParentsName;
    //부 이름(Father)

    @Column(name = "F_PARENTS_PHONE", length = 20)
    private String fParentsPhone;
    //부 전화번호

    @Column(name = "M_PARENTS_NAME", length = 20)
    private String mParentsName;
    //모 이름(Mother)

    @Column(name = "M_PARENTS_PHONE", length = 20)
    private String mParentsPhone;
    //모 전화번호

    @Column(name = "CHILD_PROFILE", length = 100)
    private String childProfile;
    //아동 프로필 이미지

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;
    //생성일

    @Column(name = "STATUS", nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.AdmissionStatus status;
    //상태(승인, 거절, 대기)


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLASS_NO")
    private ClassRoom classRoom;
    //반

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    @Builder.Default
    List<Approval> approvals = new ArrayList<>();
    //승인, 거부

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    @Builder.Default
    List<MemberChild> memberChilds = new ArrayList<>();
    //멤버-아동 중계테이블

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    @Builder.Default
    List<ChildAttendance> childAttendances = new ArrayList<>();
    //출석

    @OneToOne(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    private ChildHealthData childHealthData;
    //아동 건강 정보

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ChildHealthLog> childHealthLogs = new ArrayList<>();
    //아동 건강 기록

    @OneToOne(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    private ChildActivityData childActivityData;
    //아동 생활 정보

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ChildActivityLog> childActivityLogs = new ArrayList<>();
    //아동 생활 기록


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
        if(status == null){
            this.status = CommonEnums.AdmissionStatus.PENDING;
        }
    }

}
