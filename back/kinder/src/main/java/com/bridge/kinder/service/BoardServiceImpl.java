package com.bridge.kinder.service;

import com.bridge.kinder.dto.BoardContentDto;
import com.bridge.kinder.dto.BoardDto;
import com.bridge.kinder.entity.*;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.repository.BoardRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ClassRoomRepository;
import com.bridge.kinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final CenterRepository centerRepository;
    private final MemberRepository memberRepository;
    private final ClassRoomRepository classRoomRepository;

    private final String UPLOAD_PATH = "C://test_upload/";

//    @Override
//    public int createBoard(BoardDto.Create dto) {
//        // 🟡 필수 값 조회
//        Member member = memberRepository.findByParentNo(dto.getMemberId())
//                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
//
//        Center center = centerRepository.findById(dto.getCenterId())
//                .orElseThrow(() -> new RuntimeException("존재하지 않는 센터입니다."));
//
//        // 🟡 선택 값(classRoom)은 null 허용
//        ClassRoom classRoom = null;
//        if (dto.getClassRoomId() != null) {
//            classRoom = classRoomRepository.findById(dto.getClassRoomId())
//                    .orElseThrow(() -> new RuntimeException("존재하지 않는 반입니다."));
//        }
//
//        // ✅ 파일 업로드 처리
//        MultipartFile file = dto.getFile();
//        if (file != null && !file.isEmpty()) {
//            String originName = file.getOriginalFilename();
//            String savedName = UUID.randomUUID().toString() + "_board_" + originName;
//
//            File uploadDir = new File(UPLOAD_PATH);
//            if (!uploadDir.exists()) uploadDir.mkdirs();
//
//            try {
//                file.transferTo(new File(UPLOAD_PATH + savedName));
//                dto.setAttachment(savedName); // 저장된 경로를 attachment 필드에 주입
//            } catch (IOException e) {
//                throw new RuntimeException("파일 업로드 실패: " + e.getMessage());
//            }
//        }
//
//        // 🟢 Board 엔티티 생성
//        Board board = dto.toEntity(center, member, classRoom);
//
//        // 정렬 순서 카운터
//        AtomicInteger order = new AtomicInteger(0);
//
//        // BoardContent 리스트 생성 및 Board에 추가
//        List<BoardContent> contents = dto.getContents().stream()
//                .map(contentDto -> contentDto.toEntity(board, order.getAndIncrement()))
//                .collect(Collectors.toList());
//
//        board.getBoardContents().addAll(contents);
//
//        // 저장
//        boardRepository.save(board);
//
//        return board.getBoardNo();
//    }
    @Override
    public int createBoard(BoardDto.Create dto, MultipartFile file, List<MultipartFile> contentFiles) throws IOException {
        Member member = memberRepository.findByParentNo(dto.getMemberId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
        Center center = centerRepository.findById(dto.getCenterId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 센터입니다."));
        ClassRoom classRoom = null;
        if (dto.getClassRoomId() != null) {
            classRoom = classRoomRepository.findById(dto.getClassRoomId())
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 반입니다."));
        }

        // 🟡 메인 첨부파일 저장
        String attachmentPath = null;
        if (file != null && !file.isEmpty()) {
            attachmentPath = UUID.randomUUID() + "_" + file.getOriginalFilename();
            file.transferTo(new File(UPLOAD_PATH + attachmentPath));
        }

        // 🟢 Board 엔티티 생성
        dto.setAttachment(attachmentPath);
        Board board = dto.toEntity(center, member, classRoom);

        AtomicInteger order = new AtomicInteger(0);
        AtomicInteger imageIndex = new AtomicInteger(0);

        List<BoardContent> contents = new ArrayList<>();

        for (BoardContentDto.Create contentDto : dto.getContents()) {
            String contentFilePath = null;

            if (contentDto.getType() == CommonEnums.BoardContentType.IMG && contentFiles != null) {
                MultipartFile contentFile = contentFiles.get(imageIndex.getAndIncrement());
                if (contentFile != null && !contentFile.isEmpty()) {
                    String originName = contentFile.getOriginalFilename();
                    contentFilePath = UUID.randomUUID() + "_content_" + originName;
                    contentFile.transferTo(new File(UPLOAD_PATH + contentFilePath));
                }
            }

            contentDto.setContentFile(contentFilePath);
            BoardContent content = contentDto.toEntity(board, order.getAndIncrement());
            contents.add(content);
        }

        board.getBoardContents().addAll(contents);
        boardRepository.save(board);
        return board.getBoardNo();
    }


    @Override
    public BoardDto.Detail getBoard(int boardNo) {
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        return BoardDto.Detail.fromEntity(board);
    }

    @Override
    public List<BoardDto.Simple> getAllBoards() {
        return boardRepository.findAll().stream()
                .map(BoardDto.Simple::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBoard(int boardNo) {
        boardRepository.deleteById(boardNo);
    }

    @Override
    public Page<BoardDto.Simple> getBoardsByType(CommonEnums.BoardType type, int page, int size) {
        int offset = (page - 1) * size;
        List<Board> boards = boardRepository.findByType(type, offset, size);
        List<BoardDto.Simple> result = boards.stream()
                .map(BoardDto.Simple::fromEntity)
                .collect(Collectors.toList());

        long total = boardRepository.countByType(type);
        return new PageImpl<>(result, PageRequest.of(page - 1, size), total);
    }

    @Override
    public Page<BoardDto.NoticeBoardDto> getNoticeBoards(CommonEnums.BoardType type, int page, int size) {
        int offset = (page - 1) * size;
        List<Board> boards = boardRepository.findByType(type, offset, size);
        List<BoardDto.NoticeBoardDto> result = boards.stream()
                .map(BoardDto.NoticeBoardDto::fromEntity)
                .collect(Collectors.toList());

        long total = boardRepository.countByType(type);
        return new PageImpl<>(result, PageRequest.of(page - 1, size), total);
    }
}
