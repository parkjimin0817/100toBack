package com.bridge.kinder.auth;

import com.bridge.kinder.enums.CommonEnums;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private final String secretKey;
    private final int expiration;
    private final Key SECRET_KEY;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey, @Value("${jwt.expiration}") int expiration) {
        this.secretKey = secretKey;
        this.expiration = expiration;
        //jwt 설정값 -> 서명을 위한 key 객체
        this.SECRET_KEY = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(String memberId, String memberType) {
        Claims claims = Jwts.claims().setSubject(memberId);
        claims.put("memberType", memberType);

        //jwt 만료 시간 (30분 뒤)
        Date now = new Date();
        Date expire = new Date(now.getTime() + (expiration * 1000L * 60));

        return Jwts.builder() // header + payload + signature
                .setClaims(claims) // payload에 담길 사용자 정보 (id, type)
                .setIssuedAt(now) //토큰 발급 시간
                .setExpiration(expire) //토큰 만료 시간
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512) //signature
                .compact();

    }

    public String getMemberIdFromToken() {
        //현재 요청의 JWT 토큰에서 아이디 추출
        //JwtTokenFilter에서 토큰 검증 후에 호출
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    //채팅관련 함수
    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
