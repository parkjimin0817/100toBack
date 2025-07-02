package com.bridge.kinder.controller;

import com.bridge.kinder.dto.HolidayDto;
import com.bridge.kinder.dto.HolidayDto.Response;
import com.bridge.kinder.entity.Holiday;
import com.bridge.kinder.service.HolidayService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/holiday")
@RequiredArgsConstructor
public class HolidayController {

    private final HolidayService holidayService;

    @GetMapping
    public ResponseEntity<List<Response>> holiday(@RequestParam String year, @RequestParam String month) {
        return ResponseEntity.ok(holidayService.getHolidays(year, month));
    }
}
