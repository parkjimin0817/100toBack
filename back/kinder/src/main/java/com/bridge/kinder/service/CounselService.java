package com.bridge.kinder.service;

import com.bridge.kinder.dto.CounselDto;
import java.io.IOException;
import java.util.List;

public interface CounselService {

    //상담일정 생성
    CounselDto.CreateDto addCounsel(CounselDto.CreateDto dto);
    //반 번호로 상담일정 리스트 조회
    List<CounselDto.Response> findCounselByClassNo(int classNo);
}
