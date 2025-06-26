package com.bridge.kinder.service;


import com.bridge.kinder.dto.ApprovalDto;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ApprovalService {
    //시설, 시설장 승인 대기 리스트
    List<ApprovalDto.CenterApprovalResponse> findCenterApprovals();
    //시설, 시설장 승인거절 결정
    String updateCenterApprovals(ApprovalDto.CenterApprovalUpdate dto);
    //멤버 승인 대기 리스트
    List<ApprovalDto.MemberApprovalResponse> findMemberApprovals(int centerNo);
    //교사, 학부모 승인거절 결정
    String updateMemberApprovals(ApprovalDto.MemberApprovalUpdate dto);
    //아동 승인거절 결정
    String updateChildApprovals(ApprovalDto.ChildApprovalUpdate dto);

}
