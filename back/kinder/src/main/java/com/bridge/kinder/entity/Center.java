package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CENTER")
public class Center {// 시설
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CENTER_NO")
    private int centerNo;
    //시설 번호

    @Column(name = "CENTER_NAME", length = 50, nullable = false, unique = true)
    private String centerName;
    //시설명

    @Column(name = "CENTER_ADDRESS", length = 200, nullable = false)
    private String centerAddress;
    //시설 주소

    @Column(name = "CENTER_TYPE", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.CenterType centerType;
    //시설 유형

    @Column(name = "CENTER_TEL", length = 20)
    private String centerTel;
    //시설 연락처


    //---------------------------------------------------------------------------------------------
    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    @Builder.Default
    List<Resign> resigns = new ArrayList<>();
    //퇴직

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    @Builder.Default
    List<Approval> approvals = new ArrayList<>();
    //승인, 거부

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    @Builder.Default
    List<Member> members = new ArrayList<>();
    //멤버

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    @Builder.Default
    List<Attendance> attendances = new ArrayList<>();
    //근태

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    @Builder.Default
    List<Schedule> schedules = new ArrayList<>();
    //일정

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    @Builder.Default
    List<Board> boards = new ArrayList<>();
    //게시판

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    @Builder.Default
    List<ClassRoom> classRooms = new ArrayList<>();
    //반



}
