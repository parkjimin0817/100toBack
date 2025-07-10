package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.BoardType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
}