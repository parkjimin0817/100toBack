package com.bridge.kinder.service;


import com.bridge.kinder.dto.VacationDto;
import com.bridge.kinder.dto.VacationDto.Request;
import com.bridge.kinder.dto.VacationDto.Response;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Vacation;
import com.bridge.kinder.enums.CommonEnums.AdmissionStatus;
import com.bridge.kinder.repository.MemberRepository;
import com.bridge.kinder.repository.VacationRepository;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class VacationServiceImpl implements VacationService {

    private final VacationRepository vacationRepository;
    private final MemberRepository memberRepository;
    private final String UPLOAD_PATH = "C://test_upload/";

    @Override
    public Response requestVacation(int memberNo, VacationDto.Request request) throws IOException {
        //멤버 조회
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 교사입니다."));

        //첨부파일 처리
        String originName = null;
        String attachmentPath = null;

        if(request.getAttachment() != null && !request.getAttachment().isEmpty()) {
            originName = request.getAttachment().getOriginalFilename();
            attachmentPath = UUID.randomUUID().toString() + "_vacation_" + originName;

            File uplodadDir = new File(UPLOAD_PATH);
            if (!uplodadDir.exists()) {
                uplodadDir.mkdirs();
            }

            request.getAttachment().transferTo(new File(UPLOAD_PATH + attachmentPath));
        }

            //휴가 신청
            Vacation vacation = request.toEntity(member, attachmentPath);
            vacationRepository.save(vacation);

        return VacationDto.Response.toDto(vacation, member);
    }

    @Override
    public List<Response> getVacationsByMember(int memberNo) {
        List<Vacation> vacations = vacationRepository.findByMember_MemberNo(memberNo);

        return vacations.stream()
                .map( v -> VacationDto.Response.toDto(v, v.getMember()))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteVacation(long vacationNo) {

        Vacation vacation = vacationRepository.findById(vacationNo)
                .orElseThrow(() -> new RuntimeException("해당 휴가 신청이 존재하지 않습니다."));
        if(!vacation.getStatus().equals(AdmissionStatus.PENDING)) {
            throw new IllegalArgumentException("승인 대기 중인 휴가만 삭제할 수 있습니다.");
        }

        vacationRepository.deleteById(vacationNo);
    }

    @Override
    public List<Response> getVacationsByCenter(int centerNo) {
        List<Vacation> vacations = vacationRepository.findByMember_Center_CenterNo(centerNo);

        return vacations.stream()
                .map( v -> VacationDto.Response.toDto(v, v.getMember()))
                .collect(Collectors.toList());
    }
}
