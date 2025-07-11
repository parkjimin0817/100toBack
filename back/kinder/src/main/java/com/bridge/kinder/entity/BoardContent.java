package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "BOARD_CONTENT")
public class BoardContent {// 게시판 내용

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_CONTENT_NO")
    private long boardContentNo;
    //게시판 내용 번호

    @Column(name = "TYPE", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.BoardContentType type;
    //내용 타입(TEXT, IMG)

    @Column(name = "CONTENT_TEXT", columnDefinition = "TEXT")
    private String contentText;
    //내용

    @Column(name = "CONTENT_FILE", length = 100)
    private String contentFile;
    //파일 경로

    @Column(name = "CONTENT_FILE_ORIGIN", length = 100)
    private String contentFileOrigin;
    //파일 원본

    @Column(name = "SORT_ORDER", nullable = false)
    private int sortOrder;
    //순서

    @Column(name = "CREATE_DATE", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createDate;
    //생성일

    //---------------------------------------------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "BOARD_NO")
    private Board board;
    //게시판


    //---------------------------------------------------------------------------------------------
    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
    }

    //---------------------------------------------------------------------------------------------

    public void updateBoardContent(String contentText, String contentFile, String contentFileOrigin, int sortOrder) {
        this.contentText = contentText;
        this.contentFile = contentFile;
        this.contentFileOrigin = contentFileOrigin;
        this.sortOrder= sortOrder;
    }

    public void updateBoardContentImg(String contentFile) {
        this.contentFile = contentFile;
    }

}
