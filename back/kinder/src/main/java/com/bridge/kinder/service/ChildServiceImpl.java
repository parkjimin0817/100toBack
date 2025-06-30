package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.dto.ChildDto.activity;
import com.bridge.kinder.dto.ChildDto.activityLog;
import com.bridge.kinder.dto.ChildDto.attendance;
import com.bridge.kinder.dto.ChildDto.childListResponse;
import com.bridge.kinder.dto.ChildDto.detail;
import com.bridge.kinder.dto.ChildDto.health;
import com.bridge.kinder.dto.ChildDto.healthLog;
import com.bridge.kinder.dto.ChildDto.modalResponse;
import com.bridge.kinder.dto.ChildDto.myPageChilds;
import com.bridge.kinder.dto.ChildDto.updateClass;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildActivityData;
import com.bridge.kinder.entity.ChildActivityLog;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.ChildHealthData;
import com.bridge.kinder.entity.ChildHealthLog;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.MemberChild;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ChildRepository;
import com.bridge.kinder.repository.MemberChildRepository;
import com.bridge.kinder.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ChildServiceImpl implements ChildService {

    private final ChildRepository childRepository;
    private final MemberRepository memberRepository;
    private final MemberChildRepository memberChildRepository;
    private final CenterRepository centerRepository;
    private final String UPLOAD_PATH = "C://test_upload/"; //aws S3 연결시 관련 코드 수정할 것.

    //아동 생성
    @Override
    public String createChild(ChildDto.CreateChild dto) throws IOException {
        Member parent = memberRepository.findByParentNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("부모 회원이 존재하지 않습니다."));

        Center center = centerRepository.findById(dto.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        String originName = null;
        String profilePath = null;

        if (dto.getChild_profile() != null && !dto.getChild_profile().isEmpty()) {
            originName = dto
                    .getChild_profile()
                    .getOriginalFilename();
            profilePath = UUID.randomUUID().toString() + "_child_" + originName;

            File uploadDir = new File(UPLOAD_PATH);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            dto.getChild_profile().transferTo(new File(UPLOAD_PATH + profilePath));
        }

        Child child = dto.toEntity(center, profilePath);
        childRepository.save(child);

        MemberChild link = MemberChild.builder()
                .member(parent)
                .child(child)
                .build();
        memberChildRepository.save(link);

        return String.valueOf(child.getChildNo());
    }

    //학부모 회원가입 후 마이페이지 아동 연결
    @Override
    public String linkChild(ChildDto.LinkChildRequest dto) throws IOException {
        Member parent = memberRepository.findByParentNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("부모 회원이 존재하지 않습니다."));

        Child child = childRepository.findByResidentNo(dto.getChild_resident_no())
                .orElseThrow(() -> new RuntimeException("아동이 존재하지 않습니다."));

        MemberChild link = MemberChild.builder()
                .member(parent)
                .child(child)
                .build();
        memberChildRepository.save(link);


        return String.valueOf(child.getChildNo());
    }

    //반으로 아동목록 불러오기
    @Override
    public List<ChildDto.Response> findChildrenByClassNo(int classNo) {
        return childRepository.findByClassNo(classNo).stream()
                .map(ChildDto.Response::toDto)
                .collect(Collectors.toList());
    }

    //시설장 아동목록 불러오기(해당 시설의 모든 아동)
    @Override
    public List<ChildDto.childListResponse> managerChildList(int centerNo) {
        return childRepository.findByCenterNo(centerNo).stream()
                .map(ChildDto.childListResponse::toDto)
                .collect(Collectors.toList());
    }

    //아동 번호로 아동 찾아오기
    @Override
    public ChildDto.modalResponse getChild(int child_no) {
        Child child = childRepository.getByChildNo(child_no)
                .orElseThrow(() -> new EntityNotFoundException("해당 아동이 존재하지 않습니다."));
        return ChildDto.modalResponse.toDto(child);
    }

    //아동번호와 반 번호로 반 수정(시설장)
    @Override
    public ChildDto.updateClass updateClass(int child_no, int class_no) {
        Child child = childRepository.updateClass(child_no,class_no)
                .orElseThrow(() -> new EntityNotFoundException("정상적으로 수정되지 않았습니다."));
        return ChildDto.updateClass.toDto(child);
    }


    //아동 번호로 해당 아동의 건강 로그 데이터 리스트 불러오기(매일 기록하는거)
    @Override
    public List<ChildDto.healthLog> healthLog(int childNo) {
        Child child = childRepository.getByChildNo(childNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 아동이 존재하지 않습니다."));
        return childRepository.healthLog(childNo).stream()
                .map(ChildDto.healthLog::toDto)
                .peek(dto -> dto.setChild_name(child.getChildName())) //아동 이름도 보내주기
                .collect(Collectors.toList());
    }

    //아동 번호로 해당 아동의 건강 데이터 불러오기(복약정보,예방접종,알레르기)
    @Override
    public health health(int childNo) {
        Optional<ChildHealthData> optional = childRepository.health(childNo);

        // null이면 빈 DTO로 대체하거나 null 반환
        return optional.map(ChildDto.health::toDto)
                .orElse(ChildDto.health.builder().build()); // 빈 객체로 대체
    }

    //아동 번호로 해당 아동의 행동 로그 데이터 불러오기(매일 적는 거)
    @Override
    public List<ChildDto.activityLog> activityLog(int childNo) {
        Child child = childRepository.getByChildNo(childNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 아동이 존재하지 않습니다."));
        return childRepository.activityLog(childNo).stream()
                .map(ChildDto.activityLog::toDto)
                .peek(dto -> dto.setChild_name(child.getChildName())) //아동 이름도 보내주기
                .collect(Collectors.toList());
    }

    //아동 번호로 해당 아동의 생활 데이터 불러오기
    @Override
    public ChildDto.activity activity(int childNo) {
        return childRepository.activity(childNo)
                .map(ChildDto.activity::toDto)
                .orElse(ChildDto.activity.toDto(null)); // 내부에서 null 처리
    }

    //아동 번호로 해당 아동의 출석 내역 리스트 불러오기
    @Override
    public List<ChildDto.attendance> attendance(int childNo) {
        return childRepository.attendance(childNo).stream()
                .map(ChildDto.attendance::toDto)
                .collect(Collectors.toList());
    }

    //아동 상세보기에 필요한 모든 것들 가져오기
    @Override
    public detail detail(int childNo) {
        List<ChildHealthLog> healthLogEntities = childRepository.healthLog(childNo);
        ChildHealthData healthEntity = childRepository.health(childNo).orElse(null); // 예외 안 던짐

        List<ChildActivityLog> activityLogEntities = childRepository.activityLog(childNo);
        ChildActivityData activityEntity = childRepository.activity(childNo).orElse(null); // 예외 안 던짐

        List<ChildAttendance> attendanceEntities = childRepository.attendance(childNo);

        Child child = childRepository.getByChildNo(childNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 아동이 존재하지 않습니다."));

        ChildHealthLog physicalInfo = childRepository.recentPhysicalInfo(childNo).orElse(null); // 예외 안 던짐

        int parentNo = memberChildRepository.findByChildNo(childNo);

        Member member = memberRepository.findByMemberNo(parentNo).orElse(null); // 예외 안 던짐

        return ChildDto.detail.toDto(
                healthLogEntities,
                healthEntity,
                activityLogEntities,
                activityEntity,
                attendanceEntities,
                child,
                physicalInfo,
                member
        );
    }

    //부모 번호로 해당 연결된 아동 리스트 가져오기
    @Transactional(readOnly = true)
    @Override
    public List<myPageChilds> myPageChilds(int memberNo) {

        return childRepository.findByMemberNo(memberNo)
                .stream()
                .map(ChildDto.myPageChilds::toDto)
                .collect(Collectors.toList());
    }
}
