package com.bridge.kinder.service;

import com.bridge.kinder.dto.CreateManagerDto;
import com.bridge.kinder.dto.MemberDto;

public interface MemberService {
    //시설장(시설) 생성
    String createManager(CreateManagerDto dto);
    //교사 생성
    String createTeacher(MemberDto.CreateMember dto);
    //학부모 생성
    String createParent(MemberDto.CreateMember dto);
    //멤버 조회(임시)
    MemberDto.Response findMEmber(int memberNo);
}
