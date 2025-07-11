package com.bridge.kinder.service;

import com.bridge.kinder.dto.BoardContentDto;
import com.bridge.kinder.dto.BoardDto;
import com.bridge.kinder.dto.BoardDto.DocumentResponse;
import com.bridge.kinder.dto.RecentBoardDto;
import com.bridge.kinder.dto.RecentBoardDto.Response;
import com.bridge.kinder.dto.ScheduleDto.ScheduleSimpleResponse;
import com.bridge.kinder.entity.*;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.BoardContentType;
import com.bridge.kinder.enums.CommonEnums.BoardType;
import com.bridge.kinder.repository.*;
import jakarta.persistence.EntityNotFoundException;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final AlarmRepository alarmRepository;

//    @Override
//    public int createBoard(BoardDto.Create dto) throws IOException {
//        Member member = memberRepository.findByParentNo(dto.getMemberId())
//                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
//        Center center = centerRepository.findById(dto.getCenterId())
//                .orElseThrow(() -> new RuntimeException("존재하지 않는 센터입니다."));
//        ClassRoom classRoom = null;
//        if (dto.getClassRoomId() != null) {
//            classRoom = classRoomRepository.findById(dto.getClassRoomId())
//                    .orElseThrow(() -> new RuntimeException("존재하지 않는 반입니다."));
//        }
//
//        Board board = dto.toEntity(center, member, classRoom);
//
//        AtomicInteger order = new AtomicInteger(0);
//
//        List<BoardContent> contents = new ArrayList<>();
//
//        for (BoardContentDto.Create contentDto : dto.getContents()) {
//            BoardContent content = contentDto.toEntity(board, order.getAndIncrement());
//            contents.add(content);
//        }
//
//        board.getBoardContents().addAll(contents);
//
//        boardRepository.save(board);
//        return board.getBoardNo();
//    }
    @Override
    public int createBoard(BoardDto.Create dto) {
        Member member = memberRepository.findByParentNo(dto.getMemberId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
        Center center = centerRepository.findById(dto.getCenterId())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 센터입니다."));
        ClassRoom classRoom = null;
        if (dto.getClassRoomId() != null) {
            classRoom = classRoomRepository.findById(dto.getClassRoomId())
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 반입니다."));
        }

        // 1. 게시글 타입이 PHOTO, MEAL_PLAN일 경우에만
        if (dto.getType() == CommonEnums.BoardType.PHOTO || dto.getType() == CommonEnums.BoardType.MEAL_PLAN) {
            // 2. IMG 타입인 첫 번째 콘텐츠 찾기
            BoardContentDto.Create firstImageContent = dto.getContents().stream()
                    .filter(c -> c.getType() == CommonEnums.BoardContentType.IMG)
                    .findFirst()
                    .orElse(null);

            // 3. 찾은 경우 attachment 정보 세팅
            if (firstImageContent != null) {
                dto.setAttachment(firstImageContent.getContentFile());
                dto.setAttachmentOriginal(firstImageContent.getContentFileOriginal());
            }
        }

        // 4. Board 생성
        Board board = dto.toEntity(center, member, classRoom);

        // 5. BoardContent 생성
        AtomicInteger order = new AtomicInteger(0);
        List<BoardContent> contents = new ArrayList<>();

        for (BoardContentDto.Create contentDto : dto.getContents()) {
            BoardContent content = contentDto.toEntity(board, order.getAndIncrement());
            contents.add(content);
        }

        board.getBoardContents().addAll(contents);

        boardRepository.save(board);

        //학부모에게 가정통신문, 알림장 알림 생성
        if(board.getType() == BoardType.FAMILY_NOTICE || board.getType() == BoardType.NOTE) {
            List<Member> parents = memberRepository.findMemberByCenter(center.getCenterNo(), CommonEnums.MemberType.PARENT);

            List<Alarm> alarms = parents.stream().map(parent -> Alarm.builder()
                    .member(parent)
                    .content("새로운 " + (board.getType() == BoardType.FAMILY_NOTICE ? "가정통신문이 " : "알림장이 ") + "올라왔습니다.")
                    .url(board.getType() == BoardType.FAMILY_NOTICE ? "/family_notice/list" : "/note/list")
                    .build()).toList();

            alarmRepository.saveAll(alarms);
        }

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
    public int updateBoard(Integer boardNo, BoardDto.Update dto) {
        // 1. 기존 게시글 조회
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 게시글입니다."));

        // 2. 기존 컨텐츠 매핑
        Map<Long, BoardContent> existingContentMap = board.getBoardContents().stream()
                .collect(Collectors.toMap(BoardContent::getBoardContentNo, Function.identity()));

        List<BoardContent> updatedContents = new ArrayList<>();
        AtomicInteger order = new AtomicInteger(0);

        for (BoardContentDto.Update contentDto : dto.getContents()) {
            BoardContent contentEntity = existingContentMap.get(contentDto.getContentId());

            if (contentEntity != null) {
                // 기존 콘텐츠 업데이트
                contentEntity.updateBoardContent(
                        contentDto.getContentText(),
                        contentDto.getContentFile(),
                        contentDto.getContentFileOriginal(),
                        order.getAndIncrement()
                );
                updatedContents.add(contentEntity);
            } else {
                // 새 콘텐츠 추가
                BoardContent newContent = BoardContent.builder()
                        .board(board)
                        .type(contentDto.getType())
                        .contentText(contentDto.getContentText())
                        .contentFile(contentDto.getContentFile())
                        .contentFileOrigin(contentDto.getContentFileOriginal())
                        .sortOrder(order.getAndIncrement())
                        .build();

                updatedContents.add(newContent);
            }
        }

        // 3. PHOTO 타입 게시글인 경우, 대표 이미지 설정
        String attachmentPath = dto.getAttachment();
        String attachmentOriginal = dto.getAttachmentOriginal();

        if (dto.getType() == CommonEnums.BoardType.PHOTO || dto.getType() == CommonEnums.BoardType.MEAL_PLAN) {
            Optional<BoardContentDto.Update> firstImageContent = dto.getContents().stream()
                    .filter(c -> c.getType() == CommonEnums.BoardContentType.IMG)
                    .findFirst();

            attachmentPath = firstImageContent.map(BoardContentDto.Update::getContentFile).orElse(null);
            attachmentOriginal = firstImageContent.map(BoardContentDto.Update::getContentFileOriginal).orElse(null);
        }

        // 4. 게시글 업데이트
        board.update(dto.getTitle(), dto.getType(), attachmentPath, attachmentOriginal);

        // 5. 콘텐츠 교체
        board.getBoardContents().clear();
        board.getBoardContents().addAll(updatedContents);

        boardRepository.save(board);
        return board.getBoardNo();
    }


    //시설 별 최근 3개 게시물
    @Override
    public List<RecentBoardDto.Response> getRecentBoards(int centerNo) {
        Center center = centerRepository.findById(centerNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        List<BoardType> types = List.of(BoardType.NOTICE);
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

    @Override
    public int createDocument(BoardDto.DocumentRequest request) {

        Member member = memberRepository.findByMemberNo(request.getMemberNo())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        Board board = Board.builder()
                .title(request.getTitle())
                .type(BoardType.PRIVATE_DOC)
                .attachment(request.getFileUrl())
                .member(member)
                .viewedDate(LocalDateTime.now())
                .build();

        boardRepository.save(board);

        return board.getBoardNo();
    }

    @Override
    public List<DocumentResponse> getDocuments(String memberId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        List<Board> documents = boardRepository
                .findByMemberNoAndType(member.getMemberNo(), BoardType.PRIVATE_DOC);

        return documents.stream()
                .map(DocumentResponse::toDto)
                .toList();

    }

    @Override
    public void updateViewedDate(int boardNo) {
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 게시물을 찾을 수 없습니다."));

        board.setViewedDate();
    }

    @Override
    public List<DocumentResponse> getRecentViewedDocument(String memberId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        List<Board> recentDocuments = boardRepository
                .findByMemberNoAndTypeOrderByViewedDate(member.getMemberNo(), BoardType.PRIVATE_DOC);

        return recentDocuments.stream()
                .map(DocumentResponse::toDto)
                .toList();
    }
}
