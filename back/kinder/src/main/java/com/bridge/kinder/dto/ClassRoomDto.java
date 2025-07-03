package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import lombok.*;
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

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    //반 목록
    public static class Response {
        private int class_no;
        private String class_name;
        private int capacity;
        private String color;
        private String class_image;

        private String member_name;
        private int child_count;

        public static Response toDto(ClassRoom classRoom, Member teacher, int childCount) {
            return Response.builder()
                    .class_no(classRoom.getClassNo())
                    .class_name(classRoom.getClassName())
                    .capacity(classRoom.getCapacity())
                    .color(classRoom.getColor())
                    .class_image(classRoom.getClassImage())
                    .member_name(teacher != null ? teacher.getMemberName() : "미지정")
                    .child_count(childCount)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    //반 출석률 응답
    public static class AttendanceRateResponse {
        private int class_no;
        private String class_name;
        private int attendance_rate;
        private String class_image;

        public static AttendanceRateResponse toDto(ClassRoom classRoom, int attendanceRate) {
            return AttendanceRateResponse.builder()
                    .class_no(classRoom.getClassNo())
                    .class_name(classRoom.getClassName())
                    .attendance_rate(attendanceRate)
                    .class_image(classRoom.getClassImage())
                    .build();
        }
    }
}
