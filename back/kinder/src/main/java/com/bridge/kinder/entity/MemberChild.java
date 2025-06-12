package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "MEMBER_CHILD")
public class MemberChild {// 멤버-아동 중계

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_CHILD_NO")
    private int memberChildNo;
    //중계 번호

    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBEr_NO")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHILD_NO")
    private Child child;
    
}
