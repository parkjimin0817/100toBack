package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "MEMBER")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_NO")
    private int memberNo;

    @Column(name = "MEMBER_NAME", length = 20, nullable = false)
    private String memberName;

    @Column(name = "MEBER_BIRTH")
    private Date memberBirth;

    @Column(name = "MEMBER_ID", length = 30, nullable = false)
    private String memberId;

    @Column(name = "MEMBER_PWD", length = 20, nullable = false)
    private String memberPwd;

    @Column(name = "MEMBER_PHONE", length = 20, nullable = false)
    private String memberPhone;

    @Column(name = "MEMBER_TYPE", length = 10, nullable = false)
    private CommonEnums.MemberType memberType;

    @Column(name = "MEMBER_PROFILE", length = 100)
    private String memberProfile;

    @Column(name = "ADDRESS", length = 254)
    private String address;

    @Column(name = "CREATE_DATE", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "STATUS", nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.AdmissionStatus status;

    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
        if(this.status == null) {
            this.status = CommonEnums.AdmissionStatus.REJECTED;
        }
    }
}
