package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public class MypageDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Update {
        //member 이름, 생일, 연락처
        private String memberName;
        private LocalDate memberBirth;
        private String memberPhone;
        private String address;
        private String memberProfile;

        //center 시설명, 연락처, 주소, 유형
        private String centerName;
        private String centerTel;
        private String centerAddress;
        private CommonEnums.CenterType centerType;
    }
}
