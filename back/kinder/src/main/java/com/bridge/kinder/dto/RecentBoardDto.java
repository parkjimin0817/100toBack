package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.entity.BoardContent;
import com.bridge.kinder.enums.CommonEnums;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class RecentBoardDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{

        private int board_no;
        private int center_no;
        private LocalDateTime create_date;
        private String title;
        private CommonEnums.BoardType type;
        private String content_text; //board_content의 첫번째 text



        public static RecentBoardDto.Response toDto(Board board, String boardContent) {
            return Response.builder()
                    .board_no(board.getBoardNo())
                    .center_no(board.getCenter().getCenterNo())
                    .create_date(board.getCreateDate())
                    .title(board.getTitle())
                    .type(board.getType())
                    .content_text(boardContent != null ? boardContent : "")
                    .build();
        }
    }

}
