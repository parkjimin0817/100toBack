package com.bridge.kinder.service;

public interface AWSService {
    String generatePresignedUploadUrl(String fileName, String contentType);

    String generatePresignedDownloadUrl(String fileName);
}
