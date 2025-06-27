package com.bridge.kinder.service;

import com.bridge.kinder.dto.MemberHealthLogDto;
import com.bridge.kinder.dto.MemberHealthLogDto.DetailResponse;
import java.util.List;
import java.util.Optional;

public interface MemberHealthServiceLog {

    //기록 생성
    String createHealthLog(MemberHealthLogDto.Create dto);
    //기록 리스트 불러오기
    List<MemberHealthLogDto.ListResponse> logList(int memberNo);
    //기록 상세보기
    MemberHealthLogDto.DetailResponse logDetail(int memberHealthLogNo);
    //기록 수정
    String updateHealthLog(MemberHealthLogDto.Update dto);
    //기록 삭제
    void deleteHealthLog(int memberHealthLogNo);
}
