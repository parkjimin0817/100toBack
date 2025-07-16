package com.bridge.kinder.config;

import com.bridge.kinder.auth.JwtTokenFilter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)  //rest api 에선 불필요(=disable)
                .httpBasic(AbstractHttpConfigurer::disable) //http basic 인증 비활성
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                //로그인
                                "/api/members/login",
                                //아이디 비밀번호 찾기
                                "/api/members/searchId",
                                "/api/members/pwdSearchId",
                                "/api/members/pwdUpdate",
                                //회원가입
                                "/api/members/manager",
                                "/api/members/teacher",
                                "/api/members/parent",
                                "/api/members/checkId",
                                "/api/center",
                                "/api/file/presigned-url",
                                "/api/sms/sendOne",
                                "/api/sms/authNumber",
                                "/api/sms/sendMessage",
                                //시설장 승인
                                "/api/approval/lists",
                                "/api/approval/decision/center",
                                // 웹 소켓
                                "/connect/**"
                        ).permitAll() //인증 없이 허용
                        .anyRequest().authenticated() //그 외는 인증 필요
                )
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        //요청 허용할 도메인들
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() { return PasswordEncoderFactories.createDelegatingPasswordEncoder(); }

}
