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

    @Column(name = "CLASS_NAME", length = 20, nullable = false)
    private String className;

    @Column(name = "CAPACITY", nullable = false)
    private int capacity;

    @Column(name = "CLASS_IMAGE", length = 100)
    private String classImage;


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
