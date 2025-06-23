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
    private MemberDto.CreateMember member;
    private CenterDto.Create center;
}
