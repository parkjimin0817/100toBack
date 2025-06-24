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
    @Builder
    public static class MemberApprovalResponse {
        private int approval_no;
        private LocalDateTime approval_request_date;
        private CommonEnums.AdmissionStatus status;
        private LocalDateTime declined_date;

        private int center_no;
        private int member_no;

        public static MemberApprovalResponse toDto(Approval approval) {
            return MemberApprovalResponse.builder()
                    .approval_no(approval.getApprovalNo())
                    .approval_request_date(approval.getApprovalRequestDate())
                    .status(approval.getStatus())
                    .declined_date(approval.getDecisionDate())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ChildApprovalCreate{

        public Approval toEntity(Center center, Child child) {
            return Approval.builder()
                    .center(center)
                    .child(child)
                    .build();
        }
    }

}
