package com.bridge.kinder.entity.chat;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.common.BaseTimeEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
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
@Table(name = "chat_message")
public class ChatMessage extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_message_no")
    private Long chatMessageNo;
    //체팅 메세지 번호

    @Column(name = "content", nullable = false, length = 500)
    private String content;
    //내용


    //---------------------------------------------------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no", nullable = false)
    private Member member;
    //멤버
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_no", nullable = false)
    private ChatRoom chatRoom;
    //채팅방

    @OneToMany(mappedBy = "chatMessage", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @Builder.Default
    private List<ReadStatus> readStatuses = new ArrayList<>();
    //메세지 읽음
}
