package com.bridge.kinder.service;

import com.bridge.kinder.dto.CenterDto;

import java.util.List;

public interface CenterService {
    List<CenterDto.Response> findAllCenter();
}
