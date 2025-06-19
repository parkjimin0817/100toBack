package com.bridge.kinder.service;

import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public String createMember(MemberDto.Create createDto) {
        Member member = createDto.toEntity();
        memberRepository.save(member);
        return member.getMemberId();
    }

    @Transactional(readOnly = true)
    @Override
    public MemberDto.Response findMEmber(int memberNo) {
        return memberRepository.findOne(memberNo)
                .map(MemberDto.Response::toDto)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
    }
}
