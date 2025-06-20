package com.bridge.kinder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class SmsDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private String from;
        private String to;
    }
}
