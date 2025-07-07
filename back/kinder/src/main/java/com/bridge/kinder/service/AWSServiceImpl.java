package com.bridge.kinder.service;

import com.bridge.kinder.repository.BoardContentRepository;
import com.bridge.kinder.repository.BoardRepository;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ClassRoomRepository;
import com.bridge.kinder.repository.MemberRepository;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

@Service
@RequiredArgsConstructor
@Transactional
public class AWSServiceImpl implements AWSService {

    private final String bucket;
    private final S3Presigner s3Presigner;


    @Autowired
    public AWSServiceImpl(
            S3Presigner s3Presigner,
            @Value("${aws.s3.bucket}") String bucket // 이렇게 생성자에 주입
    ) {
        this.s3Presigner = s3Presigner;
        this.bucket = bucket;
    }


    // S3 presigned URL 발급
    public String generatePresignedUploadUrl(String fileName, String contentType) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(fileName)
                .contentType(contentType)
                .build();
        System.out.println(bucket);
        System.out.println(fileName);
        System.out.println(contentType);

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(
                r -> r.putObjectRequest(objectRequest)
                        .signatureDuration(Duration.ofMinutes(5))
        );
        System.out.println(presignedRequest.httpRequest().method());
        return presignedRequest.url().toString();
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
