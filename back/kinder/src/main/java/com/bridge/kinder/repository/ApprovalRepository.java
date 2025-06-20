package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Approval;

import java.util.List;

public interface ApprovalRepository {

    //승인 대기 리스트
    List<Approval> findAllApprovals(int centerNo);
    //승인 요청 생성
    void save(Approval approval);

}
