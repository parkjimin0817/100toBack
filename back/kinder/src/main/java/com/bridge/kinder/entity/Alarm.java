package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ALARM")
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ALARM_NO")
    private Long alarmNo;
    //알람 번호

    @Column(name = "CONTENT", nullable = false)
    private String content;
    //알람 내용

    @Column(name = "URL")
    private String url;
    //이동 url

    @Column(name = "IS_READ", nullable = false)
    private Boolean isRead;
    //읽음 여부

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;
    //생성일

    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO", nullable = false)
    private Member member;
    //멤버

    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
    }
}
