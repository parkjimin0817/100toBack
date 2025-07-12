package com.bridge.kinder.service;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.dto.CounselDto;
import com.bridge.kinder.dto.CounselDto.CreateDto;
import com.bridge.kinder.dto.CounselDto.Response;
import com.bridge.kinder.dto.CounselDto.Update;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Counsel;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.repository.CenterRepository;
import com.bridge.kinder.repository.ChildRepository;
import com.bridge.kinder.repository.CounselRepository;
import com.bridge.kinder.repository.CounselRepositoryCustom;
import com.bridge.kinder.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CounselServiceImpl implements CounselService {

    private final CounselRepository counselRepository;
    private final CenterRepository centerRepository;
    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;
    private final CounselRepositoryCustom counselRepositoryCustom;

    @Override
    public CounselDto.CreateDto addCounsel(CounselDto.CreateDto dto) {
        // 참조 엔티티 조회
        Center center = centerRepository.findById(dto.getCenterNo())
                .orElseThrow(() -> new NoSuchElementException("시설을 찾을 수 없습니다."));

        Member member = memberRepository.findByMemberNo(dto.getMemberNo())
                .orElseThrow(() -> new NoSuchElementException("학부모를 찾을 수 없습니다."));

        Child child = childRepository.findByChildNo(dto.getChildNo())
                .orElseThrow(() -> new NoSuchElementException("아동을 찾을 수 없습니다."));

        // DTO -> Entity 변환
        Counsel counsel = dto.toEntity(center, member, child);

        // 저장
        Counsel saved = counselRepository.save(counsel);

        // 저장 결과 반환 (필요 시 추가 정보 포함 가능)
        return new CounselDto.CreateDto(
                saved.getCounselType(),
                saved.getCounselDate(),
                saved.getCounselStart(),
                saved.getCounselEnd(),
                saved.getCenter().getCenterNo(),
                saved.getMember().getMemberNo(),
                saved.getChild().getChildNo()
        );
    }

    @Override
    public List<CounselDto.Response> findCounselByClassNo(int classNo) {
        return counselRepositoryCustom.findCounselByClassNo(classNo).stream()
                .map(CounselDto.Response::toEntity)
                .collect(Collectors.toList());
    }

    @Override
    public CounselDto.Update updateCounsel(CounselDto.Update dto, int counselNo) {
        Counsel counsel = counselRepositoryCustom.updateCounsel(dto, counselNo)
                .orElseThrow(() -> new EntityNotFoundException("정삭적으로 수정되지 않았습니다."));
        return CounselDto.Update.toDto(counsel);

    }

    @Override
    public int deleteCounsel(int counselNo) {
        if (!counselRepository.existsById(counselNo)) {
            return 0; // 삭제 실패 (존재하지 않음)
        }
        counselRepository.deleteById(counselNo);
        return counselNo; // 삭제 성공
    }

    @Override
    public List<Response> getCounselByMemberNo(int memberNo) {
        return counselRepositoryCustom.getCounselByMemberNo(memberNo).stream()
                .map(CounselDto.Response::toEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<Response> getCounselByCenterNo(int centerNo) {
        return counselRepositoryCustom.getCounselByCenterNo(centerNo).stream()
                .map(CounselDto.Response::toEntity)
                .collect(Collectors.toList());
    }

}
