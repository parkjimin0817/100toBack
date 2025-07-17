package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Resign;
import com.bridge.kinder.enums.CommonEnums;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ResignDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updateResign {
        private int center_no;
        private int member_no;

        public Resign toDto(Center center, Member member) {
            return Resign.builder()
                    .center(center)
                    .member(member)
                    .build();

        }

    }
}
