package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CHILD_ATTENDANCE")
public class ChildAttendance {// 아동 출석체크

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHILD_ATTENDANCE_NO")
    private Long childAttendanceNo;
    //아동 출석체크 번호

    @Column(name = "CREATE_DATE", nullable = false)
    private LocalDate createDate;
    //생성일

    @Column(name = "STATUS", length = 20)
    @Enumerated(EnumType.STRING)
    private CommonEnums.ChildAttendanceStatus status;
    //출석 상태


    //---------------------------------------------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "CLASS_NO")
    private ClassRoom classRoom;
    //반

    @ManyToOne
    @JoinColumn(name = "CHILD_NO")
    private Child child;
    //아동


    //---------------------------------------------------------------------------------------------
//    @PrePersist
//    protected void onCreate() {
//        this.createDate = LocalDate.now();
//    }


    //---------------------------------------------------------------------------------------------
    public void updateAttendance(CommonEnums.ChildAttendanceStatus status){
        this.status = status;
    }
}
