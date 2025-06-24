package com.bridge.kinder.service;

import com.bridge.kinder.dto.ClassRoomDto;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ClassRoomRepository;
import com.bridge.kinder.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.relation.RoleUnresolved;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ClassRoomServiceImpl implements ClassRoomService {

    private final ClassRoomRepository classRoomRepository;
    private final CenterRepository centerRepository;
    private final MemberRepository memberRepository;
    private final String UPLOAD_PATH = "C://test_upload/";


    @Override
    public Long createClass(ClassRoomDto.Create classRoomCreate) throws IOException {
        //센터 조회
        Center center = centerRepository.findById(classRoomCreate.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));
        //교사 조회
        Member teacher = memberRepository.findByMemberNo(classRoomCreate.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 교사입니다."));
        //이미지 처리
        String originName = null;
        String profilePath = null;

        if (classRoomCreate.getClass_image() != null && !classRoomCreate.getClass_image().isEmpty()) {
            originName = classRoomCreate.getClass_image()
                    .getOriginalFilename();
            profilePath = UUID.randomUUID().toString() + "_classroom_" + originName;

            File uploadDir = new File(UPLOAD_PATH);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            classRoomCreate.getClass_image().transferTo(new File(UPLOAD_PATH + profilePath));
        }
            //반 생성 및 저장
            ClassRoom classRoom = classRoomCreate.toEntity(center, teacher, profilePath);
            classRoomRepository.save(classRoom);

            //멤버(교사)에 연결
            teacher.setClassRoom(classRoom);
            memberRepository.save(teacher);

            return Long.valueOf(classRoom.getClassNo());
        }
    }


