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
    @GetMapping("/lists/{centerNo}")
    public ResponseEntity<List<ApprovalDto.MemberApprovalResponse>> getAllApprovals(@PathVariable int centerNo) {
        List<ApprovalDto.MemberApprovalResponse> response = approvalService.findAllApprovals(centerNo);
        return ResponseEntity.ok(response);
    }

    //시설장,교사,학부모 승인거절 결정
    @PatchMapping("/decision/member")
    public ResponseEntity<String> updateMemberApprovals(@RequestBody ApprovalDto.MemberApprovalUpdate dto) {
        return ResponseEntity.ok(approvalService.updateMemberApprovals(dto));
    }

    //아동 승인거절 결정
    @PatchMapping("/decision/child")
    public ResponseEntity<String> updateChildApprovals(@RequestBody ApprovalDto.ChildApprovalUpdate dto) {
        return ResponseEntity.ok(approvalService.updateChildApprovals(dto));
    }

}
