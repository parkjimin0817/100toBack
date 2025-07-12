package com.bridge.kinder.service.sms;

import com.bridge.kinder.dto.sms.SmsDto;
import java.util.concurrent.TimeoutException;

public interface SmsService {

    //해당 전화번호에 인증번호 전송 후 데이터베이스에 저장
    String sendingNumberToFindId( SmsDto.PhoneAccess dto);

    //전화번호 인증번호를 받고 데이터베이스 인증번호와 비교
    Boolean comparisonAuthNumber(SmsDto.AuthNumberComparison dto);

    String signUpAuthNum(SmsDto.SignUpAuthResponse dto);
}
