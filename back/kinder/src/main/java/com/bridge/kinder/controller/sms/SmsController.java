package com.bridge.kinder.controller.sms;

import com.bridge.kinder.dto.sms.SmsDto;
import com.bridge.kinder.service.sms.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/sms")
@RequiredArgsConstructor
public class SmsController {

    private final SmsService smsService;

    //해당 전화번호에 인증번호 전송 후 데이터베이스에 저장
    @PostMapping("/sendOne")
    public ResponseEntity<String> authNumberGoPhone(@RequestBody SmsDto.PhoneAccess dto){
        String resultMsg = smsService.sendingNumberToFindId(dto);
        return ResponseEntity.ok(resultMsg);
    }

    //전화번호 인증번호를 받고 데이터베이스 인증번호와 비교
    @PostMapping("/authNumber")
    public ResponseEntity<Boolean> authNumber(@RequestBody SmsDto.AuthNumberComparison dto){
        Boolean status = smsService.comparisonAuthNumber(dto);
        return ResponseEntity.ok(status);
    }

    //회원가입 시 본인확인 용 인증번호
    @PostMapping("/sendMessage")
    public ResponseEntity<String> signUpAuthNum(@RequestBody SmsDto.SignUpAuthResponse dto){
        String resultMsg = smsService.signUpAuthNum(dto);
        return ResponseEntity.ok(resultMsg);
    }
}
