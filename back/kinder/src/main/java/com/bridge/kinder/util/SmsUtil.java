package com.bridge.kinder.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Component;

@Component

public class SmsUtil {

    private DefaultMessageService messageService;

    @PostConstruct
    public void init() {
        this.messageService = NurigoApp.INSTANCE.initialize("NCS359M3RU7GDWQ5", "OGLZJ5BCAEZQUCSTSTO4TZXFMYYPDFRI", "https://api.solapi.com");
    }

    public SingleMessageSentResponse sendOne(String to, String certificationNumber) {
        Message message = new Message();
        //발신자는 고정
        String caller = "01086006965";
        message.setFrom(caller);
        message.setTo(to);
        message.setText(String.format("[KinderBridge] 인증번호 : %s를 입력해주세요.", certificationNumber));

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return response;
    }
}