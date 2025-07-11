package com.bridge.kinder.entity.chat;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.common.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Table(name = "read_status")
public class ReadStatus extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "read_status_no")
    private Long readStatusNo;
    //메세지 읽음 번호

    @Column(name = "is_read", nullable = false)
    private boolean isRead;
    //읽음 여부


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_no", nullable = false)
    private ChatRoom chatRoom;
    //채팅방

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no", nullable = false)
    private Member member;
    //멤버

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_message_no", nullable = false)
    private ChatMessage chatMessage;
    //채팅 메세지 번호


    //---------------------------------------------------------------------------------------------
    public void updateIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
}
