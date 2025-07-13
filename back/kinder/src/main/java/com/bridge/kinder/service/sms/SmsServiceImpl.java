package com.bridge.kinder.service.sms;

import com.bridge.kinder.dto.sms.SmsDto;
import com.bridge.kinder.dto.sms.SmsDto.SignUpAuthResponse;
import com.bridge.kinder.entity.AuthNumber;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.AuthStatus;
import com.bridge.kinder.repository.MemberRepository;
import com.bridge.kinder.repository.sms.SmsRepository;
import com.bridge.kinder.util.SmsUtil;
import java.time.Duration;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SmsServiceImpl implements SmsService{

    private final MemberRepository memberRepository;
    private final SmsRepository smsRepository;
    private final SmsUtil smsUtil;



    //해당 전화번호에 인증번호 전송 후 데이터베이스에 저장
    @Override
    public String sendingNumberToFindId(SmsDto.PhoneAccess dto) {
        Member member = memberRepository.findByIdAndNameAndPhone(dto.getMember_id(),
                dto.getMember_name(), dto.getMember_phone());

        // 인증번호 생성
        String certificationNumber = String.format("%06d", (int) (Math.random() * 1000000));

        // 기존에 해당 인증번호가 DB에 존재하는지 확인
        AuthNumber existingAuth = smsRepository.findByAuthNumber(certificationNumber);

        // 인증번호가 이미 있다면 → 새 인증번호 생성 (중복 방지)
        while (existingAuth != null) {
            certificationNumber = String.format("%06d", (int) (Math.random() * 1000000));
            existingAuth = smsRepository.findByAuthNumber(certificationNumber);
        }

        // SMS 전송
        SingleMessageSentResponse response = smsUtil.sendOne(member.getMemberPhone(), certificationNumber);

        if (response == null || !response.getStatusCode().equals("2000")) {
            throw new IllegalArgumentException("인증 번호 보내기 실패했습니다.");
        }

        // DB에 인증번호 저장
        AuthNumber authNumber = AuthNumber.builder()
                .authNumber(certificationNumber)
                .member(member)
                .build();
        smsRepository.save(authNumber);

        return "인증 번호를 성공적으로 전송했습니다.";
    }

    /*
    전화번호 인증번호를 받고 데이터베이스 인증번호와 비교
    1. 인증번호 프라이머리 키로 해당 인증번호가 있는지 찾기
    2. 해당 인증번호가 있다면 인증번호의 생성시간과 현재 시간을 빼서 3분 안에 인증했다면 성공
    3. 3분이 지나거나 인증번호가 다르면 실패
     */
    @Override
    public Boolean comparisonAuthNumber(SmsDto.AuthNumberComparison dto) {
        AuthNumber authNumber = smsRepository.findByAuthNo(dto.getAuth_number(), AuthStatus.REFUSAL);

        // 인증번호 존재하지 않을 경우 예외 처리
        if (authNumber == null) {
            throw new IllegalArgumentException("유효하지 않은 인증 요청입니다.");
        }

        // 시간 비교
        long elapsedSeconds = Duration.between(authNumber.getCreateTime(), LocalDateTime.now()).getSeconds();
        if (elapsedSeconds > 180) { // 3분 초과
            throw new IllegalArgumentException("인증 시간이 초과되었습니다.");
        }

        // 인증번호 비교
        if (!dto.getAuth_number().equals(authNumber.getAuthNumber())) {
            throw new IllegalArgumentException("인증 번호가 일치하지 않습니다.");
        }

        authNumber.updateAuthStatus(AuthStatus.ACCESS);

        return true;
    }

    @Override
    public String signUpAuthNum(SignUpAuthResponse dto) {
        //랜덤한 인증번호(숫자->문자열)
        String certificationNumber = String.format("%06d", (int) (Math.random() * 1000000));
        SingleMessageSentResponse response = smsUtil.sendOne(dto.getMember_phone(),
                certificationNumber);

        // 기존에 해당 인증번호가 DB에 존재하는지 확인
        AuthNumber existingAuth = smsRepository.findByAuthNumber(certificationNumber);

        // 인증번호가 이미 있다면 → 새 인증번호 생성 (중복 방지)
        while (existingAuth != null) {
            certificationNumber = String.format("%06d", (int) (Math.random() * 1000000));
            existingAuth = smsRepository.findByAuthNumber(certificationNumber);
        }

        AuthNumber authNumber = AuthNumber.builder()
                .authNumber(certificationNumber)
                .build();
        smsRepository.save(authNumber);

        if (response != null && response.getStatusCode().equals("2000")) {
            return "인증 번호 보내기 성공했습니다.";
        }

        throw new IllegalArgumentException("인증 번호 보내기 실패했습니다.");
    }
}
