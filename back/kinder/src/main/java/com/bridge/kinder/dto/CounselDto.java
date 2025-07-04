package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Counsel;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CounselDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateDto {
        private CommonEnums.CounselType counselType;
        private LocalDate counselDate;
        private LocalTime counselStart;
        private LocalTime counselEnd;

        private int centerNo;
        private int memberNo;
        private int childNo;

        public Counsel toEntity(Center center, Member member, Child child) {
            return Counsel.builder()
                    .counselType(counselType)
                    .counselDate(counselDate)
                    .counselStart(counselStart)
                    .counselEnd(counselEnd)
                    .center(center)
                    .member(member)
                    .child(child)
                    .build();
        }
    }
}
