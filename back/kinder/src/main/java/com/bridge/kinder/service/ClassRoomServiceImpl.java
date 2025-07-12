package com.bridge.kinder.service;

import com.bridge.kinder.dto.ClassRoomDto;
import com.bridge.kinder.dto.ClassRoomDto.AttendanceRateResponse;
import com.bridge.kinder.dto.ClassRoomDto.HealthLogProgressResponse;
import com.bridge.kinder.dto.ClassRoomDto.Response;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.ChildAttendanceStatus;
import com.bridge.kinder.repository.AttendanceRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ChildRepository;
import com.bridge.kinder.repository.ClassRoomRepository;
import com.bridge.kinder.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ClassRoomServiceImpl implements ClassRoomService {

    private final ClassRoomRepository classRoomRepository;
    private final CenterRepository centerRepository;
    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;
    private final AttendanceRepository attendanceRepository;

    @Override
    public ClassRoomDto.Response createClass(ClassRoomDto.Create classRoomCreate) {
        //센터 조회
        Center center = centerRepository.findById(classRoomCreate.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));
        //교사 조회
        Member teacher = memberRepository.findByMemberNo(classRoomCreate.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 교사입니다."));
        // S3 이미지 경로 그대로 사용 (profilePath)
        String profilePath = classRoomCreate.getClass_image(); // S3 URL or S3 경로

        // 반 생성 및 저장
        ClassRoom classRoom = classRoomCreate.toEntity(center, teacher); // ← profilePath 제거됨
        classRoom.changeClassImage(profilePath); // setter 따로 있어도 OK
        classRoomRepository.save(classRoom);

        // 교사에 반 연결
        teacher.setClassRoom(classRoom);
        memberRepository.save(teacher);

        return ClassRoomDto.Response.toDto(classRoom, teacher, 0);
        }

    @Override
    @Transactional(readOnly = true)
    public List<ClassRoomDto.Response> findClassesByCenterNo(int centerNo) {
        //시설 별 반 목록
        List<ClassRoom> classRooms = classRoomRepository.findByCenterNo(centerNo);


        return classRooms.stream()
                .map(classRoom -> {
                    //교사 조회
                    Optional<Member> teacherOpt = memberRepository.findTeacherByClassNo(classRoom.getClassNo());
                    Member teacher = teacherOpt.orElse(null);
                    //반 별 아동 현재 수
                    int childCount = childRepository.countChildByClassroom(classRoom.getClassNo());

                    return ClassRoomDto.Response.toDto(classRoom, teacher, childCount);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceRateResponse> getAttendanceRate(int centerNo) {
        //오늘 날짜
        LocalDate today = LocalDate.now();

        //반 목록
        List<ClassRoom> classRooms = classRoomRepository.findByCenterNo(centerNo);

        return classRooms.stream()
                .map(classRoom -> {
                    //반별 아동 수
                    int childCount = childRepository.countChildByClassroom(classRoom.getClassNo());
                    //출석 아동 수 -- 오늘 날짜, 반 번호, 출석 상태
                    int presentChildCount = attendanceRepository.countPresentChild(classRoom.getClassNo(), today,
                            ChildAttendanceStatus.PRESENT).map(Long::intValue).orElse(0);
                    //출석률 계산
                    int attendanceRate = childCount == 0 ?
                            0 : (int) (((double)presentChildCount / childCount) * 100);

                    return AttendanceRateResponse.toDto(classRoom, attendanceRate);
                })
                .toList();
    }

    @Override
    public List<HealthLogProgressResponse> getHealthLogProgress(int centerNo) {
        //오늘 날짜
        LocalDateTime today = LocalDate.now().atStartOfDay();

        //반 목록
        List<ClassRoom> classRooms = classRoomRepository.findByCenterNo(centerNo);

        return classRooms.stream()
                .map( classRoom -> {
                    //반 별 아동 수
                    int childCount = childRepository.countChildByClassroom(classRoom.getClassNo());
                    //health-log 오늘 날짜 log 갯수
                    int completed = childRepository.countTodayHealthLog(classRoom.getClassNo(), today).map(Long::intValue).orElse(0);

                    return HealthLogProgressResponse.toDto(classRoom, completed, childCount);
                        })
                .toList();
    }

    @Override
    public ClassRoomDto.Response updateClass(ClassRoomDto.Update dto, int classNo) {
        //교사 조회
        Member teacher = memberRepository.findByMemberNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 교사입니다."));

        ClassRoom classRoom = classRoomRepository.updateClass(dto,classNo)
                .orElseThrow(() -> new EntityNotFoundException("수정에 실패하였습니다."));

        // 교사에 반 연결
        teacher.setClassRoom(classRoom);
        memberRepository.save(teacher);
        int childCount = childRepository.countChildByClassroom(dto.getClass_no());

        return ClassRoomDto.Response.toDto(classRoom, teacher, childCount);
    }

    @Override
    public int deleteClass(int classNo) {
        int no = classRoomRepository.deleteClass(classNo);

        return no;
    }
}


