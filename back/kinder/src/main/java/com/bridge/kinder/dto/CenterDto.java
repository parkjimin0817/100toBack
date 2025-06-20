package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.enums.CommonEnums;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CenterDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {

        private String center_name;
        private String center_address;
        private CommonEnums.CenterType center_type;
        private String center_tel;

        public Center toEntity() {
            return Center.builder()
                    .centerName(center_name)
                    .centerAddress(center_address)
                    .centerType(center_type)
                    .centerTel(center_tel)
                    .build();
        }
    }
}
