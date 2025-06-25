package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberChildDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.dto.MemberDto.modalResponse;
import com.bridge.kinder.dto.MemberDto.teacherListResponse;
import com.bridge.kinder.dto.MemberDto.updateClass;
import com.bridge.kinder.dto.MemberTeacherDto;
import com.bridge.kinder.dto.MypageDto;
import com.bridge.kinder.entity.*;
import com.bridge.kinder.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;
    private final CenterRepository centerRepository;
    private final ApprovalRepository approvalRepository;
    private final MemberChildRepository memberChildRepository;
    private final String UPLOAD_PATH = "C://test_upload/"; //aws S3 연결시 관련 코드 수정할 것.

    //회원가입 시 아이디 중복 체크
    @Override
    public boolean checkIdDuplicate(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    //시설장(센터) 생성
    @Override
    public String createManager(CreateManagerDto dto) throws IOException {
        Center center = dto.getCenter().toEntity();
        Center savedCenter = centerRepository.save(center);

        String originName = null;
        String profilePath = null;

        if(dto.getMember().getMember_profile() != null && !dto.getMember().getMember_profile().isEmpty()) {
            originName = dto.getMember().getMember_profile()
                    .getOriginalFilename();
            profilePath = UUID.randomUUID().toString() + "_manager_" + originName;

            File uploadDir = new File(UPLOAD_PATH);
            if(!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            dto.getMember().getMember_profile().transferTo(new File(UPLOAD_PATH + profilePath));
        }

        Member manager = dto.getMember().toEntity(savedCenter, profilePath);
        memberRepository.save(manager);

        Approval approval = Approval.builder()
                .center(savedCenter)
                .member(manager)
                .build();

        approvalRepository.save(approval);

        return String.valueOf(manager.getMemberNo());
    }

    //교사 생성
    @Override
    public String createTeacher(MemberTeacherDto dto) throws IOException {
        Center center = centerRepository.findById(dto.getMember().getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        String originName = null;
        String profilePath = null;

        if(dto.getMember().getMember_profile() != null && !dto.getMember().getMember_profile().isEmpty()) {
            originName = dto.getMember().getMember_profile()
                    .getOriginalFilename();
            profilePath = UUID.randomUUID().toString() + "_member_" + originName;

            File uploadDir = new File(UPLOAD_PATH);
            if(!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            dto.getMember().getMember_profile().transferTo(new File(UPLOAD_PATH + profilePath));
        }

        Member teacher = dto.getMember().toEntity(center, profilePath);
        memberRepository.save(teacher);

        Approval approval = Approval.builder()
                .center(center)
                .member(teacher)
                .build();

        approvalRepository.save(approval);

        return String.valueOf(teacher.getMemberNo());
    }

    //학부모 생성, 아동 등록
    @Override
    public String createParentChild(MemberChildDto dto) throws IOException {
        Center centerMember = centerRepository.findById(dto.getMember().getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        String originNameMember = null;
        String profilePathMember = null;

        if(dto.getMember().getMember_profile() != null && !dto.getMember().getMember_profile().isEmpty()) {
            originNameMember = dto.getMember()
                    .getMember_profile()
                    .getOriginalFilename();
            profilePathMember = UUID.randomUUID().toString() + "_member_" + originNameMember;

            File uploadDir = new File(UPLOAD_PATH);
            if(!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            dto.getMember().getMember_profile().transferTo(new File(UPLOAD_PATH + profilePathMember));
        }

        Member parent = dto.getMember().toEntity(centerMember, profilePathMember);
        memberRepository.save(parent);

        Approval approvalParent = Approval.builder()
                .center(centerMember)
                .member(parent)
                .build();
        approvalRepository.save(approvalParent);
        // 여기까지 학부모 회원가입

        //여기부터 아동 등록, 조회
        Child child = childRepository.findByResidentNo(dto.getChild().getChild_resident_no()).orElse(null);

        if(child == null) {
            Center centerChild = centerRepository.findById(dto.getChild().getCenter_no())
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

            String originNameChild = null;
            String profilePathChild = null;

            if(dto.getChild().getChild_profile() != null && !dto.getChild().getChild_profile().isEmpty()) {
                originNameChild = dto.getChild()
                        .getChild_profile()
                        .getOriginalFilename();
                profilePathChild = UUID.randomUUID().toString() + "_child_" + originNameChild;

                File uploadDir = new File(UPLOAD_PATH);
                if(!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                dto.getChild().getChild_profile().transferTo(new File(UPLOAD_PATH + profilePathChild));
            }

            child = dto.getChild().toEntity(centerChild, profilePathChild);
            childRepository.save(child);

            Approval approvalChild = Approval.builder()
                    .center(centerChild)
                    .child(child)
                    .build();
            approvalRepository.save(approvalChild);
        }

        MemberChild link = MemberChild.builder()
                .member(parent)
                .child(child)
                .build();
        memberChildRepository.save(link);

        return String.valueOf(parent.getMemberNo());
    }

    //로그인
    @Override
    public MemberDto.LoginResponse getLoginMember(String memberId, String memberPwd) {
        Member member = memberRepository.findByMemberId(memberId).get();

        if(!member.getMemberPwd().equals(memberPwd)) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return MemberDto.LoginResponse.toDto(member);
    }

    //시설 별 교사 목록 찾기
    @Override
    @Transactional(readOnly = true)
    public List<MemberDto.Response> findTeachersByCenterNo(int centerNo) {
        return memberRepository.findTeacherByCenterNo(centerNo).stream()
                .map(MemberDto.Response::toDto)
                .collect(Collectors.toList());
    }

    //멤버 ID 찾기(이름, 생년월일)
    @Override
    public MemberDto.SearchId searchId(MemberDto.SearchId dto) {
        System.out.println(dto.getMember_birth());
        String memberName = dto.getMember_name();
        LocalDate memberBirth = dto.getMember_birth();
        return memberRepository.searchId(memberName, memberBirth)
                .map(MemberDto.SearchId::toDto)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
    }

    @Override
    public MemberDto.MyPageResponse getMyInfo(int memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo).get();

        Center center = member.getCenter();
        return MemberDto.MyPageResponse.toDto(center, member);
    }

    @Override
    public String updateMyPage(int id, MypageDto.Update dto) {
        Member member = memberRepository.myPageUpdate(id, dto).get();
        Center center = centerRepository.myPageUpdate(id, dto).get();
        return "";
    }

    @Override
    public List<MemberDto.teacherListResponse> managerTeacherList(int centerNo) {
        return memberRepository.findByCenterNo(centerNo).stream()
                .map(MemberDto.teacherListResponse::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MemberDto.modalResponse getMember(int member_no) {
        Member member = memberRepository.getByMemberNo(member_no)
                .orElseThrow(() -> new EntityNotFoundException("해당 멤버가 존재하지 않습니다."));
        return MemberDto.modalResponse.toDto(member);
    }

    @Override
    public updateClass updateClass(int member_no, int class_no) {
        Member member = memberRepository.updateClass(member_no,class_no)
                .orElseThrow(() -> new EntityNotFoundException("정상적으로 수정되지 않았습니다."));
        return MemberDto.updateClass.toDto(member);
    }
}
