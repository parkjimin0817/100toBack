package com.bridge.kinder.controller;

import com.bridge.kinder.service.MemberHealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/members/health")
@RequiredArgsConstructor
public class MemberHealthController {

    private MemberHealthService memberHealthService;


}
