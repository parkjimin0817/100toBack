package com.bridge.kinder.repository;

import com.bridge.kinder.entity.MemberHealthLog;
import java.util.List;
import java.util.Optional;

public interface MemberHealthLogRepository {

    //기록 생성
    void save(MemberHealthLog memberHealthLog);
    //멤버번호로 기록 리스트 불러오기
    List<MemberHealthLog> findByMemberNo(int memberNo);
    //기록 찾기
    Optional<MemberHealthLog> findByMemberHealthLogNo(int memberHealthLogNo);
    //기록 삭제
    void deleteByMemberHealthLogNo(MemberHealthLog memberHealthLog);
}
