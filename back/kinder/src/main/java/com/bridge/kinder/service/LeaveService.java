package com.bridge.kinder.service;

import com.bridge.kinder.dto.LeaveDto;
import com.bridge.kinder.entity.Leave;

public interface LeaveService {
    LeaveDto.Response getLeaveByMemberNo(int memberNo);
}
