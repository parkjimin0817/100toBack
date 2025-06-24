package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class ClassRoomDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Create {
        private String class_name;
        private int capacity;
        private MultipartFile class_image;
        private String color;

        private int center_no;
        private int member_no;

        public ClassRoom toEntity(Center center, Member member, String profilePath) {
            return ClassRoom.builder()
                    .className(class_name)
                    .capacity(capacity)
                    .classImage(profilePath)
                    .color(color)
                    .center(center)
                    .build();
        }
    }
}
