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
import com.bridge.kinder.entity.*;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.repository.*;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final ApprovalRepository approvalRepository;
    private final ClassRoomRepository classRoomRepository;
    private final String UPLOAD_PATH = "C://test_upload/"; //aws S3 연결시 관련 코드 수정할 것.
    private final AlarmRepository alarmRepository;

    //아동 생성
    @Override
    public String createChild(ChildDto.CreateChild dto) throws IOException {
        Member parent = memberRepository.findByParentNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("부모 회원이 존재하지 않습니다."));

        Center center = centerRepository.findById(dto.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        String profilePath = dto.getChild_profile();

        Child child = dto.toEntity(center, profilePath);
        childRepository.save(child);

        Approval approvalChild = Approval.builder()
                .center(center)
                .child(child)
                .build();
        approvalRepository.save(approvalChild);

        MemberChild link = MemberChild.builder()
                .member(parent)
                .child(child)
                .build();
        memberChildRepository.save(link);

        //시설장에게 알람 저장
        List<Member> managers = memberRepository.findMemberByCenter(center.getCenterNo(), CommonEnums.MemberType.MANAGER);
        for(Member manager : managers) {
            Alarm alarm = Alarm.builder()
                    .member(manager)
                    .content("새로운 아동이 등록되었습니다.")
                    .url("/approvalList")
                    .build();
            alarmRepository.save(alarm);
        }

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
    public Page<ChildDto.healthLog> healthLog(int childNo, Pageable pageable) {
        Child child = childRepository.getByChildNo(childNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 아동이 존재하지 않습니다."));

        Page<ChildHealthLog> page = childRepository.getHealthLogByChildNo(childNo, pageable);

        return page.map(entity -> {
            ChildDto.healthLog dto = ChildDto.healthLog.toDto(entity);
            dto.setChild_name(child.getChildName());
            return dto;
        });
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
    public Page<ChildDto.activityLog> activityLog(int childNo, Pageable pageable) {
        Child child = childRepository.getByChildNo(childNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 아동이 존재하지 않습니다."));

        Page<ChildActivityLog> page = childRepository.getActivityLogByChildNo(childNo, pageable);

        return page.map(entity -> {
            ChildDto.activityLog dto = ChildDto.activityLog.toDto(entity);
            dto.setChild_name(child.getChildName());
            return dto;
        });
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

    @Override
    public ChildDto.infoDetail updateInfoDetail(ChildDto.infoDetail dto) {
        Child child = childRepository.findByChildNo(dto.getChild_no())
                .orElseThrow(() -> new EntityNotFoundException("정상적으로 수정되지 않았습니다."));


        child.changeChildProfile(dto.getChild_profile());
//        child.changeChildFParentsPhone(dto.getF_parent_phone());
//        child.changeChildMParentsPhone(dto.getM_parent_phone());

        return ChildDto.infoDetail.toDto(child);
    }

    //아동 상세보기 건강 데이터 수정
    @Override
    public ChildDto.health updateHealthData(int childNo, ChildDto.health data) {

        ChildHealthData healthData = childRepository.updateHealthData(childNo, data)
                .orElseThrow(() -> new EntityNotFoundException("정상적으로 수정되지 않았습니다."));
        return ChildDto.health.toDto(healthData);
    }

    //아동 상세보기 생활 데이터 수정
    @Override
    public ChildDto.activity updateActivityData(int childNo, ChildDto.activity data){
        ChildActivityData activityData = childRepository.updateActivityData(childNo,data)
                .orElseThrow(() -> new EntityNotFoundException("정상적으로 수정되지 않았습니다."));
        return ChildDto.activity.toDto(activityData);
    }

    @Override
    public List<healthLog> getHealthLog(int classNo, LocalDate date) {
        return childRepository.getHealthLog(classNo,date).stream()
                .map(ChildDto.healthLog::toDto)
                .collect(Collectors.toList());
    }

    //아동 생활 로그 데이터 날짜,반 필터링해서 불러오기
    @Override
    public List<activityLog> getActivityLog(int classNo, LocalDate date) {
        return childRepository.getActivityLog(classNo,date).stream()
                .map(ChildDto.activityLog::toDto)
                .collect(Collectors.toList());
    }

    // 아동 건강 로그 데이터 생성, 업데이트
    @Override
    public healthLog updateHealthLog(int childNo, LocalDate date, ChildDto.healthLog data) {
        ChildHealthLog healthLog = childRepository.updateHealthLog(childNo, date, data)
                .orElseThrow(() -> new EntityNotFoundException("정상적으로 수정되지 않았습니다."));
        return ChildDto.healthLog.toDto(healthLog);
    }

    //아동 생활 로그 데이터 생성, 업데이트
    @Override
    public ChildDto.activityLog updateActivityLog(int childNo, LocalDate date, ChildDto.activityLog data) {
        ChildActivityLog activityLog = childRepository.updateActivityLog(childNo, date, data)
                .orElseThrow(() -> new EntityNotFoundException("정상적으로 수정되지 않았습니다."));
        return ChildDto.activityLog.toDto(activityLog);
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

    //부모 번호로 아동 건강 로그 체크리스트 불러오기
    @Override
    public List<healthLog> healthLogByParent(int memberNo, LocalDate date) {
        return childRepository.healthLogByParent(memberNo,date)
                .stream()
                .map(ChildDto.healthLog::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<activityLog> activityLogByParent(int memberNo, LocalDate date) {
        return childRepository.activityLogByParent(memberNo,date)
                .stream()
                .map(ChildDto.activityLog::toDto)
                .collect(Collectors.toList());
    }

    //학부모 전화번호 조회
    @Override
    public List<ChildDto.ParentPhoneNumberResponse> findByCenterNoPhoneNumber(int centerNo) {
        return childRepository.findByCenterNo(centerNo).stream()
                .map(ChildDto.ParentPhoneNumberResponse::toEntity)
                .collect(Collectors.toList());
    }
}