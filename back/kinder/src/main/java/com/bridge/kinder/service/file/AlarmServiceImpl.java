package com.bridge.kinder.service.file;

import com.bridge.kinder.dto.AlarmDto;
import com.bridge.kinder.entity.Alarm;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.AlarmRepository;
import com.bridge.kinder.repository.MemberRepository;
import com.bridge.kinder.service.AlarmService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AlarmServiceImpl implements AlarmService {

    private final AlarmRepository alarmRepository;
    private final MemberRepository memberRepository;


    @Override
    public List<AlarmDto.Response> getAlarms(String memberId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않은 멤버입니다."));
        return alarmRepository.findByMember_MemberNoAndIsReadFalseOrderByCreatedAtDesc(member.getMemberNo())
                .stream()
                .map(AlarmDto.Response::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void readAlarm(Long alarmNo) {
        Alarm alarm = alarmRepository.findById(alarmNo)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 알람 입니다."));
        alarm.setRead(true);
    }


}
