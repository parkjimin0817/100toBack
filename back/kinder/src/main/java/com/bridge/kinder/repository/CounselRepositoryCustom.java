package com.bridge.kinder.repository;

import com.bridge.kinder.dto.CounselDto;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Counsel;
import java.util.List;
import java.util.Optional;

//사용자의 커스텀 메서드는 여기서
public interface CounselRepositoryCustom {
    //반 번호로 상담 리스트
    List<Counsel> findCounselByClassNo(int classNo);

    //상담 번호로 상담 일정 수정
    Optional<Counsel> updateCounsel(CounselDto.Update dto, int counselNo);

    //멤버 번호로 상담 일정 불러오기
    List<Counsel> getCounselByMemberNo(int memberNo);

    //멤버 번호로 상담 일정 불러오기
    List<Counsel> getCounselByCenterNo(int centerNo);
}
