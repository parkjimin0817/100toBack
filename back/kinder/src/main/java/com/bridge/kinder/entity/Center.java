package com.bridge.kinder.entity;

import com.bridge.kinder.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Getter
@Table(name = "CENTER")
public class Center {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CENTER_NO")
    private int centerNo;

    @Column(name = "CENTER_NAME", length = 50, nullable = false, unique = true)
    private String centerName;

    @Column(name = "CENTER_ADDRESS", length = 200, nullable = false)
    private String centerAddress;

    @Column(name = "CENTER_TYPE", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private CommonEnums.CenterType centerType;

    @Column(name = "CENTER_TEL", length = 40)
    private String centerTel;

}
