package com.bridge.kinder.controller;

import com.bridge.kinder.auth.JwtTokenProvider;
import com.bridge.kinder.dto.AlarmDto;
import com.bridge.kinder.repository.AlarmRepository;
import com.bridge.kinder.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/alarm")
@RequiredArgsConstructor
public class AlarmController {

    private final JwtTokenProvider jwtTokenProvider;
    private final AlarmService alarmService;

    @GetMapping
    public ResponseEntity<List<AlarmDto.Response>> getAlarms() {
        String memberId = jwtTokenProvider.getMemberIdFromToken();
        return ResponseEntity.ok(alarmService.getAlarms(memberId));
    }

    @PatchMapping("/{alarmNo}")
    public ResponseEntity<Void> readAlarm(@PathVariable Long alarmNo) {
        alarmService.readAlarm(alarmNo);
        return ResponseEntity.ok().build();
    }
}
