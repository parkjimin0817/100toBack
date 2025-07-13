package com.bridge.kinder.dto.sms;

import com.bridge.kinder.entity.AuthNumber;
import com.bridge.kinder.entity.Member;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class SmsDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class PhoneAccess {
        //멤버 아이디
        private String member_id;
        //멤버 이름
        private String member_name;
        //전화번호
        private String member_phone;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class AuthNumberComparison{
        //인증번호
        private String auth_number;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class SignUpAuthResponse{
        //전화번호
        private String member_phone;
    }
}
