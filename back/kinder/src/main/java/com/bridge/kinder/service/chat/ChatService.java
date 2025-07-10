package com.bridge.kinder.service.chat;

import com.bridge.kinder.dto.chat.ChatMessageDto;
import com.bridge.kinder.dto.chat.ChatRoomResponse;
import com.bridge.kinder.dto.chat.MyChatResponse;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.chat.ChatRoom;
import java.util.List;

public interface ChatService {

    //1:1채팅방 생성 또는 조회
    Long getOrCreatePrivateRoom(int otherMemberNo);
    //채팅방 참여자 추가
    void addParticipantToRoom(ChatRoom chatRoom, Member member);
    //채팅내역 조회
    List<ChatMessageDto> getChatHistory(Long chatRoomNo);
    //채팅 메세지 저장
    void saveMessage(ChatMessageDto chatMessageDto);
    //그룹채팅방 조회
    List<ChatRoomResponse> getGroupChatRooms();
    //그룹채팅방 생성
    Long createGroupChatRoom(String chatRoomName);
    //그룹채팅방 참여
    void addParticipantToGroupChat(Long chatRoomNo);
    //내 채팅방 목록 조회
    List<MyChatResponse> getMyChatRooms();
    //메세지 읽음 처리
    void messageRead(Long chatRoomNo);
    //채팅방 참여자 목록 제외(채팅방 나가기)
    void leaveGroupChatRoom(Long chatRoomNo);

}
