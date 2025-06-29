package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.MemberHealthLog;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class MemberHealthLogDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {
        private BigDecimal temperature;
        private int stress;
        private int sleep;
        private String symptoms;

        private int member_no;

        public MemberHealthLog toEntity(Member member) {
            return MemberHealthLog.builder()
                    .temperature(temperature)
                    .stress(stress)
                    .sleep(sleep)
                    .symptoms(symptoms)
                    .member(member)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ListResponse {
        private int health_log_no;
        private int member_health_log_no;
        private LocalDateTime create_date;
        private String symptoms;

        private String member_name;

        public static ListResponse toDto(MemberHealthLog memberHealthLog) {
            return ListResponse.builder()
                    .health_log_no(memberHealthLog.getMemberHealthLogNo())
                    .member_health_log_no(memberHealthLog.getMemberHealthLogNo())
                    .create_date(memberHealthLog.getCreateDate())
                    .symptoms(memberHealthLog.getSymptoms())
                    .member_name(memberHealthLog.getMember().getMemberName())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DetailResponse {
        private int member_health_log_no;
        private LocalDateTime create_date;
        private BigDecimal temperature;
        private int stress;
        private int sleep;
        private String symptoms;

        private int member_no;
        private String member_name;

        public static DetailResponse toDto(MemberHealthLog memberHealthLog) {
            return DetailResponse.builder()
                    .member_health_log_no(memberHealthLog.getMemberHealthLogNo())
                    .create_date(memberHealthLog.getCreateDate())
                    .temperature(memberHealthLog.getTemperature())
                    .stress(memberHealthLog.getStress())
                    .sleep(memberHealthLog.getSleep())
                    .symptoms(memberHealthLog.getSymptoms())
                    .member_name(memberHealthLog.getMember().getMemberName())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Update {
        private int member_health_log_no;
        private BigDecimal temperature;
        private int stress;
        private int sleep;
        private String symptoms;

        private int member_no;

        public MemberHealthLog toDto() {
            return MemberHealthLog.builder()
                    .memberHealthLogNo(member_health_log_no)
                    .temperature(temperature)
                    .stress(stress)
                    .sleep(sleep)
                    .symptoms(symptoms)
                    .build();

        }
    }
}
