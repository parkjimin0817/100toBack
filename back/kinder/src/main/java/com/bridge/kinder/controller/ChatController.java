package com.bridge.kinder.controller;

import com.bridge.kinder.dto.chat.ChatRoomResponse;
import com.bridge.kinder.dto.chat.MyChatResponse;
import com.bridge.kinder.service.chat.ChatService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/chat")
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    //1:1채팅방 생성 또는 조회
    @PostMapping("/room/private/create")
    public ResponseEntity<?> getOrCreatePrivateRoom(@RequestParam("other_member_no") int otherMemberNo) {
        return new ResponseEntity<>(chatService.getOrCreatePrivateRoom(otherMemberNo), HttpStatus.OK);
    }

    //특정 채팅방의 이전 메세지 목록 조회
    @GetMapping("history/{chatRoomNo}")
    public ResponseEntity<?> getChatHistory(@PathVariable Long chatRoomNo) {
        return new ResponseEntity<>(chatService.getChatHistory(chatRoomNo), HttpStatus.OK);
    }

    //센터별 그룹채팅목록 조회
    @GetMapping("/room/group/list")
    public ResponseEntity<?> getGroupChatList() {
        return new ResponseEntity<>(chatService.getGroupChatRooms(), HttpStatus.OK);
    }

    //그룹채팅방 개설
    @PostMapping("/room/group/create")
    public ResponseEntity<?> createGroupChat(@RequestParam String chatRoomName) {
        Long chatRoomNo = chatService.createGroupChatRoom(chatRoomName);
        return ResponseEntity.status(HttpStatus.CREATED).body(chatRoomNo);
    }

    //그룹채팅방 참여
    @PostMapping("/room/group/{chatRoomNo}/join")
    public ResponseEntity<?> joinGroup(@PathVariable Long chatRoomNo) {
        chatService.addParticipantToGroupChat(chatRoomNo);
        return ResponseEntity.ok().build();
    }

    //내 채팅방 목록 조회 : roomId, roomName, 그룹채팅여부, 메세지 읽을 개수
    @GetMapping("my/chatRooms")
    public ResponseEntity<?> getMyRooms() {
        List<MyChatResponse> myChatResponses = chatService.getMyChatRooms();
        return new ResponseEntity<>(myChatResponses,HttpStatus.OK);
    }

    //채팅메세지 읽음 처리
    @PostMapping("/room/{chatRoomNo}/read")
    public ResponseEntity<?> readRoom(@PathVariable Long chatRoomNo) {
        chatService.messageRead(chatRoomNo);
        return ResponseEntity.ok().build();
    }

    //채팅방 나가기. 채팅방 남은인원 없을시 삭제
    @DeleteMapping("/room/group/{chatRoomNo}/leave")
    public ResponseEntity<?> leaveGroupChatRoom(@PathVariable Long chatRoomNo) {
        chatService.leaveGroupChatRoom(chatRoomNo);
        return ResponseEntity.ok().build();
    }
}
