package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ApprovalDto;
import com.bridge.kinder.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/approval")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService approvalService;

    //승인 대기 리스트
    @GetMapping("/lists")
    public ResponseEntity<List<ApprovalDto.MemberApprovalResponse>> getAllApprovals(@PathVariable int centerNo) {
        return ResponseEntity.ok(approvalService.findAllApprovals(centerNo));
    }

    //승인, 거절 결정
    @PatchMapping("/decision")
    public ResponseEntity<String> updateApprovals(@RequestBody ApprovalDto.MemberApprovalUpdate dto) {
        return ResponseEntity.ok(approvalService.updateMemberApprovals(dto));
    }
}
