package com.bridge.kinder.service;

import com.bridge.kinder.dto.ApprovalDto;
import com.bridge.kinder.entity.Approval;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.ApprovalRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ChildRepository;
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
    private final ChildRepository childRepository;

    //승인 대기 리스트
    @Transactional(readOnly = true)
    @Override
    public List<ApprovalDto.MemberApprovalResponse> findAllApprovals(int centerNo) {
        return approvalRepository.findAllApprovals(centerNo)
                .stream()
                .map(ApprovalDto.MemberApprovalResponse::toDto)
                .collect(Collectors.toList());
    }

    //시설장, 교사, 학부모 승인거절 결정
    @Override
    public String updateMemberApprovals(ApprovalDto.MemberApprovalUpdate dto) {
        Approval approval = approvalRepository.findByApprovalNo(dto.getApproval_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 승인 요청입니다."));

        Member member = memberRepository.findByParentNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        //멤버 정보 가져와서 status 바꿔줘야함

        approval.changeApprovalStatus(dto.getStatus());
        member.changeMemberStatus(dto.getStatus());

        return dto.toDto(member).toString();
    }

    //아동 승인거절 결정
    @Override
    public String updateChildApprovals(ApprovalDto.ChildApprovalUpdate dto) {
        Approval approval = approvalRepository.findByApprovalNo(dto.getApproval_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 승인 요청입니다."));

        Child child = childRepository.findByChildNo(dto.getChild_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 아동입니다."));

        approval.changeApprovalStatus(dto.getStatus());
        child.changeChildStatus(dto.getStatus());

        return dto.toDto(child).toString();
    }
}
