package com.bridge.kinder.service;

import com.bridge.kinder.dto.ScheduleDto;
import com.bridge.kinder.dto.ScheduleDto.CreateScheduleDto;
import com.bridge.kinder.dto.ScheduleDto.DailyResponse;
import com.bridge.kinder.dto.ScheduleDto.DailyScheduleDto;
import com.bridge.kinder.dto.ScheduleDto.DailyScheduleUpdateDto;
import com.bridge.kinder.dto.ScheduleDto.ScheduleResponse;
import com.bridge.kinder.dto.ScheduleDto.ScheduleUpdateDto;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Schedule;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ClassRoomRepository;
import com.bridge.kinder.repository.MemberRepository;
import com.bridge.kinder.repository.ScheduleRepository;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CenterRepository centerRepository;
    private final MemberRepository memberRepository;
    private final ClassRoomRepository classRoomRepository;

    //스케줄 생성
    @Override
    public String createSchedule(CreateScheduleDto dto) {
        Center center = centerRepository.findById(dto.getCenter_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        Member member = memberRepository.findByMemberNo(dto.getMember_no())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

//        if (dto.getStart_time() != null && dto.getEnd_time() != null &&
//                dto.getEnd_time().isBefore(dto.getStart_time())) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "종료 시간이 시작 시간보다 빠를 수 없습니다.");
//        }

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

        List<Schedule> memberSchedules = scheduleRepository.findMemberScheduleAll(center.getCenterNo(), member.getMemberNo());

        List<Schedule> centerSchedules = scheduleRepository.findCenterScheduleAll(center.getCenterNo());

        // scheduleNo 기준 중복 제거
        Map<Integer, Schedule> uniqueScheduleMap = new LinkedHashMap<>();
        for (Schedule schedule : memberSchedules) {
            uniqueScheduleMap.put(schedule.getScheduleNo(), schedule);
        }
        for (Schedule schedule : centerSchedules) {
            uniqueScheduleMap.putIfAbsent(schedule.getScheduleNo(), schedule);
        }

        return uniqueScheduleMap.values().stream()
                .map(schedule -> ScheduleResponse.toDto(schedule, schedule.getCenter(), schedule.getMember()))
                .collect(Collectors.toList());
    }

    //스케줄 수정
    @Override
    public String updateSchedule(ScheduleUpdateDto dto) {
        Schedule schedule = scheduleRepository.findScheduleByScheduleNo(dto.getSchedule_no());

//        if (dto.getStart_time() != null && dto.getEnd_time() != null &&
//                dto.getEnd_time().isBefore(dto.getStart_time())) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "종료 시간이 시작 시간보다 빠를 수 없습니다.");
//        }

        schedule.updateTitle(dto.getTitle());
        schedule.updateDescription(dto.getDescription());
        schedule.updateStartTime(dto.getStart_time());
        schedule.updateEndTime(dto.getEnd_time());

        return dto.toDto(schedule).toString();
    }

    //스케줄 삭제
    @Override
    public void deleteSchedule(int scheduleNo) {
        Schedule schedule = scheduleRepository.findScheduleByScheduleNo(scheduleNo);
        scheduleRepository.deleteSchedule(schedule);
    }

    //반 일과표 생성
    @Override
    public List<Integer> createDailySchedule(List<DailyScheduleDto> dto) {
        int centerNo = 0;
        int memberNo = 0;
        int classNo = 0;

        List<Schedule> sc = new ArrayList<>();

        for(DailyScheduleDto dailyScheduleDto : dto){
            centerNo = dailyScheduleDto.getCenter_no();
            memberNo = dailyScheduleDto.getMember_no();
            classNo = dailyScheduleDto.getClass_no();

            Center center = centerRepository.findById(centerNo)
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

            Member member = memberRepository.findByMemberNo(memberNo)
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

            ClassRoom classRoom = classRoomRepository.findByClassNo(classNo)
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 반입니다."));

            Schedule schedule = dailyScheduleDto.toDto(center, member, classRoom);
            sc.add(schedule);
        }

        scheduleRepository.saveDailySchedule(sc);
        return  sc.stream()
                .map(Schedule::getScheduleNo)
                .collect(Collectors.toList());
    }

    //반 일과표 조회
    @Override
    public List<DailyResponse> dailyList(int centerNo, int memberNo, int classNo , LocalDate scheduleDate) {
        Center center = centerRepository.findById(centerNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));

        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 멤버입니다."));

        ClassRoom classRoom = classRoomRepository.findByClassNo(classNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 반입니다."));


        return scheduleRepository.findDailyList(center.getCenterNo(), member.getMemberNo(), classRoom.getClassNo(), scheduleDate)
                .stream().map(DailyResponse::toDto)
                .collect(Collectors.toList());
    }

    //반 일과표 등록(수정)
    @Override
    public List<ScheduleDto.DailyResponse> updateDailySchedule(List<DailyScheduleUpdateDto> dtoList) {
        List<ScheduleDto.DailyResponse> resultList = new ArrayList<>();

        for (DailyScheduleUpdateDto dto : dtoList) {
            int centerNo = dto.getCenter_no();
            int memberNo = dto.getMember_no();
            int classNo = dto.getClass_no();
            int scheduleNo = dto.getSchedule_no();
            LocalDate scheduleDate = dto.getSchedule_date();
            String description = dto.getDescription();
            LocalTime startTime = dto.getStart_time();
            LocalTime endTime = dto.getEnd_time();

            // 각 DTO에 해당하는 Schedule을 조회
            List<Schedule> schedules = scheduleRepository.findDailySchedule(centerNo, memberNo, classNo, scheduleNo, scheduleDate);

            for (Schedule schedule : schedules) {
                schedule.updateDailySchedule(description, startTime, endTime);

                // 수정된 결과를 DTO로 변환해서 결과 리스트에 추가
                resultList.add(ScheduleDto.DailyResponse.toDto(schedule));
            }
        }

        return resultList;
    }

}
