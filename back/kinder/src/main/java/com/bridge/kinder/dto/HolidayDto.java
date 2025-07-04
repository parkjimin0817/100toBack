package com.bridge.kinder.dto;

import com.bridge.kinder.dto.AttendanceDto.Response;
import com.bridge.kinder.entity.Attendance;
import com.bridge.kinder.entity.Holiday;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class HolidayDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private LocalDate holiday_date;
        private String holiday_name;

        public static HolidayDto.Response toDto(Holiday holiday) {
            return HolidayDto.Response.builder()
                    .holiday_date(holiday.getHolidayDate())
                    .holiday_name(holiday.getHolidayName())
                    .build();
        }
    }


}
