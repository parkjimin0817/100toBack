package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.MemberChild;
import com.bridge.kinder.repository.ChildRepository;
import com.bridge.kinder.repository.MemberChildRepository;
import com.bridge.kinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ChildServiceImpl implements ChildService {

    private final ChildRepository childRepository;
    private final MemberRepository memberRepository;
    private final MemberChildRepository memberChildRepository;

    //아동 생성
    @Override
    public String createChild(ChildDto.CreateChild dto) {
        Member parent = memberRepository.findById(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("부모 회원이 존재하지 않습니다."));

        Child child = dto.toEntity();
        childRepository.save(child);

        MemberChild link = MemberChild.builder()
                .member(parent)
                .child(child)
                .build();
        memberChildRepository.save(link);

        return String.valueOf(child.getChildNo());
    }
}
