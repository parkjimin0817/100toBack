package com.bridge.kinder.controller;

import com.bridge.kinder.dto.BoardDto;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.bridge.kinder.enums.CommonEnums.BoardType.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    /**
     * 게시글 생성
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Integer> createBoard(
            @RequestPart("data") BoardDto.Create dto,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(required = false) List<MultipartFile> contentFiles  // contentFiles
    ) throws IOException {
        int boardNo = boardService.createBoard(dto, file, contentFiles);
        return ResponseEntity.ok(boardNo);
    }

    /**
     * 게시글 상세 조회
     */
    @GetMapping("/{boardNo}")
    public ResponseEntity<BoardDto.Detail> getBoard(@PathVariable Integer boardNo) {
        BoardDto.Detail board = boardService.getBoard(boardNo);
        return ResponseEntity.ok(board);
    }

    /**
     * 게시글 수정
     */
    @PutMapping("/{boardNo}")
    public ResponseEntity<?> updateBoard(
            @PathVariable Integer boardNo,
            @RequestPart("data") BoardDto.Update dto,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(required = false) List<MultipartFile> contentFiles  // contentFiles
    ) throws IOException {
        boardService.updateBoard(boardNo, dto, file, contentFiles);
        return ResponseEntity.ok().build();
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/{boardNo}")
    public ResponseEntity<Void> deleteBoard(@PathVariable int boardNo) {
        boardService.deleteBoard(boardNo);
        return ResponseEntity.noContent().build();
    }

    /**
     * 공지사항 게시글 목록 조회
     */
    @GetMapping("/type/NOTICE")
    public ResponseEntity<Page<BoardDto.NoticeBoardDto>> getNoticeBoards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<BoardDto.NoticeBoardDto> boardPage = boardService.getNoticeBoards(NOTICE, page, size);
        return ResponseEntity.ok(boardPage);
    }
    /**
     * 가정통신문 게시글 목록 조회
     */
    @GetMapping("/type/FAMILY_NOTICE")
    public ResponseEntity<Page<BoardDto.FamilyNoticeDto>> getFamilyNoticeBoards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<BoardDto.FamilyNoticeDto> boardPage = boardService.getFamilyNoticeBoards(FAMILY_NOTICE, page, size);
        return ResponseEntity.ok(boardPage);
    }
    /**
     *  알림장 목록 조회
     */
    @GetMapping("/type/NOTE")
    public ResponseEntity<Page<BoardDto.NoteBoardDto>> getNoteBoards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<BoardDto.NoteBoardDto> boardPage = boardService.getNoteBoards(NOTE, page, size);
        return ResponseEntity.ok(boardPage);
    }
    /**
     *  사진 게시글 목록 조회
     */
    @GetMapping("/type/PHOTO")
    public ResponseEntity<Page<BoardDto.PhotoBoardDto>> getPhotoBoards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<BoardDto.PhotoBoardDto> boardPage = boardService.getPhotoBoards(PHOTO, page, size);
        return ResponseEntity.ok(boardPage);
    }
    /**
     *  식단표 게시글 목록 조회
     */
    @GetMapping("/type/MEAL_PLAN")
    public ResponseEntity<Page<BoardDto.MealPlanBoardDto>> getMealPlanBoards(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<BoardDto.MealPlanBoardDto> boardPage = boardService.getMealPlanBoards(MEAL_PLAN, page, size);
        return ResponseEntity.ok(boardPage);
    }
}
