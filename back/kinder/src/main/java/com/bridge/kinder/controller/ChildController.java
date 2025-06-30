package com.bridge.kinder.controller;

import com.bridge.kinder.dto.ChildDto;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildHealthData;
import com.bridge.kinder.service.ChildService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.io.IOException;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/childs")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    //반 번호로 아동 목록 가져오기
    @GetMapping
    public ResponseEntity<List<ChildDto.Response>> getChildrenByClassNo(@RequestParam int classNo){
        return ResponseEntity.ok(childService.findChildrenByClassNo(classNo));
    }

    //아동 생성
    @PostMapping("/add")
    public ResponseEntity<String> createChild(@ModelAttribute ChildDto.CreateChild dto) throws IOException {
        String childNo = childService.createChild(dto);
        return ResponseEntity.ok(childNo);
    }

    //로그인된 부모의 아동 연결
    @PostMapping("/link")
    public ResponseEntity<String> linkChild(@RequestBody ChildDto.LinkChildRequest dto) throws IOException {
        String childNo = childService.linkChild(dto);
        return ResponseEntity.ok(childNo);
    }

    //시설장 아동 목록 가져오기
    @GetMapping("/all")
    public ResponseEntity<List<ChildDto.childListResponse>> managerChildList(@RequestParam int centerNo){
        return ResponseEntity.ok(childService.managerChildList(centerNo));
    }

    //아동 번호로 아동 가져오기
    @GetMapping("/get")
    public ResponseEntity<ChildDto.modalResponse> getChild(@RequestParam int child_no){
        return ResponseEntity.ok(childService.getChild(child_no));
    }

    //아동 번호로 반 수정하기
    @PatchMapping("/updateclass")
    public ResponseEntity<ChildDto.updateClass> updateClass(@RequestParam int child_no,@RequestParam int class_no){
        return ResponseEntity.ok(childService.updateClass(child_no,class_no));
    }

    //아동 번호로 해당 아동의 건강 로그 데이터 리스트 불러오기(매일 기록하는거)
    @GetMapping("/healthlog")
    public ResponseEntity<List<ChildDto.healthLog>> healthLog(@RequestParam int childNo){
        return ResponseEntity.ok(childService.healthLog(childNo));
    }

    //아동 번호로 해당 아동의 건강 데이터 불러오기(복약정보,예방접종,알레르기)
    @GetMapping("/health")
    public ResponseEntity<ChildDto.health> health(@RequestParam int childNo){
        return ResponseEntity.ok(childService.health(childNo));
    }

    //아동 번호로 해당 아동의 행동 로그 데이터 불러오기(매일 적는 거)
    @GetMapping("/activitylog")
    public ResponseEntity<List<ChildDto.activityLog>> activityLog(@RequestParam int childNo){
        return ResponseEntity.ok(childService.activityLog(childNo));
    }

    //아동 번호로 해당 아동의 생활 데이터 불러오기
    @GetMapping("/activity")
    public ResponseEntity<ChildDto.activity> activity(@RequestParam int childNo){
        return ResponseEntity.ok(childService.activity(childNo));
    }

    //아동 번호로 해당 아동의 출석 내역 리스트 불러오기
    @GetMapping("/attendance")
    public ResponseEntity<List<ChildDto.attendance>> attendance(@RequestParam int childNo) {
        return ResponseEntity.ok(childService.attendance(childNo));
    }


    //아동 상세보기에 필요한 데이터들 가져오기
    @GetMapping("/detail")
    public ResponseEntity<ChildDto.detail> detail(@RequestParam int childNo){
        return ResponseEntity.ok(childService.detail(childNo));
    }

    //아동 상세보기에서 건강 데이터 수정
    @PatchMapping("/updatehealthdata")
    public ResponseEntity<ChildDto.health> updateHealthData(@RequestParam int childNo, @RequestBody ChildDto.health data){
        return ResponseEntity.ok(childService.updateHealthData(childNo,data));
    }

    //아동 상세보기에서 생활 데이터 수정
    @PatchMapping("/updateactivitydata")
    public ResponseEntity<ChildDto.activity> updateActivityData(@RequestParam int childNo, @RequestBody ChildDto.activity data){
        return ResponseEntity.ok(childService.updateActivityData(childNo,data));
    }

    //아동 건강 로그 체크리스트 날짜,반 별로
    @GetMapping("/healthlog/class")
    public ResponseEntity<List<ChildDto.healthLog>> healthLogClass(@RequestParam int classNo,
                                                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        return ResponseEntity.ok(childService.getHealthLog(classNo,date));

    }

    //아동 생활 로그 체크리스트 날짜,반 별로
    @GetMapping("/activitylog/class")
    public ResponseEntity<List<ChildDto.activityLog>> activityLogClass(@RequestParam int classNo,
                                                                   @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        return ResponseEntity.ok(childService.getActivityLog(classNo,date));

    }

//    //아동 생활 로그 데이터 삽입,수정하기
//    @PatchMapping("/updateactivitylog")
//    public ResponseEntity<ChildDto.activityLog> updateActivityLog(@RequestParam int childNo,
//                                                @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
//                                                @RequestBody ChildDto.activityLog data) {
//        return ResponseEntity.ok(childService.updateActivityLog(childNo, date, data));
//
//    }

    //부모 번호로 해당 연결된 아동 리스트 가져오기
    @GetMapping("/parentChild")
    public ResponseEntity<List<ChildDto.myPageChilds>> myChilds(@RequestParam int memberNo){
        return ResponseEntity.ok(childService.myPageChilds(memberNo));
    }



}
