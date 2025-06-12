package com.bridge.kinder.enums;

public class CommonEnums {
    public enum CenterType {
        DAYCARE,        // 어린이집
        KINDERGARTEN,   // 유치원
        CHILD_CENTER    // 지역아동센터
    }

    public enum MemberType {
        DIRECTOR,       // 시설장
        TEACHER,        // 교사
        PARENT,         // 학부모
    }

    public enum AdmissionStatus {
        APPROVED,       //승인
        REJECTED,       //거절
        PENDING,        //대기
    }

    public enum ResignStatus {
        Resign,         //퇴직
        Working,        //재직
    }

    public enum VacationStatus {
        VACATED,        //휴가
        WORKATION,      //워케이션
    }
}
