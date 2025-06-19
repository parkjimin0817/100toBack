package com.bridge.kinder.service;

import com.bridge.kinder.dto.MemberDto;

public interface MemberService {
    String createMember(MemberDto.Create createDto);
    MemberDto.Response findMEmber(int memberNo);
}
