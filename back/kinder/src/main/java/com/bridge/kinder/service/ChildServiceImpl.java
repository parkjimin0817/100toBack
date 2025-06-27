package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.dto.ChildDto.activity;
import com.bridge.kinder.dto.ChildDto.activityLog;
import com.bridge.kinder.dto.ChildDto.attendance;
import com.bridge.kinder.dto.ChildDto.childListResponse;
import com.bridge.kinder.dto.ChildDto.health;
import com.bridge.kinder.dto.ChildDto.healthLog;
import com.bridge.kinder.dto.ChildDto.modalResponse;
import com.bridge.kinder.dto.ChildDto.updateClass;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildActivityData;
import com.bridge.kinder.entity.ChildHealthData;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.MemberChild;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ChildRepository;
import com.bridge.kinder.repository.MemberChildRepository;
import com.bridge.kinder.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
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

    @Override
    public ChildDto.updateClass updateClass(int child_no, int class_no) {
        Child child = childRepository.updateClass(child_no,class_no)
                .orElseThrow(() -> new EntityNotFoundException("정상적으로 수정되지 않았습니다."));
        return ChildDto.updateClass.toDto(child);
    }

    @Override
    public List<ChildDto.healthLog> healthLog(int childNo) {
        return childRepository.healthLog(childNo).stream()
                .map(ChildDto.healthLog::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public health health(int childNo) {
        ChildHealthData health = childRepository.health(childNo)
                .orElseThrow(() -> new EntityNotFoundException("건강 데이터를 불러오지 못 했습니다."));
        return ChildDto.health.toDto(health);
    }

    @Override
    public List<ChildDto.activityLog> activityLog(int childNo) {
        return childRepository.activityLog(childNo).stream()
                .map(ChildDto.activityLog::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public activity activity(int childNo) {
        ChildActivityData activity = childRepository.activity(childNo)
                .orElseThrow(() -> new EntityNotFoundException("생활 데이터를 불러오지 못 했습니다."));

        return ChildDto.activity.toDto(activity);
    }

    @Override
    public List<ChildDto.attendance> attendance(int childNo) {
        return childRepository.attendance(childNo).stream()
                .map(ChildDto.attendance::toDto)
                .collect(Collectors.toList());
    }
}
