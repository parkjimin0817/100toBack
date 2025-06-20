package com.bridge.kinder.service;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final CenterRepository centerRepository;

    //시설장(센터) 생성
    @Override
    public String createManager(CreateManagerDto dto) {
        // 1. Center 저장
        Center center = dto.getCenter().toEntity();
        Center savedCenter = centerRepository.save(center);

        // 2. Member 저장
        Member manager = dto.getMember().toEntity(savedCenter);
        memberRepository.save(manager);

        return String.valueOf(manager.getMemberNo());
    }

    //교사 생성
    @Override
    public String createTeacher(MemberDto.CreateMember dto) {
        Center center = centerRepository.findById(dto.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        Member teacher = dto.toEntity(center);
        memberRepository.save(teacher);

        return String.valueOf(teacher.getMemberNo());
    }

    //학부모 생성
    @Override
    public String createParent(MemberDto.CreateMember dto) {
        Center center = centerRepository.findById(dto.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        Member parent = dto.toEntity(center);
        memberRepository.save(parent);

        return String.valueOf(parent.getMemberNo());
    }

    //멤버 조회(임시)
    @Transactional(readOnly = true)
    @Override
    public MemberDto.Response findMEmber(int memberNo) {
        return memberRepository.findById(memberNo)
                .map(MemberDto.Response::toDto)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
    }
}
