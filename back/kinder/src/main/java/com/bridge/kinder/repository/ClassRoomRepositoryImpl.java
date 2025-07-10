package com.bridge.kinder.repository;

import com.bridge.kinder.dto.ClassRoomDto;
import com.bridge.kinder.dto.ClassRoomDto.Update;
import com.bridge.kinder.entity.Board;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.ClassRoom;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Schedule;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ClassRoomRepositoryImpl implements ClassRoomRepository {

    @PersistenceContext
    private final EntityManager em;

    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;


    //반 생성하기
    @Override
    public void save(ClassRoom classRoom) { em.persist(classRoom); }

    //시설 별 반 목록
    @Override
    public List<ClassRoom> findByCenterNo(int centerNo) {
        return em.createQuery("select c from ClassRoom c where c.center.centerNo =:centerNo", ClassRoom.class)
                .setParameter("centerNo", centerNo)
                .getResultList();
    }

    //반 번호로 조회
    @Override
    public Optional<ClassRoom> findByClassNo(int classNo) {
        return Optional.ofNullable(em.find(ClassRoom.class, classNo));
    }

    @Override
    public Optional<ClassRoom> findById(int classRoomNo) {
        return Optional.ofNullable(em.find(ClassRoom.class, classRoomNo));
    }

    @Override
    public Optional<ClassRoom> updateClass(ClassRoomDto.Update dto, int classNo) {
        ClassRoom classRoom = em.find(ClassRoom.class, classNo);
        if (classRoom == null) return Optional.empty();

        classRoom.changeClassName(dto.getClass_name());
        classRoom.changeCapacity(dto.getCapacity());
        classRoom.changeColor(dto.getColor());
        classRoom.changeClassImage(dto.getClass_image());

        return Optional.of(classRoom);
    }

    @Override
    public int deleteClass(int classNo) {
        ClassRoom classRoom = em.find(ClassRoom.class, classNo);

        if (classRoom == null) {
            throw new EntityNotFoundException("해당 반이 존재하지 않습니다. classNo=" + classNo);
        }

        List<Schedule> schedules = scheduleRepository.findByClassNo(classNo);
        for (Schedule schedule : schedules) {
            em.remove(schedule); // 또는 schedule.setClassRoom(null); 후 저장
        }

        Member member = memberRepository.findTeacherByClassNo(classNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 반의 교사를 찾을 수 없습니다."));

        member.changeClassRoom(null);


        List<Child> childs = childRepository.findByClassNo(classNo);

        for (Child child : childs) {
            child.setClassRoom(null);
        }

        classRoom.getChildAttendances().size(); //  출석 데이터 가져와서 영속화
        classRoom.getBoards().size(); // 게시판 데이터 가져와서 영속화

        em.remove(classRoom);

        return classNo;
    }


}
