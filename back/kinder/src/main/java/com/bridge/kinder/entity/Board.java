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
@Table(name = "BOARD")
public class Board {// 게시판

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_NO")
    private int boardNo;
    //게시판 번호

    @Column(name = "TITLE", length = 50)
    private String title;
    //제목

    @Column(name = "TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private CommonEnums.BoardType type;
    //분류

    @Column(name = "VIEWS")
    private int views;
    //조회수

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;
    //생성일

    @Column(name = "ATTACHMENT")
    private String attachment;
    //첨부파일


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLASS_NO")
    private ClassRoom classRoom;
    //반

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_NO")
    private Member member;
    //멤버

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    @Builder.Default
    List<BoardContent> boardContents = new ArrayList<>();
    //게시판 내용


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
        this.views = 0;
    }

}
