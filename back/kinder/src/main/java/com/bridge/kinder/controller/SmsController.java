package com.bridge.kinder.controller;

import com.bridge.kinder.dto.SmsDto;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/sms")
@RequiredArgsConstructor
public class SmsController {

    final DefaultMessageService messageService;

    public SmsController() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize("NCS359M3RU7GDWQ5", "OGLZJ5BCAEZQUCSTSTO4TZXFMYYPDFRI", "https://api.solapi.com");
    }

    @PostMapping("/send-one")
    public SingleMessageSentResponse sendOne(@RequestBody SmsDto.Response receive) {
        Message message = new Message();

        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom(receive.getFrom());
        message.setTo(receive.getTo());
        message.setText("인증번호 [" + "123123" + "]");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return response;
    }
}
