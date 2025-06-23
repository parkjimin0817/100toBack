package com.bridge.kinder.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberChildDto {
    private MemberDto.CreateMember member;
    private ChildDto.CreateChild child;
}
