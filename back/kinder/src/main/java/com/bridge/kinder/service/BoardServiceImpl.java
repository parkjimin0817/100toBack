package com.bridge.kinder.service;

import com.bridge.kinder.dto.BoardContentDto;
import com.bridge.kinder.dto.BoardDto;
import com.bridge.kinder.dto.RecentBoardDto;
import com.bridge.kinder.dto.RecentBoardDto.Response;
import com.bridge.kinder.dto.ScheduleDto.ScheduleSimpleResponse;
import com.bridge.kinder.entity.*;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.BoardContentType;
import com.bridge.kinder.enums.CommonEnums.BoardType;
import com.bridge.kinder.repository.BoardContentRepository;
import com.bridge.kinder.repository.BoardRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ClassRoomRepository;
import com.bridge.kinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final CenterRepository centerRepository;
    private final MemberRepository memberRepository;
    private final ClassRoomRepository classRoomRepository;
    private final BoardContentRepository boardContentRepository;

    private final String UPLOAD_PATH = "C://test_upload/";

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

        // 사진 게시판의 경우, 첨부파일은 썸네일이 되도록 함.
        if(dto.getType() == CommonEnums.BoardType.PHOTO) {
            Optional<BoardContent> firstImageContent = contents.stream()
                    .filter(content -> content.getType() == CommonEnums.BoardContentType.IMG)
                    .findFirst();
            attachmentPath = firstImageContent
                    .map(BoardContent::getContentFile)
                    .orElse(null);
            System.out.println("사진 경로" + attachmentPath);
            board.update(board.getTitle(), board.getType(), attachmentPath);
            System.out.println(board.getAttachment());
        }

        boardRepository.save(board);
        System.out.println("final attachment: " + board.getAttachment());
        return board.getBoardNo();
    }


    @Override
    public BoardDto.Detail getBoard(int boardNo) {
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        board.increaseViewCount(); // 조회수 증가

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
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 게시글입니다."));

        boardRepository.deleteById(board.getBoardNo());
    }

    @Override
    public Page<BoardDto.NoticeBoardDto> getNoticeBoards(CommonEnums.BoardType type, int centerNo, int page, int size) {
        int offset = (page - 1) * size;
        List<Board> boards = boardRepository.findByType(type, centerNo, offset, size);
        List<BoardDto.NoticeBoardDto> result = boards.stream()
                .map(BoardDto.NoticeBoardDto::fromEntity)
                .collect(Collectors.toList());

        long total = boardRepository.countByType(type, centerNo);
        return new PageImpl<>(result, PageRequest.of(page - 1, size), total);
    }

    @Override
    public Page<BoardDto.NoteBoardDto> getNoteBoards(CommonEnums.BoardType type, int centerNo, int page, int size) {
        int offset = (page - 1) * size;
        List<Board> boards = boardRepository.findByType(type, centerNo, offset, size);
        List<BoardDto.NoteBoardDto> result = boards.stream()
                .map(BoardDto.NoteBoardDto::fromEntity)
                .collect(Collectors.toList());

        long total = boardRepository.countByType(type, centerNo);
        return new PageImpl<>(result, PageRequest.of(page - 1, size), total);
    }

    @Override
    public Page<BoardDto.FamilyNoticeDto> getFamilyNoticeBoards(CommonEnums.BoardType type, int centerNo, int page, int size) {
        int offset = (page - 1) * size;
        List<Board> boards = boardRepository.findByType(type, centerNo, offset, size);
        List<BoardDto.FamilyNoticeDto> result = boards.stream()
                .map(BoardDto.FamilyNoticeDto::fromEntity)
                .collect(Collectors.toList());

        long total = boardRepository.countByType(type, centerNo);
        return new PageImpl<>(result, PageRequest.of(page - 1, size), total);
    }
    @Override
    public Page<BoardDto.PhotoBoardDto> getPhotoBoards(CommonEnums.BoardType type, int centerNo, int page, int size) {
        int offset = (page - 1) * size;
        List<Board> boards = boardRepository.findByType(type, centerNo, offset, size);
        List<BoardDto.PhotoBoardDto> result = boards.stream()
                .map(BoardDto.PhotoBoardDto::fromEntity)
                .collect(Collectors.toList());

        long total = boardRepository.countByType(type, centerNo);
        return new PageImpl<>(result, PageRequest.of(page - 1, size), total);
    }
    @Override
    public Page<BoardDto.MealPlanBoardDto> getMealPlanBoards(CommonEnums.BoardType type, int centerNo, int page, int size) {
        int offset = (page - 1) * size;
        List<Board> boards = boardRepository.findByType(type, centerNo, offset, size);
        List<BoardDto.MealPlanBoardDto> result = boards.stream()
                .map(BoardDto.MealPlanBoardDto::fromEntity)
                .collect(Collectors.toList());

        long total = boardRepository.countByType(type, centerNo);
        return new PageImpl<>(result, PageRequest.of(page - 1, size), total);
    }

    @Override
    public int updateBoard(Integer boardNo, BoardDto.Update dto, MultipartFile file, List<MultipartFile> contentFiles) throws IOException {
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 게시글입니다."));

        String attachmentPath = null;
        // 첨부파일 업데이트
        if (file != null && !file.isEmpty()) {
            attachmentPath = UUID.randomUUID() + "_" + file.getOriginalFilename();
            file.transferTo(new File(UPLOAD_PATH + attachmentPath));
        }

        // 기존 컨텐츠 매핑
        Map<Long, BoardContent> existingContentMap = board.getBoardContents().stream()
                .collect(Collectors.toMap(BoardContent::getBoardContentNo, Function.identity()));

        List<BoardContent> updatedContents = new ArrayList<>(); // 수정 후 컨텐츠 리스트
        AtomicInteger order = new AtomicInteger(0);
        AtomicInteger imageIndex = new AtomicInteger(0);

        for (BoardContentDto.Update contentDto : dto.getContents()) {
            BoardContent contentEntity = existingContentMap.get(contentDto.getContentId()); // 수정전 컨텐츠 가져옴
            if (contentEntity != null) { // 기존 컨텐츠인지 판단
                String oldFileName = contentEntity.getContentFile();

                // 이미지인지 판단
                if (contentDto.getType() == CommonEnums.BoardContentType.IMG && contentFiles != null && imageIndex.get() < contentFiles.size()) {
                    // 수정전 파일과 현재 파일 같은지 판단
                    if(!contentDto.getContentFile().equals(contentEntity.getContentFile())) {
                        MultipartFile newFile = contentFiles.get(imageIndex.get());
                        String newFileName = newFile.getOriginalFilename();
                        if (newFile != null && !newFile.isEmpty() &&
                                (oldFileName == null || !oldFileName.endsWith(newFileName))) {
                            // 파일 변경 시
                            String savedPath = UUID.randomUUID() + "_content_" + newFileName;
                            newFile.transferTo(new File(UPLOAD_PATH + savedPath));
                            contentEntity.updateBoardContentImg(savedPath);
                            imageIndex.incrementAndGet();
                        }
                    }
                }

                contentEntity.updateBoardContent(contentDto.getContentText(), order.getAndIncrement());

                updatedContents.add(contentEntity);
            } else {
                // 신규 컨텐츠
                String newFilePath = null;
                if (contentDto.getType() == CommonEnums.BoardContentType.IMG && contentFiles != null && imageIndex.get() < contentFiles.size()) {
                    MultipartFile newFile = contentFiles.get(imageIndex.getAndIncrement());
                    if (newFile != null && !newFile.isEmpty()) {
                        newFilePath = UUID.randomUUID() + "_content_" + newFile.getOriginalFilename();
                        newFile.transferTo(new File(UPLOAD_PATH + newFilePath));
                    }
                }

                BoardContent newContent = BoardContent.builder()
                        .board(board)
                        .type(contentDto.getType())
                        .contentText(contentDto.getContentText())
                        .contentFile(newFilePath)
                        .sortOrder(order.getAndIncrement())
                        .build();
                updatedContents.add(newContent);
            }
        }

        if(dto.getType() == CommonEnums.BoardType.PHOTO) {
            Optional<BoardContent> firstImageContent = updatedContents.stream()
                    .filter(content -> content.getType() == CommonEnums.BoardContentType.IMG)
                    .findFirst();
            attachmentPath = firstImageContent
                    .map(BoardContent::getContentFile)
                    .orElse(null);
            System.out.println(firstImageContent);
            System.out.println("사진 경로" + attachmentPath);
        }

        board.update(dto.getTitle(), dto.getType(), attachmentPath);

        board.getBoardContents().clear();
        board.getBoardContents().addAll(updatedContents);

        System.out.println("final Content Count : " + updatedContents.size());
        board.getBoardContents().forEach(c -> System.out.println("content: " + c.getContentText()));

        boardRepository.save(board);
        return board.getBoardNo();
    }

    //시설 별 최근 3개 게시물
    @Override
    public List<RecentBoardDto.Response> getRecentBoards(int centerNo) {
        Center center = centerRepository.findById(centerNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        List<BoardType> types = List.of(BoardType.NOTICE, BoardType.FAMILY_NOTICE, BoardType.PHOTO, BoardType.MEAL_PLAN);
        List<Board> boards = boardRepository.getRecent3Boards(center.getCenterNo(), types);

        return boards.stream()
                .map(board -> {
                    BoardContent boardContent =
                            boardContentRepository.findFirstByBoard_BoardNoAndTypeOrderBySortOrderAsc(
                                    board.getBoardNo(), BoardContentType.TEXT);
                    String firstTextContent;
                    if( boardContent != null ) {
                        firstTextContent = Jsoup.parse(boardContent.getContentText()).text();
                    } else {
                        firstTextContent = null;
                    }
                    return Response.toDto(board, firstTextContent);

                })
                .toList();
    }
}
