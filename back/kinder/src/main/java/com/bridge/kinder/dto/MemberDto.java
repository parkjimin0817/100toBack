package com.bridge.kinder.dto;

import com.bridge.kinder.dto.ChildDto.modalResponse;
import com.bridge.kinder.dto.ChildDto.updateClass;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
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
                    .center(center)
                    .address(address)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginRequest {
        private String memberId;
        private String memberPwd;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class LoginResponse {
        private int member_no;
        private String member_name;
        private String member_id;
        private CommonEnums.MemberType member_type;
        //만약 멤버정보 필요한거 있으시면 그냥 추가하시면 됩니다.

        private int center_no;
        private int class_no;

        public static LoginResponse toDto(Member member) {
            return LoginResponse.builder()
                    .member_no(member.getMemberNo())
                    .member_name(member.getMemberName())
                    .member_id(member.getMemberId())
                    .member_type(member.getMemberType())
                    .center_no(member.getCenter().getCenterNo())
                    .class_no(member.getClassRoom() != null ? member.getClassRoom().getClassNo() : 0) // (시설장 혹은 반 미배정 교사는 로그인 시 반 번호가 null이기 때문에 임의로 지정)
                    .build();
        }
    }



    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    //멤버 목록 가져오기
    public static class Response {
        private int member_no;
        private String member_name;

        private int center_no;

        public static Response toDto(Member member) {
            return Response.builder()
                    .member_no(member.getMemberNo())
                    .member_name(member.getMemberName())
                    .center_no(member.getCenter().getCenterNo())
                    .build();
        }
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class SearchId{
        private String member_name;
        private LocalDate member_birth;

        private String member_id;

        public static SearchId toDto(Member member) {
            return SearchId.builder()
                    .member_id(member.getMemberId())
                    .build();
        }
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MyPageResponse {
        private String member_name;
        private LocalDate member_birth;
        private CommonEnums.MemberType member_type;
        private String center_name;
        private String center_tel;
        private String center_address;
        private CommonEnums.CenterType center_type;

        public static MyPageResponse toDto(Center center, Member member) {
            return MyPageResponse.builder()
                    .member_name(member.getMemberName())
                    .member_birth(member.getMemberBirth())
                    .member_type(member.getMemberType())
                    .center_name(center.getCenterName())
                    .center_tel(center.getCenterTel())
                    .center_address(center.getCenterAddress())
                    .center_type(center.getCenterType())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class teacherListResponse{
        private int member_no;
        private String member_name;
        private String class_name;

        public static teacherListResponse toDto(Member member) {
            return teacherListResponse.builder()
                    .member_no(member.getMemberNo())
                    .member_name(member.getMemberName())
                    .class_name(member.getClassRoom().getClassName())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class modalResponse {
        private String class_name;
        private String member_name;
        private LocalDateTime create_date;

        public static modalResponse toDto(Member member) {
            return modalResponse.builder()
                    .class_name(member.getClassRoom().getClassName())
                    .member_name(member.getMemberName())
                    .create_date(member.getCreateDate())
                    .build();
        }

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class updateClass {
        private int member_no;
        private String member_name;
        private String class_name;

        public static MemberDto.updateClass toDto(Member member){
            return MemberDto.updateClass.builder()
                    .member_no(member.getMemberNo())
                    .member_name(member.getMemberName())
                    .class_name(member.getClassRoom().getClassName())
                    .build();
        }
    }
}
