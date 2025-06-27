package com.bridge.kinder.controller;

import com.bridge.kinder.dto.MemberHealthLogDto;
import com.bridge.kinder.service.MemberHealthServiceLog;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/members/health")
@RequiredArgsConstructor
public class MemberHealthControllerLog {

    private final MemberHealthServiceLog memberHealthService;

    //기록 생성
    @PostMapping("/create")
    public ResponseEntity<String> createMemberHealthLog(@RequestBody MemberHealthLogDto.Create dto) {
        String logNo = memberHealthService.createHealthLog(dto);
        return ResponseEntity.ok(logNo);
    }

    //기록 리스트 불러오기
    @GetMapping("/list")
    public ResponseEntity<List<MemberHealthLogDto.ListResponse>> listMemberHealthLogs(@RequestParam int memberNo) {
        List<MemberHealthLogDto.ListResponse> responses = memberHealthService.logList(memberNo);
        return ResponseEntity.ok(responses);
    }

    //기록 상세보기
    @GetMapping("/detail")
    public ResponseEntity<MemberHealthLogDto.DetailResponse> detailMemberHealthLog(@RequestParam int memberHealthLogNo) {
        return ResponseEntity.ok(memberHealthService.logDetail(memberHealthLogNo));
    }

    //기록 수정
    @PatchMapping("/edit")
    public ResponseEntity<String> editMemberHealthLog(@RequestBody MemberHealthLogDto.Update dto) {
        return ResponseEntity.ok(memberHealthService.updateHealthLog(dto));
    }

    //기록 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMemberHealthLog(@RequestParam int memberHealthLogNo) {
        memberHealthService.deleteHealthLog(memberHealthLogNo);
        return ResponseEntity.ok().build();
    }
}
