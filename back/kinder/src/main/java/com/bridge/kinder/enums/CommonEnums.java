package com.bridge.kinder.enums;

public class CommonEnums {
    public enum CenterType {
        DAYCARE,        //어린이집
        KINDERGARTEN,   //유치원
        CHILD_CENTER    //지역아동센터
    }

    public enum MemberType {
        ADMIN,          //관리자
        MANAGER,       //시설장
        TEACHER,        //교사
        PARENT,         //학부모
    }

    public enum AdmissionStatus {
        APPROVED,       //승인
        REJECTED,       //거절
        PENDING,        //대기
    }

    public enum ResignStatus {
        RESIGN,         //퇴직
        WORKING,        //재직
    }

    public enum VacationType {
        VACATED,        //휴가
        WORKATION,      //워케이션
    }

    public enum RollType {
        CENTER,         //센터
        CLASSROOM,      //반
        MEMBER,         //멤버
        CHILD,          //아동
    }

    public enum ChildAttendanceStatus {
        PRESENT,        //출석
        ABSENT,         //결석
        HALF,           //부분 출석
    }

    public enum BoardType {
        NOTICE,         //공지사항
        LETTER_HOME,    //가정통신문
        NOTE,           //알림장
        PHOTO,          //사진
        PRIVATE_DOC,    //개인서류
        MEAL_PLAN,      //식단표
    }

    public enum BoardContentType {
        TEXT,           //텍스트
        FILE,           //파일(이미지)
    }
}
