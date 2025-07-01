package com.bridge.kinder.service;

import com.bridge.kinder.dto.LeaveDto;
import com.bridge.kinder.entity.Leave;
import com.bridge.kinder.repository.LeaveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class LeaveServiceImpl implements LeaveService{

    private final LeaveRepository leaveRepository;

    @Override
    public LeaveDto.Response getLeaveByMemberNo(int memberNo) {
        Leave leave = leaveRepository.findByMember_MemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("해당 멤버의 연차 정보가 없습니다."));

        return LeaveDto.Response.toDto(leave, leave.getMember());
    }
}
