package com.bridge.kinder.service;


import com.bridge.kinder.dto.ApprovalDto;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ApprovalService {
    //승인 대기 리스트
    List<ApprovalDto.MemberApprovalResponse> findAllApprovals(int centerNo);
    //승인, 거절 결정
    String updateMemberApprovals(ApprovalDto.MemberApprovalUpdate dto);

}
