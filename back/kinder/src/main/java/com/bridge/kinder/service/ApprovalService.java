package com.bridge.kinder.service;


import com.bridge.kinder.dto.ApprovalDto;

import java.util.List;

public interface ApprovalService {
    //승인 대기 리스트
    List<ApprovalDto.MemberApprovalResponse> findAllApprovals(int centerNo);
    //승인 요청 생성
    String createApproval(ApprovalDto.MemberApprovalCreate dto);
}
