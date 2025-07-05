package com.bridge.kinder.service;

import com.bridge.kinder.dto.MemberHealthLogDto;
import com.bridge.kinder.dto.MemberHealthLogDto.Create;
import com.bridge.kinder.dto.MemberHealthLogDto.DetailResponse;
import com.bridge.kinder.dto.MemberHealthLogDto.HealthAvgResponse;
import com.bridge.kinder.dto.MemberHealthLogDto.ListResponse;
import com.bridge.kinder.dto.MemberHealthLogDto.Update;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.MemberHealthLog;
import com.bridge.kinder.repository.MemberHealthLogRepository;
import com.bridge.kinder.repository.MemberRepository;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    //지난주, 이번주 스트레스, 수면시간 평균
    @Override
    public HealthAvgResponse getWeeklyAvg(int memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo)
                        .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버 입니다."));
        LocalDate today = LocalDate.now();
        //이번주 월요일, 일요일
        LocalDateTime thisMonday = today.with(DayOfWeek.MONDAY).atStartOfDay();
        LocalDateTime thisSunday = today.with(DayOfWeek.SUNDAY).atTime(LocalTime.MAX);
        //지난주 월요일, 일요일
        LocalDateTime lastMonday = thisMonday.minusWeeks(1);
        LocalDateTime lastSunday = lastMonday.plusDays(6);

        Double lastWeekStress = memberHealthLogRepository.getStressAvgBetween(member.getMemberNo(), lastMonday, lastSunday);
        Double thisWeekStress = memberHealthLogRepository.getStressAvgBetween(member.getMemberNo(), thisMonday, thisSunday);
        Double lastWeekSleep = memberHealthLogRepository.getSleepAvgBetween(member.getMemberNo(), lastMonday, lastSunday);
        Double thisWeekSleep = memberHealthLogRepository.getSleepAvgBetween(member.getMemberNo(), thisMonday, thisSunday);

        return HealthAvgResponse.builder()
                .member_no(member.getMemberNo())
                .lastWeekStress((int) (lastWeekStress != null ? ((lastWeekStress/10)*100) : 0.0))
                .thisWeekStress((int) (thisWeekStress != null ? ((thisWeekStress/10)*100) : 0.0))
                .lastWeekSleep((int) (lastWeekSleep != null ? ((lastWeekSleep/8)*100)  : 0.0))
                .thisWeekSleep((int) (thisWeekSleep != null ? ((thisWeekSleep/8)*100) : 0.0))
                .build();
    }
}
