package com.bridge.kinder.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Table(name = "HOLIDAY")
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HOLIDAY_NO")
    private Long holidayNo;

    @Column(name ="HOLIDAY_DATE", nullable = false)
    private LocalDate holidayDate;
    //공휴일 날짜

    @Column(name = "HOLIDAY_NAME", nullable = false)
    private String holidayName;
    //공휴일 이름

}
