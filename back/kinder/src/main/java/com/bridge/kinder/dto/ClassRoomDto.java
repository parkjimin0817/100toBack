package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.ClassRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

public class ClassRoomDto {

    @Getter
    @AllArgsConstructor
    public static class Create {
        private String class_name;
        private int capacity;
        private MultipartFile class_image;
        private String color;

        private int center_no;

        public ClassRoom toEntity(Center center, String profilePath) {
            return ClassRoom.builder()
                    .className(class_name)
                    .capacity(capacity)
                    .classImage(profilePath)
                    .center(center)
                    .build();
        }
    }
}
