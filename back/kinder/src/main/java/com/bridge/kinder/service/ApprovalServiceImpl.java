package com.bridge.kinder.service;

import com.bridge.kinder.dto.ApprovalDto;
import com.bridge.kinder.entity.Approval;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.ApprovalRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ApprovalServiceImpl implements ApprovalService {

    private final ApprovalRepository approvalRepository;
    private final CenterRepository centerRepository;
    private final MemberRepository memberRepository;

    //승인 대기 리스트
    @Override
    public List<ApprovalDto.MemberApprovalResponse> findAllApprovals(int centerNo) {
        return approvalRepository.findAllApprovals(centerNo)
                .stream()
                .map(ApprovalDto.MemberApprovalResponse::toDto)
                .collect(Collectors.toList());
    }

    //승인 요청 생성
    @Override
    public String createApproval(ApprovalDto.MemberApprovalCreate dto) {
        Center center = centerRepository.findById(dto.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));
        
        Member member = memberRepository.findById(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        Approval approval = dto.toEntity(center, member);

        approvalRepository.save(approval);

        return String.valueOf(approval.getApprovalNo());
    }
}
