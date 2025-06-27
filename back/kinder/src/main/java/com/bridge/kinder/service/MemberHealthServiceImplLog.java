package com.bridge.kinder.service;

import com.bridge.kinder.dto.MemberHealthLogDto;
import com.bridge.kinder.dto.MemberHealthLogDto.Create;
import com.bridge.kinder.dto.MemberHealthLogDto.DetailResponse;
import com.bridge.kinder.dto.MemberHealthLogDto.ListResponse;
import com.bridge.kinder.dto.MemberHealthLogDto.Update;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.MemberHealthLog;
import com.bridge.kinder.repository.MemberHealthLogRepository;
import com.bridge.kinder.repository.MemberRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberHealthServiceImplLog implements MemberHealthServiceLog {

    private final MemberHealthLogRepository memberHealthLogRepository;
    private final MemberRepository memberRepository;

    //기록 생성
    @Override
    public String createHealthLog(Create dto) {
        Member member = memberRepository.findByMemberNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));


        MemberHealthLog healthLog = dto.toEntity(member);
        memberHealthLogRepository.save(healthLog);

        return String.valueOf(healthLog.getMemberHealthLogNo());
    }

    //기록 리스트 불러오기
    @Transactional(readOnly = true)
    @Override
    public List<MemberHealthLogDto.ListResponse> logList(int memberNo) {

        return memberHealthLogRepository.findByMemberNo(memberNo)
                .stream()
                .map(MemberHealthLogDto.ListResponse::toDto)
                .collect(Collectors.toList());
    }

    //기록 상세보기
    @Transactional(readOnly = true)
    @Override
    public DetailResponse logDetail(int memberHealthLogNo) {
        return memberHealthLogRepository.findByMemberHealthLogNo(memberHealthLogNo)
                .map(MemberHealthLogDto.DetailResponse::toDto)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 기록입니다.."));
    }

    //기록 수정
    @Override
    public String updateHealthLog(Update dto) {
        MemberHealthLog healthLog = memberHealthLogRepository.findByMemberHealthLogNo(dto.getMember_health_log_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 기록입니다."));

        healthLog.changeTemperature(dto.getTemperature());
        healthLog.changeStress(dto.getStress());
        healthLog.changeSleep(dto.getSleep());
        healthLog.changeSymptoms(dto.getSymptoms());

        return dto.toDto().toString();
    }

    //기록 삭제
    @Override
    public void deleteHealthLog(int memberHealthLogNo) {
        MemberHealthLog healthLog = memberHealthLogRepository.findByMemberHealthLogNo(memberHealthLogNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 기록입니다."));
        memberHealthLogRepository.deleteByMemberHealthLogNo(healthLog);
    }
}
