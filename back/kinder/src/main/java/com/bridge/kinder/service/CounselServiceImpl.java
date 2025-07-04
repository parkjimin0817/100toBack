package com.bridge.kinder.service;

import com.bridge.kinder.repository.CounselRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CounselServiceImpl implements CounselService {

    private final CounselRepository counselRepository;


}
