package com.bridge.kinder.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyChatResponse {
    private Long chatRoomNo;
    private String chatRoomName;
    private String isGroupChat;
    private Long unReadCount;
    private String memberProfile;
}
