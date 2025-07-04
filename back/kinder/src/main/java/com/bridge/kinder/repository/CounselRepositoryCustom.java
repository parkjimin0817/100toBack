package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Counsel;
import java.util.List;

//사용자의 커스텀 메서드는 여기서
public interface CounselRepositoryCustom {
    //반 번호로 상담 리스트
    List<Counsel> findCounselByClassNo(int classNo);
}
