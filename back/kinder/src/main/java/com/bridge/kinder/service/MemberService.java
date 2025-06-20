package com.bridge.kinder.service;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberDto;

import java.io.IOException;

public interface MemberService {

    //아이디 중복 체크
    boolean checkIdDuplicate(String memberId);
    //시설장(시설) 생성
    String createManager(CreateManagerDto dto);
    //교사/학부모 생성
    String createMember(MemberDto.CreateMember dto) throws IOException;
    //멤버 조회(임시)
    MemberDto.Response findMEmber(int memberNo);

}
