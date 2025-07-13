package com.bridge.kinder.repository;

import com.bridge.kinder.dto.MypageDto;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public class MemberRepositoryImpl implements MemberRepository {

    @PersistenceContext
    private EntityManager em;

    //아이디 중복체크
    @Override
    public boolean existsByMemberId(String memberId) {
        String query = "SELECT COUNT(m) FROM Member m WHERE m.memberId = :memberId";
        Long count = em.createQuery(query, Long.class)
                .setParameter("memberId", memberId)
                .getSingleResult();
        return count > 0;
    }

    //멤버 생성
    @Override
    public void save(Member member) {
        em.persist(member);
    }

    //멤버 로그인
    @Override
    public Optional<Member> findByMemberId(String memberId) {
        String jpql = "SELECT m FROM Member m WHERE m.memberId = :memberId";
        Member member = em.createQuery(jpql, Member.class)
                .setParameter("memberId", memberId)
                .getResultStream()
                .findFirst()
                .orElse(null);
        return Optional.ofNullable(member);
    }

    //아동 생성 시 학부모 검색
    @Override
    public Optional<Member> findByParentNo(int memberNo) {
        return Optional.ofNullable(em.find(Member.class, memberNo));
    }

    //클래스 별 담당 교사 불러오기
    @Override
    public Optional<Member> findTeacherByClassNo(int classNo) {
        String jpql = "SELECT m FROM Member m WHERE m.classRoom.classNo = :classNo";
        Member member = em.createQuery(jpql, Member.class)
                .setParameter("classNo", classNo)
                .getResultStream()
                .findFirst()
                .orElse(null);
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> findMemberByMemberNo(int memberNo) {
        String jpql = "SELECT m FROM Member m WHERE m.memberNo = :memberNo";
        Member member = em.createQuery(jpql, Member.class)
                .setParameter("memberNo", memberNo)
                .getResultStream()
                .findFirst()
                .orElse(null);
        return Optional.ofNullable(member);
    }

    //시설 별 교사 불러오기 (for 셀렉트바 / 간단)
    @Override
    public List<Member> findTeacherByCenterNo(int centerNo) {
        return em.createQuery("select m from Member m where m.memberType =:memberType and m.status =: status and m.center.centerNo =:centerNo", Member.class)
                .setParameter("memberType", CommonEnums.MemberType.TEACHER)
                .setParameter("status", CommonEnums.AdmissionStatus.APPROVED)
                .setParameter("centerNo", centerNo)
                .getResultList();
    }

    //member_no으로 멤버 찾기
    @Override
    public Optional<Member> findByMemberNo(int memberNo) {
       return Optional.ofNullable(em.find(Member.class, memberNo));
    }

    //멤버 ID 찾기(이름, 생년월일)
    @Override
    public Optional<Member> searchId(String memberName, LocalDate memberBirth) {
        String query = "select m from Member m where m.memberName = :memberName and m.memberBirth = :memberBirth";

        return Optional.ofNullable(em.createQuery(query, Member.class)
                .setParameter("memberName", memberName )
                .setParameter("memberBirth", memberBirth)
                .getSingleResult());
    }


    //멤버 PWD 찾기(아이디 비교)
    @Override
    public Optional<Member> pwdSearchId(String memberId) {
        String query = "select m from Member m where m.memberId = :memberId";

        List<Member> result = em.createQuery(query, Member.class)
                .setParameter("memberId", memberId)
                .getResultList();

        return result.stream().findFirst(); // Optional<Member>
    }

    //아이디, 이름, 전화번호 멤버찾기
    @Override
    public Member findByIdAndNameAndPhone(String memberId, String memberName, String memberPhone) {
        String query = "select m from Member m where m.memberPhone = :memberPhone and m.memberName = :memberName and m.memberId = :memberId";

        return em.createQuery(query, Member.class)
                .setParameter("memberPhone", memberPhone)
                .setParameter("memberName", memberName)
                .setParameter("memberId", memberId)
                .getSingleResult();
    }

    //마이페이지 수정
    @Override
    public Optional<Member> myPageUpdate(int id, MypageDto.Update dto) {
        String jpql = "UPDATE Member m "
                + "SET m.memberName = :name, "
                + "m.memberBirth = :birth, "
                + "m.address =:address, "
                + "m.memberProfile =:profile "
                + "WHERE m.memberNo = :memberNo";

        int updated = em.createQuery(jpql)
                .setParameter("name", dto.getMemberName())
                .setParameter("birth", dto.getMemberBirth())
                .setParameter("address", dto.getAddress())
                .setParameter("profile", dto.getMemberProfile())
                .setParameter("memberNo", String.valueOf(id))
                .executeUpdate();

        // JPQL UPDATE는 반환값이 없음 → 다시 조회해서 Optional로 감싸야 함
        if (updated > 0) {
            Member member = em.createQuery(
                            "SELECT m FROM Member m WHERE m.memberNo = :memberNo", Member.class)
                    .setParameter("memberNo", String.valueOf(id))
                    .getSingleResult();
            return Optional.of(member);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public List<Member> findByCenterNo(int centerNo) {
        return em.createQuery(
                        "SELECT m FROM Member m WHERE m.center.centerNo = :centerNo AND m.memberType = :memberType",
                        Member.class)
                .setParameter("centerNo", centerNo)
                .setParameter("memberType", CommonEnums.MemberType.TEACHER)
                .getResultList();
    }

    //멤버 번호로 멤버 찾기
    @Override
    public Optional<Member> getByMemberNo(int member_no) {
        Member member = em.createQuery("SELECT m FROM Member m WHERE m.memberNo = :member_no", Member.class)
                .setParameter("member_no", member_no)
                .getSingleResult();
        return Optional.ofNullable(member);
    }

    //멤버번호와 반 번호로 반 수정(시설장)
    @Override
    public Optional<Member> updateClass(int member_no, int class_no) {
        String jpql = "UPDATE Member m SET m.classRoom.classNo = :class_no WHERE m.memberNo = :member_no";
        int updated = em.createQuery(jpql)
                .setParameter("class_no", class_no)
                .setParameter("member_no", member_no)
                .executeUpdate();
        // JPQL UPDATE는 반환값이 없음 → 다시 조회해서 Optional로 감싸야 함
        if (updated > 0) {
            Member member = em.createQuery(
                            "SELECT m FROM Member m WHERE m.memberNo = :member_no", Member.class)
                    .setParameter("member_no", member_no)
                    .getSingleResult();
            return Optional.of(member);
        } else {
            return Optional.empty();
        }
    }

    //시설과 멤버타입으로 멤버 불러오기
    @Override
    public List<Member> findMemberByCenter(int centerNo, CommonEnums.MemberType memberType) {
        return em.createQuery(
                        "SELECT m FROM Member m WHERE m.center.centerNo = :centerNo AND m.memberType = :type", Member.class)
                .setParameter("centerNo", centerNo)
                .setParameter("type", memberType)
                .getResultList();
    }

    //센터별 멤버 목록 조회
    @Override
    public List<Member> findAllByCenterNo(int centerNo) {
        return em.createQuery(
                "SELECT m FROM Member m WHERE m.center.centerNo =:centerNo", Member.class)
                .setParameter("centerNo", centerNo)
                .getResultList();
    }
}
