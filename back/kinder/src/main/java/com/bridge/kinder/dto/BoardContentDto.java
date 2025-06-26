package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.entity.BoardContent;
import com.bridge.kinder.enums.CommonEnums;
import lombok.*;

import java.time.LocalDateTime;

public class BoardContentDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        private CommonEnums.BoardContentType type;
        private String contentText;
        private String contentFile;
        private String contentFileKey;

        public BoardContent toEntity(Board board, int sortOrder) {
            return BoardContent.builder()
                    .type(this.type)
                    .contentText(this.contentText)
                    .contentFile(this.contentFile)
                    .sortOrder(sortOrder)
                    .board(board)
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Detail {
        private long boardContentNo;
        private CommonEnums.BoardContentType type;
        private String contentText;
        private String contentFile;
        private int sortOrder;
        private LocalDateTime createDate;

        public static Detail fromEntity(BoardContent content) {
            return Detail.builder()
                    .boardContentNo(content.getBoardContentNo())
                    .type(content.getType())
                    .contentText(content.getContentText())
                    .contentFile(content.getContentFile())
                    .sortOrder(content.getSortOrder())
                    .createDate(content.getCreateDate())
                    .build();
        }
    }
}
