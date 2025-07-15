package com.bridge.kinder.service.file;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.repository.BoardRepository;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

@Service
@Transactional(readOnly = true)
public class FileService {

    private final S3Presigner s3Presigner;
    private final String bucket;
    private final BoardRepository boardRepository;

    public FileService(S3Presigner s3Presigner,
                       @Value("${aws.s3.bucket}") String bucket,
                       BoardRepository boardRepository) {
        this.s3Presigner = s3Presigner;
        this.bucket = bucket;
        this.boardRepository = boardRepository;
    }

    // S3 presigned URL 발급
    public String generatePresignedUploadUrl(String fileName, String contentType) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(fileName)
                .contentType(contentType)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(
                r -> r.putObjectRequest(objectRequest)
                        .signatureDuration(Duration.ofMinutes(5))
        );

        return presignedRequest.url().toString();
    }

    // 파일 단건 조회
    public Board getFile(int boardNo) {
        return boardRepository.findById(boardNo)
                .orElseThrow(() -> new IllegalArgumentException("File not found with id: " + boardNo));
    }

    // 파일 다운로드용 presigned URL 발급
    public String generatePresignedDownloadUrl(String fileName) {
        return s3Presigner.presignGetObject(r -> r.getObjectRequest(get -> get
                                .bucket(bucket)
                                .key(fileName))//경로
                        .signatureDuration(Duration.ofMinutes(5)))
                .url()
                .toString();
    }
}
