package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Member;
import com.bridge.kinder.entity.Vacation;
import com.bridge.kinder.enums.CommonEnums;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


public class VacationDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private CommonEnums.VacationType type;
        private String type_detail;
        private LocalDate start_date;
        private LocalDate end_date;
        private String reason;
        private String attachment;
        private String attachment_origin;

        public Vacation toEntity(Member member) {
            return Vacation.builder()
                    .member(member)
                    .type(type)
                    .typeDetail(type_detail)
                    .startDate(start_date)
                    .endDate(end_date)
                    .reason(reason)
                    .attachment(attachment)
                    .attachmentOrigin(attachment_origin)
                    .build();
        }
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private int vacation_no;
        private CommonEnums.VacationType type;
        private String type_detail;
        private LocalDate start_date;
        private LocalDate end_date;
        private String reason;
        private String attachment;
        private String attachment_origin;
        private CommonEnums.AdmissionStatus status;
        private LocalDate create_date;
        private LocalDate decision_date;
        private int member_no;
        private String member_name;

        public static Response toDto(Vacation vacation, Member member) {
            return Response.builder()
                    .vacation_no(vacation.getVacationNo())
                    .type(vacation.getType())
                    .type_detail(vacation.getTypeDetail())
                    .start_date(vacation.getStartDate())
                    .end_date(vacation.getEndDate())
                    .reason(vacation.getReason())
                    .attachment(vacation.getAttachment())
                    .attachment_origin(vacation.getAttachmentOrigin())
                    .status(vacation.getStatus())
                    .create_date(vacation.getCreateDate().toLocalDate())
                    .decision_date(
                            vacation.getDecisionDate() != null
                                    ? vacation.getDecisionDate().toLocalDate()
                                    : null
                    )
                    .member_no(member.getMemberNo())
                    .member_name(member.getMemberName())
                    .build();
        }

    }

}
