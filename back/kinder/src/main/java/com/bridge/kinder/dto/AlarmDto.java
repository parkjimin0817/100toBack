package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Alarm;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.enums.CommonEnums;
import lombok.*;

import java.time.LocalDateTime;

public class AlarmDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{

        private Long alarm_no;
        private String content;
        private String url;
        private Boolean is_read;
        private LocalDateTime created_at;

        public static AlarmDto.Response toDto(Alarm alarm) {
            return Response.builder()
                    .alarm_no(alarm.getAlarmNo())
                    .content(alarm.getContent())
                    .url(alarm.getUrl())
                    .is_read(alarm.getIsRead())
                    .created_at(alarm.getCreatedAt())
                    .build();
        }
    }

}
