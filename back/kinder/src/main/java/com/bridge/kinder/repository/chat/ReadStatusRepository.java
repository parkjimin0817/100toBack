package com.bridge.kinder.repository.chat;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.chat.ChatRoom;
import com.bridge.kinder.entity.chat.ReadStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadStatusRepository extends JpaRepository<ReadStatus, Long> {
    Long countByChatRoomAndMemberAndIsReadFalse(ChatRoom chatRoom, Member member);
    List<ReadStatus> findByChatRoomAndMemberAndIsReadFalse(ChatRoom chatRoom, Member member);


}
