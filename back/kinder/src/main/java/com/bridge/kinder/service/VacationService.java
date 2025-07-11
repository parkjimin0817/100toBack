package com.bridge.kinder.service;

import com.bridge.kinder.dto.VacationDto;
import com.bridge.kinder.dto.VacationDto.Response;
import java.io.IOException;
import java.lang.reflect.ReflectPermission;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VacationService {
    VacationDto.Response requestVacation (String memberId, VacationDto.Request request);
    List<Response> getVacationsByMember (int memberNo);
    void deleteVacation (long VacationNo);
    Page<Response> getVacationListPaged(int centerNo, String type, Pageable pageable);
    Response approveVacation (long VacationNo);
    Response rejectVacation (long VacationNo);

}
