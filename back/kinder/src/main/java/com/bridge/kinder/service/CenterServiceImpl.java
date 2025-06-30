package com.bridge.kinder.service;

import com.bridge.kinder.dto.CenterDto;
import com.bridge.kinder.dto.CenterDto.Response;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.repository.CenterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CenterServiceImpl implements CenterService {

    private final CenterRepository centerRepository;

    //센터 전체 리스트 불러오기
    @Override
    @Transactional(readOnly = true)
    public List<CenterDto.Response> findAllCenter() {
        return centerRepository.findAll().stream()
                .map(CenterDto.Response::toDto)
                .collect(Collectors.toList());
    }

    //센터 정보 불러오기
    @Transactional(readOnly = true)
    @Override
    public Response getCenterDetail(int centerNo) {
        Center center = centerRepository.findById(centerNo)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시설입니다."));
        CenterDto.Response centerDto = CenterDto.Response.toDto(center);
        return centerDto;
    }
}
