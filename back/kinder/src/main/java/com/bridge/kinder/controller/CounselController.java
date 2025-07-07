package com.bridge.kinder.controller;

import com.bridge.kinder.dto.CounselDto;
import com.bridge.kinder.dto.CounselDto.CreateDto;
import com.bridge.kinder.entity.Counsel;
import com.bridge.kinder.service.CounselService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/counsel")
@RequiredArgsConstructor
public class CounselController {

    private final CounselService counselService;

    //상담일정 생성
    @PostMapping("/add")
    public ResponseEntity<CounselDto.CreateDto> addCounsel(@RequestBody CounselDto.CreateDto dto) {
        return ResponseEntity.ok(counselService.addCounsel(dto));
    }

    //해당 반의 상담일정 리스트 조회
    @GetMapping
    public ResponseEntity<List<CounselDto.Response>> getCounsel(@RequestParam int classNo) {
        return ResponseEntity.ok(counselService.findCounselByClassNo(classNo));
    }

    //상담 번호로 상담 일정 수정
    @PatchMapping("/update")
    public ResponseEntity<CounselDto.Update> updateCounsel(@RequestBody CounselDto.Update dto,@RequestParam int counselNo) {
        return ResponseEntity.ok(counselService.updateCounsel(dto,counselNo));
    }

    //상담 번호로 상담 일정 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCounsel(@RequestParam int counselNo) {
        int deletedNo = counselService.deleteCounsel(counselNo);

        if (deletedNo == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("삭제 실패: 존재하지 않는 상담 번호입니다.");
        }

        return ResponseEntity.ok("삭제 완료");
    }

    //멤버 번호(학부모)로 상담 일정 불러오기
    @GetMapping("/parent")
    public ResponseEntity<List<CounselDto.Response>> getCounselByMemberNo(@RequestParam int memberNo) {
        return ResponseEntity.ok(counselService.getCounselByMemberNo(memberNo));
    }
}
