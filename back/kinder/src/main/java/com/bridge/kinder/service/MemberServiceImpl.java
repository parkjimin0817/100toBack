package com.bridge.kinder.service;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberChildDto;
import com.bridge.kinder.dto.MemberDto;
import com.bridge.kinder.dto.MemberDto.PhoneAccess;
import com.bridge.kinder.dto.MemberDto.PwdUpdate;
import com.bridge.kinder.dto.MemberDto.DetailMemberDto;
import com.bridge.kinder.dto.MemberTeacherDto;
import com.bridge.kinder.dto.MypageDto;
import com.bridge.kinder.entity.*;
import com.bridge.kinder.repository.*;
import com.bridge.kinder.util.SmsUtil;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
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

    private final SmsUtil smsUtil;
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

    //시설 별 교사 목록 찾기 (for selectbar)
    @Override
    @Transactional(readOnly = true)
    public List<MemberDto.SimpleDto> findTeachersByCenterNo(int centerNo) {
        return memberRepository.findTeacherByCenterNo(centerNo).stream()
                .map(MemberDto.SimpleDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public List<MemberDto.DetailMemberDto> findDetailedTeachersByCenterNo(int centerNo) {
        return memberRepository.findTeacherByCenterNo(centerNo).stream()
                .map(MemberDto.DetailMemberDto::from)
                .collect(Collectors.toList());
    }

    //멤버 ID 찾기(이름, 생년월일)
    @Override
    public MemberDto.SearchId searchId(MemberDto.SearchId dto) {
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
    public MemberDto.SearchPwd pwdSearchId(MemberDto.SearchPwd dto) {
        String memberId = dto.getMember_id();
        return memberRepository.pwdSearchId(memberId)
                .map(MemberDto.SearchPwd::toDto)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));
    }

    @Override
    public MemberDto.PhoneAccess sendingNumberToFindId(MemberDto.PhoneAccess dto) {
        Optional<Member> optionalMember = memberRepository.findByPhone(dto.getPhone_number());
        if (optionalMember.isPresent()) {
            String certificationNumber = String.format("%06d", (int) (Math.random() * 1000000));
            SingleMessageSentResponse response = smsUtil.sendOne(optionalMember.get().getMemberPhone(), certificationNumber);

            if (response != null && response.getStatusCode().equals("2000")) {
                return MemberDto.PhoneAccess.toDto(certificationNumber, "인증번호 전송에 성공하였습니다.");
            }else{
                return MemberDto.PhoneAccess.toDto(null, "인증번호 전송에 실패하였습니다.");
            }
        }else{
            return MemberDto.PhoneAccess.toDto(null, "가입되지 않은 번호입니다.");
        }
    }

    @Override
    public MemberDto.PwdUpdate updatePwd(MemberDto.PwdUpdate dto) {
        Member member = memberRepository.findByMemberId(dto.getMember_id())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        if(member == null){
            return MemberDto.PwdUpdate.toDto("존재하지 않는 회원입니다.");
        }else {
            //멤버의 비밀번호를 변경
            member.changeMemberPwd(dto.getMember_pwd());
            return MemberDto.PwdUpdate.toDto("비밀번호를 성공적으로 변경하였습니다.");
        }
    }
}
