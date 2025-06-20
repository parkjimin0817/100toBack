package com.bridge.kinder.service;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.entity.Approval;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.ApprovalRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final CenterRepository centerRepository;
    private final ApprovalRepository approvalRepository;
    private final String UPLOAD_PATH = "C://test_upload/";

    //회원가입 시 아이디 중복 체크
    @Override
    public boolean checkIdDuplicate(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    //시설장(센터) 생성
    @Override
    public String createManager(CreateManagerDto dto) {
        Center center = dto.getCenter().toEntity();
        Center savedCenter = centerRepository.save(center);

        Member manager = dto.getMember().toEntity(savedCenter);
        memberRepository.save(manager);

        Approval approval = Approval.builder()
                .center(center)
                .member(manager)
                .build();

        approvalRepository.save(approval);

        return String.valueOf(manager.getMemberNo());
    }

    //교사/학부모 생성
    @Override
    public String createMember(MemberDto.CreateMember dto) throws IOException {
        Center center = centerRepository.findById(dto.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        String originName = null;
        String profilePath = null;

        if(dto.getMember_profile() != null && !dto.getMember_profile().isEmpty()) {
            originName = dto.getMember_profile()
                    .getOriginalFilename();
            profilePath = UUID.randomUUID().toString() + "_member_" + originName;

            System.out.println(profilePath);

            File uploadDir = new File(UPLOAD_PATH);
            if(!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            dto.getMember_profile().transferTo(new File(UPLOAD_PATH + profilePath));
        }

        Member teacher = dto.toEntity(center, profilePath);
        memberRepository.save(teacher);

        Approval approval = Approval.builder()
                .center(center)
                .member(teacher)
                .build();

        approvalRepository.save(approval);

        return String.valueOf(teacher.getMemberNo());
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
