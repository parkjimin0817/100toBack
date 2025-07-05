package com.bridge.kinder.repository;

import com.bridge.kinder.entity.BoardContent;
import com.bridge.kinder.enums.CommonEnums.BoardContentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardContentRepository extends JpaRepository<BoardContent, Long> {
    BoardContent findFirstByBoard_BoardNoAndTypeOrderBySortOrderAsc(int boardNo, BoardContentType type);
}
