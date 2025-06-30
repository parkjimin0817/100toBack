package com.bridge.kinder.service;

import com.bridge.kinder.dto.BoardDto;
import com.bridge.kinder.enums.CommonEnums;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BoardService {
    int createBoard(BoardDto.Create dto, MultipartFile attachment, List<MultipartFile> contentFiles) throws IOException;
    BoardDto.Detail getBoard(int boardNo);
    List<BoardDto.Simple> getAllBoards();
    void deleteBoard(int boardNo);
    Page<BoardDto.Simple> getBoardsByType(CommonEnums.BoardType type, int page, int size);
    Page<BoardDto.NoticeBoardDto> getNoticeBoards(CommonEnums.BoardType type, int page, int size);
    Page<BoardDto.NoteBoardDto> getNoteBoards(CommonEnums.BoardType type, int page, int size);
    Page<BoardDto.FamilyNoticeDto> getFamilyNoticeBoards(CommonEnums.BoardType type, int page, int size);
    Page<BoardDto.PhotoBoardDto> getPhotoBoards(CommonEnums.BoardType type, int page, int size);
    Page<BoardDto.MealPlanBoardDto> getMealPlanBoards(CommonEnums.BoardType type, int page, int size);

    int updateBoard(Integer boardNo, BoardDto.Update dto, MultipartFile file, List<MultipartFile> contentFiles) throws IOException;
}
