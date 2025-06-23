package com.bridge.kinder.service;

import com.bridge.kinder.dto.ClassRoomDto;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ClassRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ClassRoomServiceImpl implements ClassRoomService {

    private final ClassRoomRepository classRoomRepository;
    private final CenterRepository centerRepository;
    private final String UPLOAD_PATH = "C://test_upload/";


    @Override
    public Long createClass(ClassRoomDto.Create classRoomCreate) throws IOException {
        Center center = centerRepository.findById(classRoomCreate.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));
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
            ClassRoom classRoom = classRoomCreate.toEntity(center, profilePath);
            classRoomRepository.save(classRoom);

            return Long.valueOf(classRoom.getClassNo());
        }
    }


