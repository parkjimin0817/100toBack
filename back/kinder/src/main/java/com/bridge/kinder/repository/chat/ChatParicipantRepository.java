package com.bridge.kinder.repository.chat;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.chat.ChatParticipant;
import com.bridge.kinder.entity.chat.ChatRoom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatParicipantRepository extends JpaRepository<ChatParticipant, Long> {
    Optional<ChatParticipant> findByChatRoomAndMember(ChatRoom chatRoom, Member member);

    List<ChatParticipant> findByChatRoom(ChatRoom chatRoom);
    List<ChatParticipant> findAllByMember(Member member);

    //두 사용자가 함께 참여하고 있는 1:1 채팅방
    @Query("""
        SELECT cp1.chatRoom
        FROM ChatParticipant cp1
        WHERE cp1.chatRoom.isGroupChat = 'N'
        AND cp1.chatRoom.chatRoomNo IN (
            SELECT cp2.chatRoom.chatRoomNo
            FROM ChatParticipant cp2
            WHERE cp2.member.memberNo = :myNo OR cp2.member.memberNo = :otherNo
            GROUP BY cp2.chatRoom.chatRoomNo
            HAVING COUNT(DISTINCT cp2.member.memberNo) = 2
        )
    """)
    Optional<ChatRoom> findExistingPrivateRoom(
            @Param("myNo") int myNo,
            @Param("otherNo") int otherNo
    );
    Optional<ChatRoom> findExistingPrivateRoom(int myNo, int otherNo);


    @Query("""
        SELECT cp FROM ChatParticipant cp
        JOIN cp.chatRoom cr
        WHERE cp.member = :member
        ORDER BY (
            SELECT MAX(cm.createdTime) FROM ChatMessage cm
            WHERE cm.chatRoom = cr
        ) DESC
    """)
    List<ChatParticipant> findChatParticipantsOrderByLatestMessage( Member member);
}
