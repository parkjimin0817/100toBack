package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Approval;

import java.util.List;
import java.util.Optional;

public interface ApprovalRepository {

    //시설 승인 대기 리스트
    List<Approval> findCenterApprovals();
    //멤버 승인 대기 리스트
    List<Approval> findMemberApprovals(int centerNo);
    //승인 요청 생성
    void save(Approval approval);
    //승인 요청 검색
    Optional<Approval> findByApprovalNo(int approvalNo);

}
