package com.bridge.kinder.service;

import com.bridge.kinder.dto.CenterDto;

import java.util.List;

public interface CenterService {
    //센터 전체 리스트 불러오기
    List<CenterDto.Response> findAllCenter();
    //센터 정보 불러오기
    CenterDto.Response getCenterDetail(int centerNo);
}
