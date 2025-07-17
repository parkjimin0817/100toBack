package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.BoardType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BoardRepositoryImpl implements BoardRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Board save(Board board) {
        em.persist(board);
        return board;
    }

    @Override
    public Optional<Board> findById(int boardNo) {
        return Optional.ofNullable(em.find(Board.class, boardNo));
    }

    @Override
    public List<Board> findAll() {
        return em.createQuery("SELECT b FROM Board b", Board.class)
                .getResultList();
    }

    @Override
    public void deleteById(int boardNo) {
        Board board = em.find(Board.class, boardNo);
        if (board != null) {
            em.remove(board);
        }
    }

    @Override
    public List<Board> findByType(CommonEnums.BoardType type, int centerNo, int offset, int limit) {
        String jpql = "SELECT b FROM Board b WHERE b.type = :type AND b.center.centerNo = :centerNo ORDER BY b.createDate DESC";
        return em.createQuery(jpql, Board.class)
                .setParameter("type", type)
                .setParameter("centerNo", centerNo)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }

    @Override
    public long countByType(CommonEnums.BoardType type, int centerNo) { // 해당 타입의 게시판의 게시물 수
        String jpql = "SELECT COUNT(b) FROM Board b WHERE b.type = :type AND b.center.centerNo = :centerNo";
        return em.createQuery(jpql, Long.class)
                .setParameter("type", type)
                .setParameter("centerNo", centerNo)
                .getSingleResult();
    }

    @Override
    public List<Board> getRecent3Boards(int centerNo, List<BoardType> types) {
        String jpql = "SELECT b FROM Board b " +
                "WHERE b.center.centerNo = :centerNo " +
                "AND b.type IN :types " +
                "ORDER BY b.createDate DESC";

        return em.createQuery(jpql, Board.class)
                .setParameter("centerNo", centerNo)
                .setParameter("types", types)
                .setMaxResults(3)
                .getResultList();
    }

    @Override
    public List<Board> findByMemberNoAndType(int memberNo, BoardType type) {
        String jpql =  "SELECT b FROM Board b " +
                "WHERE b.member.memberNo = :memberNo " +
                "AND b.type = :type " +
                "ORDER BY b.createDate DESC ";

        return em.createQuery(jpql, Board.class)
                .setParameter("memberNo", memberNo)
                .setParameter("type", type)
                .getResultList();
    }

    @Override
    public List<Board> findByClassNo(int classNo) {
        return em.createQuery(
                        "SELECT b FROM Board b WHERE b.classRoom.classNo = :classNo",
                        Board.class)
                .setParameter("classNo", classNo)
                .getResultList();
    }



    @Override
    public List<Board> findByMemberNoAndTypeOrderByViewedDate(int memberNo, BoardType type) {
        String jpql =  "SELECT b FROM Board b " +
                "WHERE b.member.memberNo = :memberNo " +
                "AND b.type = :type " +
                "ORDER BY b.viewedDate DESC ";

        return em.createQuery(jpql, Board.class)
                .setParameter("memberNo", memberNo)
                .setParameter("type", type)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Board> getNoteBoardsByMemberNo(BoardType type, int memberNo,int centerNo, int page, int size) {
        // ① memberNo → childNo
        String childJpql = "SELECT mc.child.childNo " +
                "FROM MemberChild mc " +
                "WHERE mc.member.memberNo = :memberNo";

        List<Integer> childNos = em.createQuery(childJpql, Integer.class)
                .setParameter("memberNo", memberNo)
                .getResultList();

        if (childNos.isEmpty()) {
            // 자녀가 없으면 빈 리스트 반환
            return Collections.emptyList();
        }

        // ② childNo → classNo
        String classJpql = "SELECT DISTINCT c.classRoom.classNo " +
                "FROM Child c " +
                "WHERE c.childNo IN :childNos";

        List<Integer> classNos = em.createQuery(classJpql, Integer.class)
                .setParameter("childNos", childNos)
                .getResultList();

        if (classNos.isEmpty()) {
            return Collections.emptyList();
        }

        // ③ Board 조회
        String boardJpql = "SELECT b " +
                "FROM Board b " +
                "WHERE b.type = :type " +
                "AND b.center.centerNo = :centerNo " +
                "AND b.classRoom.classNo IN :classNos " +
                "ORDER BY b.createDate DESC";

        return em.createQuery(boardJpql, Board.class)
                .setParameter("type", type)
                .setParameter("centerNo", centerNo)
                .setParameter("classNos", classNos)
                .setFirstResult(page)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public long countByTypeWithMemberNo(BoardType type, int centerNo, int memberNo) {
        // ① memberNo → childNos
        String childJpql = "SELECT mc.child.childNo FROM MemberChild mc WHERE mc.member.memberNo = :memberNo";

        List<Integer> childNos = em.createQuery(childJpql, Integer.class)
                .setParameter("memberNo", memberNo)
                .getResultList();

        if (childNos.isEmpty()) {
            return 0L;
        }

        // ② childNos → classNos
        String classJpql = "SELECT DISTINCT c.classRoom.classNo FROM Child c WHERE c.childNo IN :childNos";
        List<Integer> classNos = em.createQuery(classJpql, Integer.class)
                .setParameter("childNos", childNos)
                .getResultList();

        if (classNos.isEmpty()) {
            return 0L;
        }

        // ③ 해당 반(classNo)에 해당하는 게시글 수 카운트
        String countJpql = "SELECT COUNT(b) FROM Board b " +
                "WHERE b.type = :type " +
                "AND b.center.centerNo = :centerNo " +
                "AND b.classRoom.classNo IN :classNos";

        return em.createQuery(countJpql, Long.class)
                .setParameter("type", type)
                .setParameter("centerNo", centerNo)
                .setParameter("classNos", classNos)
                .getSingleResult();
    }

    @Override
    public List<Board> getNoteBoardsByClassNo(BoardType type, int classNo,int centerNo, int page, int size) {

        String boardJpql = "SELECT b " +
                "FROM Board b " +
                "WHERE b.type = :type " +
                "AND b.center.centerNo = :centerNo " +
                "AND b.classRoom.classNo = :classNo " +
                "ORDER BY b.createDate DESC";

        return em.createQuery(boardJpql, Board.class)
                .setParameter("type", type)
                .setParameter("centerNo", centerNo)
                .setParameter("classNo", classNo)
                .setFirstResult(page)
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public long countByTypeWithClassNo(BoardType type, int centerNo, int classNo) {

        String countJpql = "SELECT COUNT(b) FROM Board b " +
                "WHERE b.type = :type " +
                "AND b.center.centerNo = :centerNo " +
                "AND b.classRoom.classNo = :classNo";

        return em.createQuery(countJpql, Long.class)
                .setParameter("type", type)
                .setParameter("centerNo", centerNo)
                .setParameter("classNo", classNo)
                .getSingleResult();
    }

}