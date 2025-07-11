package com.bridge.kinder.service;

import com.bridge.kinder.dto.AlarmDto;

import java.util.List;

public interface AlarmService {

    List<AlarmDto.Response> getAlarms(String memberId);
}
