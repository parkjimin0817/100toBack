package com.bridge.kinder.dto.file;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PresignedDto {
    private String fileName;
    private String fileType;
    private String path;
}
