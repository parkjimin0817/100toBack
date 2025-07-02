package com.bridge.kinder.controller;


import com.bridge.kinder.dto.LeaveDto;
import com.bridge.kinder.entity.Leave;
import com.bridge.kinder.repository.LeaveRepository;
import com.bridge.kinder.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/leave")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    //연차 기록 불러오기
    @GetMapping("/{memberNo}")
    public ResponseEntity<LeaveDto.Response> getLeave(@PathVariable int memberNo) {
        return ResponseEntity.ok(leaveService.getLeaveByMemberNo(memberNo));
    }

}
