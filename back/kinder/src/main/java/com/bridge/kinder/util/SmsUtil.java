package com.bridge.kinder.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SmsUtil {
    @Value("${sms.domain}")
    private String domain;
    @Value("${sms.key.apiKey}")
    private String apiKey;
    @Value("${sms.key.apiSecretKey}")
    private String apiSecretKey;

    private DefaultMessageService messageService;

    @PostConstruct
    public void init() {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, domain);
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