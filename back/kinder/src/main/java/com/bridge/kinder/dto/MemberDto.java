package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

public class MemberDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {

        private String member_name;
        private Date member_birth;
        private String member_id;
        private String member_pwd;
        private String member_phone;
        private CommonEnums.MemberType member_type;
        private String member_profile;
        private String address;

        public Member toEntity() {
            return Member.builder()
                    .memberName(member_name)
                    .memberBirth(member_birth)
                    .memberId(member_id)
                    .memberPwd(member_pwd)
                    .memberPhone(member_phone)
                    .memberType(member_type)
                    .memberProfile(member_profile)
                    .address(address)
                    .build();
        }
    }
}
