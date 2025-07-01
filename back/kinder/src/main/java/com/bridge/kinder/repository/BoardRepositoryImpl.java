package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Board;
import com.bridge.kinder.enums.CommonEnums;
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
        if (board.getBoardNo() == 0) {
            em.persist(board);
        } else {
            board = em.merge(board);
        }
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
}