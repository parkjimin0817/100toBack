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

    //시설 승인 대기 리스트
    @GetMapping("/lists")
    public ResponseEntity<List<ApprovalDto.CenterApprovalResponse>> getCenterApprovals() {
        List<ApprovalDto.CenterApprovalResponse> response = approvalService.findCenterApprovals();
        return ResponseEntity.ok(response);
    }

    //시설장, 시설 승인거절 결정
    @PatchMapping("/decision/center")
    public ResponseEntity<String> updateCenterApprovals(@RequestBody ApprovalDto.CenterApprovalUpdate dto) {
        return ResponseEntity.ok(approvalService.updateCenterApprovals(dto));
    }


    //승인 대기 리스트
    @GetMapping("/lists/{centerNo}")
    public ResponseEntity<List<ApprovalDto.MemberApprovalResponse>> getMemberApprovals(@PathVariable int centerNo) {
        List<ApprovalDto.MemberApprovalResponse> response = approvalService.findMemberApprovals(centerNo);
        return ResponseEntity.ok(response);
    }

    //교사,학부모 승인거절 결정
    @PatchMapping("/decision/member")
    public ResponseEntity<String> updateMemberApprovals(@RequestBody ApprovalDto.MemberApprovalUpdate dto) {
        return ResponseEntity.ok(approvalService.updateMemberApprovals(dto));
    }

    //아동 승인거절 결정
    @PatchMapping("/decision/child")
    public ResponseEntity<String> updateChildApprovals(@RequestBody ApprovalDto.ChildApprovalUpdate dto) {
        return ResponseEntity.ok(approvalService.updateChildApprovals(dto));
    }

    //시설 재가입 요청
    @PatchMapping("/reapproval")
    public ResponseEntity<ApprovalDto.MemberReApproval> reApproval(@RequestBody ApprovalDto.MemberReApproval dto) {
        return ResponseEntity.ok(approvalService.reApproval(dto));
    }
}
