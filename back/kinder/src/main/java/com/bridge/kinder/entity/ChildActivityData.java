package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CHILD_ACTIVITY_DATA")
public class ChildActivityData {// 아동 생활 정보
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHILD_ACTIVITY_NO")
    private int childActivityNo;
    //아동 생활 정보 번호
    
    @Column(name = "LIKE_FOOD", length = 100)
    private String likeFood;
    //좋아하는 음식

    @Column(name = "DISLIKE_FOOK", length = 100)
    private String dislikeFood;
    //싫어하는 음식

    @Column(name = "MEAL_AMOUNT", length = 100)
    private String mealAmount;
    //평균 식사량

    @Column(name = "MEAL_MEMO", length = 200)
    private String mealMemo;
    //식습관 메모

    @Column(name = "CLOSE_FRIEND")
    private boolean closeFriend;
    //친한 친구

    @Column(name = "LIKE_PLAY")
    private String likePlay;
    //좋아하는 놀이
    
    @Column(name = "FRIEND_MEMO")
    private String friendMemo;
    //교우관계 메모


    //---------------------------------------------------------------------------------------------
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHILD_NO")
    private Child child;
    //아동
}
