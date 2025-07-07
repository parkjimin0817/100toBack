package com.bridge.kinder.controller;

import com.bridge.kinder.dto.file.UploadUrlResponseDto;
import com.bridge.kinder.service.AWSService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/AWS")
public class AWSController {

    private final AWSService awsService;

    @PostMapping("/upload-url")
    public ResponseEntity<UploadUrlResponseDto> getUploadUrl(@RequestParam String file_name,
                                                             @RequestParam String content_type,
                                                             @RequestParam(required = false, defaultValue = "") String path) {

        //확장자 추출
        String extension = "";
        int lastDotIndex = file_name.lastIndexOf('.');
        if (lastDotIndex > 0) {
            extension = file_name.substring(lastDotIndex);
        }

        //경로 + 변경된이름 + 확장자 = 저장할 이름
        String changeName = path + UUID.randomUUID() + extension;
        String presignedUrl = awsService.generatePresignedUploadUrl(changeName, content_type);

        return ResponseEntity.ok(new UploadUrlResponseDto(changeName, presignedUrl));
    }
}
