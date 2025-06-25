package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Approval;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

public class ApprovalDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberApprovalUpdate{
        private int approval_no;
        private CommonEnums.AdmissionStatus status;

        int member_no;

        public Approval toDto(Member member) {
            return Approval.builder()
                    .approvalNo(approval_no)
                    .status(status)
                    .member(member)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChildApprovalUpdate{
        private int approval_no;
        private CommonEnums.AdmissionStatus status;

        int child_no;

        public Approval toDto(Child child) {
            return Approval.builder()
                    .approvalNo(approval_no)
                    .status(status)
                    .child(child)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MemberApprovalResponse {
        private int approval_no;
        private LocalDateTime approval_request_date;
        private CommonEnums.AdmissionStatus status;
        private LocalDateTime declined_date;

        private int center_no;
        private String center_name;
        private CommonEnums.CenterType center_type;
        private String center_tel;

        //시설장, 교사, 학부모
        private int member_no;
        private CommonEnums.MemberType member_type;
        private String member_name;
        private String member_phone;

        //아동
        private int child_no;
        private String child_name;


        public static MemberApprovalResponse toDto(Approval approval) {
            String memberName = null;
            String memberPhone = null;
            CommonEnums.MemberType memberType = null;
            int memberNo = 0;

            int childNo = 0;
            String childName = null;

            if (approval.getMember() != null) {
                memberNo = approval.getMember().getMemberNo();
                memberType = approval.getMember().getMemberType();
                memberName = approval.getMember().getMemberName();
                memberPhone = approval.getMember().getMemberPhone();
            } else if (approval.getChild() != null && !approval.getChild().getMemberChilds().isEmpty()) {
                Member firstMember = approval.getChild().getMemberChilds().iterator().next().getMember();
                memberNo = firstMember.getMemberNo();
                memberType = firstMember.getMemberType();
                memberName = firstMember.getMemberName();
                memberPhone = firstMember.getMemberPhone();
            }

            if (approval.getChild() != null) {
                childNo = approval.getChild().getChildNo();
                childName = approval.getChild().getChildName();
            }

            return MemberApprovalResponse.builder()
                    .approval_no(approval.getApprovalNo())
                    .approval_request_date(approval.getApprovalRequestDate())
                    .status(approval.getStatus())
                    .declined_date(approval.getDecisionDate())
                    .center_no(approval.getCenter().getCenterNo())
                    .center_name(approval.getCenter().getCenterName())
                    .center_type(approval.getCenter().getCenterType())
                    .center_tel(approval.getCenter().getCenterTel())
                    .member_no(memberNo)
                    .member_type(memberType)
                    .member_name(memberName)
                    .member_phone(memberPhone)
                    .child_no(childNo)
                    .child_name(childName)
                    .build();
        }

    }

}
