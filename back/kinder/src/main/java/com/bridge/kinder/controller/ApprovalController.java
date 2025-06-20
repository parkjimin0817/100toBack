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
    @GetMapping("/{centerNo}/members")
    public ResponseEntity<List<ApprovalDto.MemberApprovalResponse>> getAllApprovals(@PathVariable int centerNo) {
        return ResponseEntity.ok(approvalService.findAllApprovals(centerNo));
    }

    //승인 요청 생성(현재 교사 회원가입시 자동 요청 생성은 되어있음)
    @PostMapping
    public ResponseEntity<String> createApproval(@RequestBody ApprovalDto.MemberApprovalCreate dto) {
        String approvalNo = approvalService.createApproval(dto);
         return ResponseEntity.ok(approvalNo);
    }
}
