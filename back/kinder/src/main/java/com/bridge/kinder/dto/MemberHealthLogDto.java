package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.MemberHealthLog;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
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
}
