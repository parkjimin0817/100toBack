package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.enums.CommonEnums;

import com.bridge.kinder.enums.CommonEnums.BoardType;
import java.util.List;
import java.util.Optional;

public interface BoardRepository {
    Board save(Board board);
    Optional<Board> findById(int boardNo);
    List<Board> findAll();
    void deleteById(int boardNo);
    List<Board> findByType(CommonEnums.BoardType type, int centerNo, int offset, int limit);
    long countByType(CommonEnums.BoardType type, int centerNo);
    List<Board> getRecent3Boards(int centerNo, List<BoardType> types);
    List<Board> findByMemberNoAndType(int memberNo, BoardType type);
    List<Board> findByClassNo(int classNo);
}
