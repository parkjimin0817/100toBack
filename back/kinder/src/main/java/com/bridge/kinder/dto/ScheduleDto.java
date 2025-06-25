package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ScheduleDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateScheduleDto {
        private String title;
        private String description;
        private LocalTime start_time;
        private LocalTime end_time;
        private CommonEnums.RollType type;

        private int center_no;
        private int class_no;
        private int member_no;

        public Schedule toEntity(Center center, Member member) {
            return Schedule.builder()
                    .title(title)
                    .description(description)
                    .startTime(start_time)
                    .endTime(end_time)
                    .type(type)
                    .center(center)
                    .member(member)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ScheduleResponse {
        private String title;
        private String description;
        private LocalTime start_time;
        private LocalTime end_time;
        private CommonEnums.RollType type;

        private int center_no;
        private int member_no;

        public static ScheduleResponse toDto(Schedule schedule) {
            return ScheduleResponse.builder()
                    .title(schedule.getTitle())
                    .description(schedule.getDescription())
                    .start_time(schedule.getStartTime())
                    .end_time(schedule.getEndTime())
                    .type(schedule.getType())
                    .build();
        }
    }
}
