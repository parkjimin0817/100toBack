package com.bridge.kinder.service;

import com.bridge.kinder.dto.ResignDto;
import com.bridge.kinder.entity.Leave;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Resign;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AdmissionStatus;
import com.bridge.kinder.enums.CommonEnums.ResignStatus;
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

    //퇴사 처리
    @Override
    public String resignMember(ResignDto.updateResign dto) {

        Member member = memberRepository.findByMemberNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));
        member.changeMemberStatus(AdmissionStatus.REJECTED);

        Resign resign = resignRepository.findByCenter_CenterNoAndMember_MemberNoAndStatus(dto.getCenter_no(), dto.getMember_no(), ResignStatus.WORKING)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 퇴직입니다."));

        resign.updateStatus(ResignStatus.RESIGN);

        return String.valueOf(resign.getResignNo());
    }


}
