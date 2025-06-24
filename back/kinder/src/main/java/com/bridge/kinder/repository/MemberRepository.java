package com.bridge.kinder.repository;

import com.bridge.kinder.dto.MypageDto;
import com.bridge.kinder.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository  {

    //아이디 중복 체크
    boolean existsByMemberId(String memberId);
    //멤버 생성
    void save(Member member);
    //멤버 로그인
    Optional<Member> findByMemberId(String memberId);

    //학부모 검색
    Optional<Member> findByParentNo(int memberNo);

    //멤버넘버로 조회
    Optional<Member> findByMemberNo(int memberNo);

    //마이페이지 정보 수정
    Optional<Member> myPageUpdate(int id, MypageDto.Update dto);
}
