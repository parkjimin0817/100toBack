package com.bridge.kinder.dto;

import com.bridge.kinder.dto.CenterDto.Response;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Leave;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class LeaveDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{

        private int leave_no;
        private int leave_days;
        private int used_leave;
        private int remain_leave;
        private int member_no;

        public static LeaveDto.Response toDto(Leave leave, Member member) {
            return Response.builder()
                    .leave_no(leave.getLeaveNo())
                    .leave_days(leave.getLeaveDays())
                    .used_leave(leave.getUsedLeave())
                    .remain_leave(leave.getRemainLeave())
                    .member_no(member.getMemberNo())
                    .build();
        }
    }
}
