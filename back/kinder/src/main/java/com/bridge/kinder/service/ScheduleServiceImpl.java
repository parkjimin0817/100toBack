package com.bridge.kinder.service;

import com.bridge.kinder.dto.ScheduleDto;
import com.bridge.kinder.dto.ScheduleDto.CreateScheduleDto;
import com.bridge.kinder.dto.ScheduleDto.ScheduleResponse;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.MemberRepository;
import com.bridge.kinder.repository.ScheduleRepository;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CenterRepository centerRepository;
    private final MemberRepository memberRepository;

    //스케줄 생성
    @Override
    public String createSchedule(CreateScheduleDto dto) {
        Center center = centerRepository.findById(dto.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        Member member = memberRepository.findByMemberNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        Schedule schedule = dto.toEntity(center, member);

        scheduleRepository.save(schedule);
        return String.valueOf(schedule.getScheduleNo());
    }

    //스케줄 리스트 불러오기
    @Transactional(readOnly = true)
    @Override
    public List<ScheduleResponse> getSchedules(int centerNo, int memberNo) {
        Center center = centerRepository.findById(centerNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        return scheduleRepository.findScheduleAll(center.getCenterNo(), member.getMemberNo())
                .stream()
                .map(schedule -> ScheduleDto.ScheduleResponse.toDto(
                        schedule,
                        schedule.getCenter(),
                        schedule.getMember()
                ))
                .collect(Collectors.toList());
    }
}
