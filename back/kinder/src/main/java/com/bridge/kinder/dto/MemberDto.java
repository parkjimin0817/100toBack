package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class MemberDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateManager {

        private String member_name;
        private LocalDate member_birth;
        private String member_id;
        private String member_pwd;
        private String member_phone;
        private CommonEnums.MemberType member_type;
        private String member_profile;
        private String address;

        public Member toEntity(Center center) {
            return Member.builder()
                    .memberName(member_name)
                    .memberBirth(member_birth)
                    .memberId(member_id)
                    .memberPwd(member_pwd)
                    .memberPhone(member_phone)
                    .memberType(member_type)
                    .memberProfile(member_profile)
                    .address(address)
                    .center(center)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateMember {
        private String member_name;
        private LocalDate member_birth;
        private String member_id;
        private String member_pwd;
        private String member_phone;
        private CommonEnums.MemberType member_type;
        private MultipartFile member_profile;
        private String address;

        private int center_no;

        public Member toEntity(Center center, String profilePath) {
            return Member.builder()
                    .memberName(member_name)
                    .memberBirth(member_birth)
                    .memberId(member_id)
                    .memberPwd(member_pwd)
                    .memberPhone(member_phone)
                    .memberType(member_type)
                    .memberProfile(profilePath)
                    .address(address)
                    .center(center)
                    .build();
        }
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private int member_no;
        private String member_name;
        private LocalDate member_birth;
        private String member_id;
        private String member_pwd;
        private String member_phone;
        private CommonEnums.MemberType member_type;
        private String member_profile;
        private String address;
        private LocalDateTime created_date;
        private CommonEnums.AdmissionStatus status;

        private int center_no;
        private int class_no;

        public static Response toDto(Member member) {
            return Response.builder()
                    .member_no(member.getMemberNo())
                    .member_name(member.getMemberName())
                    .member_birth(member.getMemberBirth())
                    .member_id(member.getMemberId())
                    .member_pwd(member.getMemberPwd())
                    .member_phone(member.getMemberPhone())
                    .member_type(member.getMemberType())
                    .member_profile(member.getMemberProfile())
                    .address(member.getAddress())
                    .created_date(member.getCreateDate())
                    .status(member.getStatus())
//                    .center_no(member.getCenter().getCenterNo())
//                    .center_no(member.getClassRoom().getClassNo())
                    .build();
        }



    }
}
