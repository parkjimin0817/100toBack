package com.bridge.kinder.dto.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DownloadUrlResponseDto {
    private String presigend_url;
    private String original_name;
}
