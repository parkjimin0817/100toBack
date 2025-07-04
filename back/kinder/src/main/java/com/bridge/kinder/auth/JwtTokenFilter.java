package com.bridge.kinder.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.GenericFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtTokenFilter extends GenericFilter {

    //JWT를 생성하거나 검증할 때 사용하는 key 객체
    private final Key SECRET_KEY;
    //application.yml 에 설정된 jwt 시크릿 키
    private final String secretKey;

    public JwtTokenFilter(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = secretKey;
        this.SECRET_KEY = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    //JWT 토큰 검증
    //검증이 필요한 모든 요청에 대해서 실행하는 필터, Authorization헤더에 포함된 JWT를 검증
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        //HTTP 요청/응답 객체 형태로 변환
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        //헤더에서 jwt 토큰 추출
        String token = httpServletRequest.getHeader("Authorization");

        try{
            if(token != null) {
                if(!token.startsWith("Bearer ")) {
                    throw new AuthenticationServiceException("Bearer 형식이 아닙니다.");
                }

                System.out.println("[TOKEN FILTER   ] secretKey = " + secretKey);
                //Bearer 뒤에 담긴 실제 jwt 문자열 추출
                String jwtToken = token.substring(7);
                //jwt 토큰 파싱하고 서명 검증
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(SECRET_KEY)
                        .build()
                        .parseClaimsJws(jwtToken)
                        .getBody();

                //사용자 권한 리스트 생성
                //memberType을 기반으로 Spring Security용 ROLE 권한 생성
                List<GrantedAuthority> authorities = new ArrayList<>();
                String memberType = (String) claims.get("memberType");
                authorities.add(new SimpleGrantedAuthority("ROLE_" + memberType));

                //jwt의 subject값(id)을 username으로 사용
                UserDetails userDetails = new User(claims.getSubject(), "", authorities);
                //인증 객체 생성(사용자 정보, 인증 수단, 권한 리스트)
                Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, jwtToken, userDetails.getAuthorities());
                //현재 요청에 대한 인증 정보 등록
                //이후 SecurityContext에서 이 사용자로 인식
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

            chain.doFilter(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            //인증 실패 시 -> 401 Unauthorized 응답 반환
            httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
            httpServletResponse.setContentType("application/json");
            httpServletResponse.getWriter().write("invalid token");
        }
    }
}
