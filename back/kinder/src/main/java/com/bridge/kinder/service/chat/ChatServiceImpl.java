package com.bridge.kinder.service.chat;

import com.bridge.kinder.auth.JwtTokenProvider;
import com.bridge.kinder.dto.chat.ChatMessageDto;
import com.bridge.kinder.dto.chat.ChatRoomResponse;
import com.bridge.kinder.dto.chat.MyChatResponse;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.chat.ChatMessage;
import com.bridge.kinder.entity.chat.ChatParticipant;
import com.bridge.kinder.entity.chat.ChatRoom;
import com.bridge.kinder.entity.chat.ReadStatus;
import com.bridge.kinder.repository.MemberRepository;
import com.bridge.kinder.repository.chat.ChatMessageRepository;
import com.bridge.kinder.repository.chat.ChatParicipantRepository;
import com.bridge.kinder.repository.chat.ChatRoomRepository;
import com.bridge.kinder.repository.chat.ReadStatusRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatServiceImpl implements ChatService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatParicipantRepository chatParticipantRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ReadStatusRepository readStatusRepository;

    //1:1채팅방 생성 또는 조회
    @Override
    public Long getOrCreatePrivateRoom(int otherMemberNo) {
        //현재 로그인한 사용자와 상대방 사용자 조회
        Member member = memberRepository.findByMemberId(jwtTokenProvider.getMemberIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        Member otherMember = memberRepository.findByMemberNo(otherMemberNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        Optional<ChatRoom> chatRoom = chatParticipantRepository.findExistingPrivateRoom(member.getMemberNo(), otherMember.getMemberNo());
        if (chatRoom.isPresent()) {
            return chatRoom.get().getChatRoomNo();
        }

        ChatRoom newRoom = new ChatRoom().builder()
                .isGroupChat("N")
                .chatRoomName(otherMember.getMemberName() + "님과의 채팅방")
                .build();

        chatRoomRepository.save(newRoom);

        addParticipantToRoom(newRoom, member);
        addParticipantToRoom(newRoom, otherMember);

        return newRoom.getChatRoomNo();

    }

    //채팅방 참여자 추가
    //해당 참여자가 이미 참여중인지 확인 후 참여하지 않은 경우에만 새로운 참여자 추가
    public void addParticipantToRoom(ChatRoom chatRoom, Member member) {
        if(chatParticipantRepository.findByChatRoomAndMember(chatRoom, member).isPresent()) {
            return;
        }

        //새로운 참가자 생성
        ChatParticipant chatParticipant = ChatParticipant.builder()
                .chatRoom(chatRoom)
                .member(member)
                .build();
        chatParticipantRepository.save(chatParticipant);
    }

    //채팅내역 조회
    public List<ChatMessageDto> getChatHistory(Long chatRoomNo) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 채팅방입니다."));

        Member member = memberRepository.findByMemberId(jwtTokenProvider.getMemberIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        boolean isParticipant = chatParticipantRepository.findByChatRoom(chatRoom)
                .stream().anyMatch(cp -> cp.getMember().getMemberNo() == member.getMemberNo());

        if(isParticipant) {
            throw new IllegalArgumentException("본인이 속한 채팅방이 아닙니다.");
        }

        //메세지 조회(시간순정렬)
        List<ChatMessage> chatMessageList = chatMessageRepository.findByChatRoomOrderByCreatedTimeAsc(chatRoom);

        return chatMessageList.stream()
                .map(c -> ChatMessageDto.builder()
                        .message(c.getContent())
                        .senderId(c.getMember().getMemberId())
                        .build())
                .collect(Collectors.toList());
    }

    //채팅 메세지 저장
    public void saveMessage(ChatMessageDto chatMessageDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageDto.getRoomNo())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 채팅방입니다."));

        Member sender = memberRepository.findByMemberId(jwtTokenProvider.getMemberIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .member(sender)
                .content(chatMessageDto.getMessage())
                .build();

        chatMessageRepository.save(chatMessage);

        List<ChatParticipant> participants = chatParticipantRepository.findByChatRoom(chatRoom);
        List<ReadStatus> readStatuses = participants.stream()
                .map(c -> ReadStatus.builder()
                        .chatRoom(chatRoom)
                        .member(c.getMember())
                        .chatMessage(chatMessage)
                        .isRead(c.getMember().equals(sender))
                        .build())
                .toList();


        readStatusRepository.saveAll(readStatuses);
    }

    //그룹채팅방 조회
    public List<ChatRoomResponse> getGroupChatRooms() {
        List<ChatRoom> chatRooms = chatRoomRepository.findByIsGroupChat("Y");
        return chatRooms.stream()
                .map(c -> ChatRoomResponse.builder()
                        .chatRoomNo(c.getChatRoomNo())
                        .chatRoomName(c.getChatRoomName())
                        .build())
                .toList();
    }

    //그룹채팅방 생성
    public Long createGroupChatRoom(String chatRoomName) {
        Member member = memberRepository.findByMemberId(jwtTokenProvider.getMemberIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        ChatRoom chatRoom = ChatRoom.builder()
                .chatRoomName(chatRoomName)
                .isGroupChat("Y")
                .build();
        chatRoomRepository.save(chatRoom);

        ChatParticipant chatParticipant = ChatParticipant.builder()
                .chatRoom(chatRoom)
                .member(member)
                .build();
        chatParticipantRepository.save(chatParticipant);

        return chatRoom.getChatRoomNo();
    }

    //그룹채팅방 참여
    public void addParticipantToGroupChat(Long chatRoomNo) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 채팅방입니다."));

        Member member = memberRepository.findByMemberId(jwtTokenProvider.getMemberIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        if(chatRoom.getIsGroupChat().equals("N")){
            throw new IllegalArgumentException("그룹 채팅이 아닙니다.");
        }

        Optional<ChatParticipant> participant = chatParticipantRepository.findByChatRoomAndMember(chatRoom, member);
        if(!participant.isPresent()) {
            addParticipantToRoom(chatRoom, member);
        }
    }

    //내 채팅방 목록 조회
    public List<MyChatResponse> getMyChatRooms(){
        Member member = memberRepository.findByMemberId(jwtTokenProvider.getMemberIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        List<ChatParticipant> chatParticipants = chatParticipantRepository.findAllByMember(member);

        return chatParticipants.stream()
                .map(c -> {
                    //각 채팅방의 읽지않은 메세지 수 조회
                    Long count = readStatusRepository.countByChatRoomAndMemberAndIsReadFalse(c.getChatRoom(), member);

                    return MyChatResponse.builder()
                            .chatRoomNo(c.getChatRoom().getChatRoomNo())
                            .chatRoomName(c.getChatRoom().getChatRoomName())
                            .isGroupChat(c.getChatRoom().getIsGroupChat())
                            .unReadCount(count)
                            .build();
                })
                .collect(Collectors.toList());
    }

    //메세지 읽음 처리
    public void messageRead(Long chatRoomNo) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 채팅방입니다."));

        Member member = memberRepository.findByMemberId(jwtTokenProvider.getMemberIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        List<ReadStatus> readStatuses = readStatusRepository.findByChatRoomAndMemberAndIsReadFalse(chatRoom, member);
        for(ReadStatus r : readStatuses) {
            r.updateIsRead(true);
        }
    }

    //채팅방 참여자 목록 제외(채팅방 나가기)
    public void leaveGroupChatRoom(Long chatRoomNo) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 채팅방입니다."));

        Member member = memberRepository.findByMemberId(jwtTokenProvider.getMemberIdFromToken())
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 멤버입니다."));

        if(chatRoom.getIsGroupChat().equals("N")){
            throw new IllegalArgumentException("단체 채팅방이 아닙니다.");
        }

        ChatParticipant c = chatParticipantRepository.findByChatRoomAndMember(chatRoom, member)
                .orElseThrow(() -> new EntityNotFoundException("참여자를 찾을 수 없습니다."));
        chatParticipantRepository.delete(c);

        //남은 참여자가 없다면 채팅방 삭제
        List<ChatParticipant> chatParticipants = chatParticipantRepository.findByChatRoom(chatRoom);
        if(chatParticipants.isEmpty()){
            chatRoomRepository.delete(chatRoom);
        }
    }
}
