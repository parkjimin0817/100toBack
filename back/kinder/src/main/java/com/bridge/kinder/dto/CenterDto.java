package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.enums.CommonEnums;
import lombok.*;

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

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{

        private int center_no;
        private String center_name;
        private CommonEnums.AdmissionStatus status;

        public static Response toDto(Center center) {
            return Response.builder()
                    .center_no(center.getCenterNo())
                    .center_name(center.getCenterName())
                    .status(center.getStatus())
                    .build();
        }



    }

}
