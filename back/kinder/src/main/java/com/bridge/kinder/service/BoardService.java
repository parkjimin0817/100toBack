package com.bridge.kinder.service;

import com.bridge.kinder.dto.BoardDto;
import com.bridge.kinder.dto.RecentBoardDto;
import com.bridge.kinder.enums.CommonEnums;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BoardService {
    int createBoard(BoardDto.Create dto);
    BoardDto.Detail getBoard(int boardNo);
    List<BoardDto.Simple> getAllBoards();
    void deleteBoard(int boardNo);
    Page<BoardDto.NoticeBoardDto> getNoticeBoards(CommonEnums.BoardType type, int centerNo, int page, int size);
    Page<BoardDto.NoteBoardDto> getNoteBoards(CommonEnums.BoardType type, int centerNo, int page, int size);
    Page<BoardDto.FamilyNoticeDto> getFamilyNoticeBoards(CommonEnums.BoardType type, int centerNo, int page, int size);
    Page<BoardDto.PhotoBoardDto> getPhotoBoards(CommonEnums.BoardType type, int centerNo, int page, int size);
    Page<BoardDto.MealPlanBoardDto> getMealPlanBoards(CommonEnums.BoardType type, int centerNo, int page, int size);

    int updateBoard(Integer boardNo, BoardDto.Update dto);

    //메인페이지 시설별 최근 3개 게시물
    List<RecentBoardDto.Response> getRecentBoards(int centerNo);
    //개인 서류 업로드
    int createDocument(BoardDto.DocumentRequest request);
    //개인 서류 목록 불러오기
    List<BoardDto.DocumentResponse> getDocuments(String memberId);
    //개인 서류 최근 열람 날짜 업데이트
    void updateViewedDate(int boardNo);
    //개인 서류 최근 열람한 5개
    List<BoardDto.DocumentResponse> getRecentViewedDocument(String memberId);

}
