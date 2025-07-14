package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
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
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "AUTH_NUMBER")
public class AuthNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUTH_NO")
    private int authNo;
    //인증번호 생성번호

    @Column(name = "AUTH_NUMBER", nullable = false, unique = true)
    private String authNumber;
    //인증번호

    @Column(name = "CREATE_TIME")
    private LocalDateTime createTime;
    //생성날짜

    @Column(name = "AUTH_STATUS")
    @Enumerated(EnumType.STRING)
    private CommonEnums.AuthStatus authStatus;
    //인증번호 상태(승인, 거부)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUTH_MEMBER")
    private Member member;
    //멤버

    //---------------------------------------------------------------------------------------------
    public void updateAuthStatus(CommonEnums.AuthStatus authStatus) {
        this.authStatus = authStatus;
    }


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        if(this.authStatus == null) {
            this.authStatus = CommonEnums.AuthStatus.REFUSAL;
        }
        this.createTime = LocalDateTime.now();
    }
}
