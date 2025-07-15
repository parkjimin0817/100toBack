package com.bridge.kinder.service;

import com.bridge.kinder.dto.CounselDto;
import java.io.IOException;
import java.util.List;

public interface CounselService {

    //상담일정 생성
    CounselDto.CreateDto addCounsel(CounselDto.CreateDto dto);

    //반 번호로 상담일정 리스트 조회
    List<CounselDto.Response> findCounselByClassNo(int classNo);

    //상담 번호로 상담 일정 수정
    CounselDto.Update updateCounsel(CounselDto.Update dto, int counselNo);

    //상담 번호로 상담 일정 삭제
    int deleteCounsel(int counselNo);

    //멤버 번호로 상담 일정 불러오기(학부모)
    List<CounselDto.Response> getCounselByMemberNo(int memberNo);

    //센터 번호로 상담 일정 불러오기(학부모)
    List<CounselDto.Response> getCounselByCenterNo(int centerNo);
}
