package com.bridge.kinder.repository.sms;

import com.bridge.kinder.entity.AuthNumber;
import com.bridge.kinder.enums.CommonEnums;

public interface SmsRepository {
    void save(AuthNumber authNumber);

    AuthNumber findByAuthNumber(String authNumber);
    AuthNumber findByAuthNo(String authNumber, CommonEnums.AuthStatus authStatus);
}
