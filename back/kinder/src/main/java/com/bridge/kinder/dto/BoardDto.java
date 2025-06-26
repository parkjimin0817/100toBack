package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.entity.BoardContent;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class BoardDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        private String title;
        private CommonEnums.BoardType type;
        private String attachment;
        private int centerId;
        private Integer classRoomId;
        private int memberId;
        private List<BoardContentDto.Create> contents;

        public Board toEntity(Center center, Member member, ClassRoom classRoom) {
            return Board.builder()
                    .title(this.title)
                    .type(this.type)
                    .attachment(this.attachment)
                    .center(center)
                    .classRoom(classRoom)
                    .member(member)
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Detail {
        private Integer boardNo;
        private String title;
        private CommonEnums.BoardType type;
        private int views;
        private LocalDateTime createDate;
        private String attachment;
        private Integer centerId;
        private String className;
        private String memberName;
        private List<BoardContentDto.Detail> boardContents;

        public static Detail fromEntity(Board board) {
            return Detail.builder()
                    .boardNo(board.getBoardNo())
                    .title(board.getTitle())
                    .type(board.getType())
                    .views(board.getViews())
                    .createDate(board.getCreateDate())
                    .attachment(board.getAttachment())
                    .centerId(board.getCenter() != null ? board.getCenter().getCenterNo() : null)
                    .className(board.getClassRoom() != null ? board.getClassRoom().getClassName() : null)
                    .memberName(board.getMember() != null ? board.getMember().getMemberName() : null)
                    .boardContents(
                            board.getBoardContents().stream()
                                    .map(BoardContentDto.Detail::fromEntity)
                                    .collect(Collectors.toList())
                    )
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Simple {
        private int boardNo;
        private String title;
        private CommonEnums.BoardType type;
        private int views;
        private LocalDateTime createDate;

        public static Simple fromEntity(Board board) {
            return Simple.builder()
                    .boardNo(board.getBoardNo())
                    .title(board.getTitle())
                    .type(board.getType())
                    .views(board.getViews())
                    .createDate(board.getCreateDate())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class NoticeBoardDto { // 공지사항 dto

        private int boardNo;            // 게시글 번호
        private String title;           // 제목
        private CommonEnums.BoardType type;  // 게시판 타입 (NOTICE)
        private int views;              // 조회수
        private LocalDateTime createDate; // 작성일
        private String writerName;      // 작성자 이름
        private String attachment;      // 첨부파일 경로 또는 이름

        public static NoticeBoardDto fromEntity(Board board) {
            return NoticeBoardDto.builder()
                    .boardNo(board.getBoardNo())
                    .title(board.getTitle())
                    .type(board.getType())
                    .views(board.getViews())
                    .createDate(board.getCreateDate())
                    .writerName(board.getMember() != null ? board.getMember().getMemberName() : null)
                    .attachment(board.getAttachment())
                    .build();
        }
    }
}