package com.bridge.kinder.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CLASS_ROOM")
public class ClassRoom {// 반

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CLASS_NO")
    private int classNo;
    //반 번호

    @Column(name = "CLASS_NAME", length = 20, nullable = false)
    private String className;
    //반 명

    @Column(name = "CAPACITY", nullable = false)
    private int capacity;
    //정원

    @Column(name = "CLASS_IMAGE", length = 100)
    private String classImage;
    //반 이미지

    @Column(name = "COLOR", length = 6)
    private String color;
    //반 테마 색


    //---------------------------------------------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "CENTER_NO")
    private Center center;
    //시설

    @OneToMany(mappedBy = "classRoom", cascade = CascadeType.ALL)
    @Builder.Default
    List<ChildAttendance> childAttendances = new ArrayList<>();
    //출석

    @OneToMany(mappedBy = "classRoom", cascade = CascadeType.ALL)
    @Builder.Default
    List<Board> boards = new ArrayList<>();
    //게시판

}
