package com.bridge.kinder.service;

import com.bridge.kinder.dto.VacationDto;
import com.bridge.kinder.dto.VacationDto.Response;
import java.io.IOException;
import java.util.List;

public interface VacationService {
    VacationDto.Response requestVacation (int memberNo, VacationDto.Request request) throws IOException;
    List<Response> getVacationsByMember (int memberNo);
    void deleteVacation (long VacationNo);
    List<Response> getVacationsByCenter(int centerNo);

}
