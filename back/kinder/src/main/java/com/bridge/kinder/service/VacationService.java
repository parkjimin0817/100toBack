package com.bridge.kinder.service;

import com.bridge.kinder.dto.VacationDto;
import java.io.IOException;

public interface VacationService {
    VacationDto.Response requestVacation (int memberNo, VacationDto.Request request) throws IOException;


}
