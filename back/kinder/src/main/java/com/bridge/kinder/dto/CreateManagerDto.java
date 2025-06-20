package com.bridge.kinder.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateManagerDto {
    private MemberDto.CreateManager member;
    private CenterDto.Create center;
}
