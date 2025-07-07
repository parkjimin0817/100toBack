package com.bridge.kinder.controller.file;

import com.bridge.kinder.dto.file.PresignedDto;
import com.bridge.kinder.dto.file.UploadUrlResponseDto;
import com.bridge.kinder.service.file.FileService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/file")
@RestController
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/presigned-url")
    public ResponseEntity<UploadUrlResponseDto> getUploadUrl(@RequestBody PresignedDto dto) {

        //확장자 추출
        String extension = "";
        int lastDotIndex = dto.getFileName().lastIndexOf('.');
        if (lastDotIndex > 0) {
            extension = dto.getFileName().substring(lastDotIndex);
        }

        //경로 + 변경된이름 + 확장자 = 저장할 이름
        String changeName = dto.getPath() + UUID.randomUUID() + extension;
        String presignedUrl = fileService.generatePresignedUploadUrl(changeName, dto.getFileType());

        return ResponseEntity.ok(new UploadUrlResponseDto(changeName, presignedUrl));
    }
}
