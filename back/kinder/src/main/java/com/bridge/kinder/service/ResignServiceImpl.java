package com.bridge.kinder.service;

import com.bridge.kinder.dto.ResignDto;
import com.bridge.kinder.entity.Leave;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Resign;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AdmissionStatus;
import com.bridge.kinder.repository.LeaveRepository;
import com.bridge.kinder.repository.MemberRepository;
import com.bridge.kinder.repository.ResignRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ResignServiceImpl implements ResignService {

    private final ResignRepository resignRepository;
    private final MemberRepository memberRepository;
    private final LeaveRepository leaveRepository;

    //퇴사 처리
    @Override
    public String resignMember(ResignDto.updateResign dto) {
        Optional<Resign> optResign = resignRepository.findByCenter_CenterNoAndMember_MemberNo(dto.getCenter_no(), dto.getMember_no());
        if(!optResign.isPresent()) {
            throw new RuntimeException("존재하지 않는 기록입니다.");
        }

        Member member = optResign.get().getMember();
        member.changeMemberStatus(AdmissionStatus.REJECTED);

        Leave leave = leaveRepository.findByMember_MemberNo(dto.getMember_no()).orElseThrow();

        leave.leaveReset(member);

        Resign resign = optResign.get();
        resign.updateStatus(dto.getStatus());

        return String.valueOf(resign.getResignNo());
    }


}
