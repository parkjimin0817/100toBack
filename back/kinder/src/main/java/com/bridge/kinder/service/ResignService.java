package com.bridge.kinder.service;

import com.bridge.kinder.dto.ResignDto;

public interface ResignService {

    //퇴사 처리
    String resignMember(ResignDto.updateResign dto);
}
