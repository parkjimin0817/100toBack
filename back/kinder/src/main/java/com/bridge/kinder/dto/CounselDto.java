package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.Counsel;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import com.bridge.kinder.enums.CommonEnums.CounselStatus;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CounselDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateDto {
        private CommonEnums.CounselType counselType;
        private LocalDate counselDate;
        private LocalTime counselStart;
        private LocalTime counselEnd;

        private int centerNo;
        private int memberNo;
        private int childNo;

        public Counsel toEntity(Center center, Member member, Child child) {
            return Counsel.builder()
                    .counselType(counselType)
                    .counselDate(counselDate)
                    .counselStart(counselStart)
                    .counselEnd(counselEnd)
                    .center(center)
                    .member(member)
                    .child(child)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private int counsel_no;
        private String child_name;
        private CommonEnums.CounselType counsel_type;
        private LocalTime counsel_start;
        private LocalTime counsel_end;
        private LocalDate counsel_date;
        private CounselStatus counsel_status;


        public static Response toEntity(Counsel counsel) {
            return Response.builder()
                    .counsel_no(counsel.getCounselNo())
                    .child_name(counsel.getChild().getChildName())
                    .counsel_type(counsel.getCounselType())
                    .counsel_start(counsel.getCounselStart())
                    .counsel_end(counsel.getCounselEnd())
                    .counsel_date(counsel.getCounselDate())
                    .counsel_status(counsel.getCounselStatus())
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Update{
        private CommonEnums.CounselType counsel_type;
        private LocalTime counsel_start;
        private LocalTime counsel_end;
        private LocalDate counsel_date;
        private CounselStatus counsel_status;

        public static Update toDto(Counsel counsel) {
            return Update.builder()
                    .counsel_type(counsel.getCounselType())
                    .counsel_start(counsel.getCounselStart())
                    .counsel_end(counsel.getCounselEnd())
                    .counsel_date(counsel.getCounselDate())
                    .counsel_status(counsel.getCounselStatus())
                    .build();
        }
    }
}
