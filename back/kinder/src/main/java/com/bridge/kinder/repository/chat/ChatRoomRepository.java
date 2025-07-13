package com.bridge.kinder.repository.chat;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.chat.ChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByIsGroupChat(String isGroupChat);
    List<ChatRoom> findByIsGroupChatAndCenter(String isGroupChat, Center center);
}
