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
    //시설번호

    @Column(name = "CENTER_NAME", length = 50, nullable = false, unique = true)
    private String centerName;
    //시설명

    @Column(name = "CENTER_ADDRESS", length = 200, nullable = false)
    private String centerAddress;
    //시설주소

    @Column(name = "CENTER_TYPE", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.CenterType centerType;
    //시설유형

    @Column(name = "CENTER_TEL", length = 40)
    private String centerTel;
    //시설연락처


    //---------------------------------------------------------------------------------------------
    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    List<Resign> resigns = new ArrayList<>();

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    List<Approval> approvals = new ArrayList<>();

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    List<Member> members = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    List<Attendance> attendances = new ArrayList<>();

}
