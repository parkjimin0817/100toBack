package com.bridge.kinder.service;

import com.bridge.kinder.dto.CenterDto;
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

    @Override
    @Transactional(readOnly = true)
    public List<CenterDto.Response> findAllCenter() {
        return centerRepository.findAll().stream()
                .map(CenterDto.Response::toDto)
                .collect(Collectors.toList());
    }
}
