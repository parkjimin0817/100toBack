package com.bridge.kinder.service;

import com.bridge.kinder.dto.HolidayDto;
import com.bridge.kinder.dto.HolidayDto.Response;
import com.bridge.kinder.entity.Holiday;
import com.bridge.kinder.repository.HolidayRepository;
import jakarta.annotation.PostConstruct;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

@Slf4j
@Service
@RequiredArgsConstructor
public class HolidayService {

    private final HolidayRepository holidayRepository;

    @Value("${holiday.api.key}")
    private String serviceKey;

    //공휴일 가져와서 저장
    public void fetchAndSaveHolidays(int year, int month) {
        try{
            String baseUrl = "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
            StringBuilder urlBuilder = new StringBuilder(baseUrl);
            urlBuilder.append("?ServiceKey=").append(serviceKey);
            urlBuilder.append("&solYear=").append(year); //연도
            urlBuilder.append("&solMonth=").append(String.format("%02d", month)); //월
            urlBuilder.append("&_type=xml"); //응답 타입 : xml

            URL url = new URL(urlBuilder.toString());

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            DocumentBuilder dBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            Document doc = dBuilder.parse(conn.getInputStream());

            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("item");

            for (int i = 0; i <nList.getLength(); i++) {
                Node nNode = nList.item(i);

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) nNode;

                    String isHoliday = getTagValue("isHoliday", element); // Y만 저장
                    String locdate =getTagValue("locdate", element); //20250129
                    String dateName = getTagValue("dateName", element); // 설날

                    if ("Y".equals(isHoliday) && locdate != null && dateName != null) {
                        LocalDate holidayDate = LocalDate.parse(locdate, DateTimeFormatter.ofPattern("yyyyMMdd"));

                        holidayRepository.findByHolidayDate(holidayDate)
                                .ifPresentOrElse(
                                        existing -> {
                                            if (!existing.getHolidayName().equals(dateName)) {
                                                existing.changeHolidayName(dateName);
                                                holidayRepository.save(existing);
                                            }
                                        },
                                        () -> {
                                            Holiday holiday = Holiday.builder()
                                                    .holidayDate(holidayDate)
                                                    .holidayName(dateName)
                                                    .build();
                                            holidayRepository.save(holiday);
                                        }
                                );
                    }
                }
            }

            conn.disconnect();
        } catch (Exception e) {
            log.error("공휴일 API 호출 중 오류 발생", e);
        }
    }

    //년도별 공휴일
    public void fetchAndSaveHolidaysForYear(int year) {
        for (int month = 1; month <= 12; month++) {
            fetchAndSaveHolidays(year, month);
        }
    }

    //2년치 공휴일
    public void fetchAndSaveTwoYears() {
        int currentYear = LocalDate.now().getYear();
        for(int year = currentYear; year <= currentYear+1; year++){
            for(int month = 1; month <= 12; month++){
                fetchAndSaveHolidays(year, month);
            }
        }
    }

    //최초 서버 실행 시 수동으로 불러오기
    @PostConstruct
    public void init() {
        int currentYear = LocalDate.now().getYear();

        long totalCount = holidayRepository.countByHolidayDateBetween(
                LocalDate.of(currentYear, 1, 1),
                LocalDate.of(currentYear + 1, 12, 31)
        );

        if (totalCount < 20) {
            log.info("공휴일 데이터가 부족하여 2년치 새로 불러옵니다.");
            fetchAndSaveTwoYears();
        } else {
            log.info("공휴일 데이터가 충분하여 API 호출 생략.");
        }
    }

    // 매년 1월 1일 새벽 3시 강제 업데이트
    @Scheduled(cron = "0 0 3 1 1 *")
    public void refreshHolidayData() {
        log.info("매년 1월 1일: 공휴일 데이터 강제 갱신 시작");
        fetchAndSaveTwoYears();
    }


    private static String getTagValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag);
        if (nodeList.getLength() > 0 && nodeList.item(0).getFirstChild() != null) {
            return nodeList.item(0).getFirstChild().getNodeValue();
        }
        return null;
    }

    //공휴일 불러와서 프론트 전달해주기
    public List<Response> getHolidays (String year, String month){
        int yearInt = Integer.parseInt(year);
        int monthInt = Integer.parseInt(month);

        LocalDate startDate = LocalDate.of(yearInt, monthInt, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Holiday> holidays = holidayRepository.findByHolidayDateBetween(startDate, endDate);

        return holidays.stream()
                .map(h-> new Response(h.getHolidayDate(), h.getHolidayName()))
                .collect(Collectors.toList());
    }

}

