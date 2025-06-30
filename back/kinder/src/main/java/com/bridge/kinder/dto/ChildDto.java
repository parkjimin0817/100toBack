package com.bridge.kinder.dto;

import com.bridge.kinder.dto.ChildDto.activity;
import com.bridge.kinder.dto.ChildDto.health;
import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.ChildActivityData;
import com.bridge.kinder.entity.ChildActivityLog;
import com.bridge.kinder.entity.ChildAttendance;
import com.bridge.kinder.entity.ChildHealthData;
import com.bridge.kinder.entity.ChildHealthLog;
import com.bridge.kinder.entity.Member;
import com.bridge.kinder.enums.CommonEnums;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

public class ChildDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateChild {
        private String child_name;
        private String child_resident_no;
        private String f_parents_name;
        private String f_parents_phone;
        private String m_parents_name;
        private String m_parents_phone;
        private MultipartFile child_profile;
        

        private int member_no;
        private int center_no;

        public Child toEntity(Center center, String profilePath) {
            return Child.builder()
                    .childName(child_name)
                    .childResidentNo(child_resident_no)
                    .fParentsName(f_parents_name)
                    .fParentsPhone(f_parents_phone)
                    .mParentsName(m_parents_name)
                    .mParentsPhone(m_parents_phone)
                    .childProfile(profilePath)
                    .center(center)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LinkChildRequest {
        private int member_no;
        private String child_name;
        private String child_resident_no;
    }
    

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private int child_no;
        private String child_name;

        private int class_no;

        public static Response toDto(Child child){
            return Response.builder()
                    .child_no(child.getChildNo())
                    .child_name(child.getChildName())
                    .class_no(child.getClassRoom().getClassNo())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class childListResponse {
        private int child_no;
        private String child_name;
        private String class_name;

        public static childListResponse toDto(Child child){
            return childListResponse.builder()
                    .child_no(child.getChildNo())
                    .child_name(child.getChildName())
                    .class_name(
                            child.getClassRoom() != null
                                    ? child.getClassRoom().getClassName()
                                    : "미배정"
                    )
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class modalResponse {
        private String class_name;
        private String child_name;
        private LocalDateTime create_date;
        private String child_birth;
        private String mother_name;
        private String father_name;
        private String mother_phone;
        private String father_phone;

        public static modalResponse toDto(Child child){
            return modalResponse.builder()
                    .class_name(
                            child.getClassRoom() != null
                                    ? child.getClassRoom().getClassName()
                                    : "미배정"
                    )
                    .child_name(child.getChildName())
                    .create_date(child.getCreateDate())
                    .child_birth(child.getChildResidentNo().substring(0, 6))
                    .mother_name(child.getMParentsName())
                    .father_name(child.getFParentsName())
                    .mother_phone(child.getMParentsPhone())
                    .father_phone(child.getFParentsPhone())
                    .build();
        }

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class updateClass {
        private int child_no;
        private String child_name;
        private String class_name;

        public static updateClass toDto(Child child){
            return updateClass.builder()
                    .child_no(child.getChildNo())
                    .child_name(child.getChildName())
                    .class_name(
                            child.getClassRoom() != null
                                    ? child.getClassRoom().getClassName()
                                    : "미배정"
                    )
                    .build();
        }
    }

    //아동 개인의 건강 로그 데이터(매일 체크하는 데이터)
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class healthLog {
        private LocalDateTime create_date; // 로그 생성일
        private BigDecimal temperature; // 체온
        private BigDecimal height;
        private BigDecimal weight;
        private String symptoms;
        private String healthLogMemo;
        private String child_name;

        public static healthLog toDto(ChildHealthLog log){
            return healthLog.builder()
                    .create_date(log.getCreateDate())
                    .temperature(log.getTemperature())
                    .height(log.getHeight())
                    .weight(log.getWeight())
                    .symptoms(log.getSymptoms())
                    .healthLogMemo(log.getHealthLogMemo())
                    .child_name(log.getChild().getChildName())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class health {
        private String medication_name;
        private String medication_amount;
        private String medication_time;
        private String medication_period;
        private String medication_purpose;
        private String medication_memo;
        private String vaccination;
        private String allergy;
        private String allergy_reaction;
        private String allergy_severity;
        private String allergy_memo;

        public static health toDto(ChildHealthData healthData){
            if (healthData == null) {
                return ChildDto.health.builder().build(); // 또는 기본값 설정도 가능
            }

            return health.builder()
                    .medication_name(healthData.getMedicationName())
                    .medication_amount(healthData.getMedicationAmount())
                    .medication_time(healthData.getMedicationTime())
                    .medication_period(healthData.getMedicationPeriod())
                    .medication_purpose(healthData.getMedicationPurpose())
                    .medication_memo(healthData.getMedicationMemo())
                    .vaccination(healthData.getVaccination())
                    .allergy(healthData.getAllergy())
                    .allergy_reaction(healthData.getAllergyReaction())
                    .allergy_severity(healthData.getAllergySeverity())
                    .allergy_memo(healthData.getAllergyMemo())
                    .build();
        }



    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class activityLog {
        private LocalDateTime create_date;
        private String dailyMeal_amount;
        private LocalTime napStart_time;
        private LocalTime napEnd_time;
        private String play_participation;
        private String daily_friendship;
        private String activity_log_memo;
        private String child_name;

        public static activityLog toDto(ChildActivityLog activitylog){
            return activityLog.builder()
                    .create_date(activitylog.getCreateDate())
                    .dailyMeal_amount(activitylog.getDailyMealAmount())
                    .napStart_time(activitylog.getNapStartTime())
                    .napEnd_time(activitylog.getNapEndTime())
                    .play_participation(activitylog.getPlayParticipation())
                    .daily_friendship(activitylog.getDailyFriendship())
                    .activity_log_memo(activitylog.getActivityLogMemo())
                    .child_name(activitylog.getChild().getChildName())
                    .build();
        }

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class activity {
        private String like_food;
        private String dislike_food;
        private String meal_amount;
        private String meal_memo;
        private String close_friend;
        private String like_play;
        private String friend_memo;

        public static activity toDto(ChildActivityData activityData){
            if (activityData == null) {
                return activity.builder().build(); // 또는 기본값 채워도 됨
            }

            return activity.builder()
                    .like_food(activityData.getLikeFood())
                    .dislike_food(activityData.getDislikeFood())
                    .meal_amount(activityData.getMealAmount())
                    .meal_memo(activityData.getMealMemo())
                    .close_friend(activityData.getCloseFriend())
                    .like_play(activityData.getLikePlay())
                    .friend_memo(activityData.getFriendMemo())
                    .build();
        }

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class attendance {
        private LocalDate create_date;
        private CommonEnums.ChildAttendanceStatus status;

        public static attendance toDto(ChildAttendance attend){
            return attendance.builder()
                    .create_date(attend.getCreateDate())
                    .status(attend.getStatus())
                    .build();

        }

    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class detail {
        private List<ChildDto.healthLog> healthLogs;
        private ChildDto.health health;
        private List<ChildDto.activityLog> activityLogs;
        private ChildDto.activity activity;
        private List<ChildDto.attendance> attendanceLogs;
        private String child_name;
        private String child_birthday;
        private String class_name;
        private String mother_name;
        private String mother_phone;
        private String father_name;
        private String father_phone;
        private BigDecimal child_height;
        private BigDecimal child_weight;
        private String child_address;

        public static detail toDto(
                List<ChildHealthLog> healthLogs,
                ChildHealthData health,
                List<ChildActivityLog> activityLogs,
                ChildActivityData activity,
                List<ChildAttendance> attendances,
                Child child,
                ChildHealthLog physicalInfo,
                Member member
        ) {
            return detail.builder()
                    .healthLogs(
                            healthLogs.stream()
                                    .map(healthLog::toDto)
                                    .collect(Collectors.toList())
                    )
                    .health(ChildDto.health.toDto(health))
                    .activityLogs(
                            activityLogs.stream()
                                    .map(activityLog::toDto)
                                    .collect(Collectors.toList())
                    )
                    .activity(ChildDto.activity.toDto(activity))
                    .attendanceLogs(
                            attendances.stream()
                                    .map(attendance::toDto)
                                    .collect(Collectors.toList())
                    )
                    .child_name(modalResponse.toDto(child).getChild_name())
                    .child_birthday(modalResponse.toDto(child).getChild_birth())
                    .class_name(modalResponse.toDto(child).getClass_name())
                    .mother_name(modalResponse.toDto(child).getMother_name())
                    .mother_phone(modalResponse.toDto(child).getMother_phone())
                    .father_name(modalResponse.toDto(child).getFather_name())
                    .father_phone(modalResponse.toDto(child).getFather_phone())
                    .child_height(physicalInfo != null ? physicalInfo.getHeight() : null)
                    .child_weight(physicalInfo != null ? physicalInfo.getWeight() : null)
                    .child_address(member.getAddress())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class myPageChilds {
        private int child_no;
        private String child_name;
        private String child_resident_no;
        private String child_profile;

        public static myPageChilds toDto(Child child){
            return myPageChilds.builder()
                    .child_no(child.getChildNo())
                    .child_name(child.getChildName())
                    .child_resident_no(child.getChildResidentNo())
                    .child_profile(child.getChildProfile())
                    .build();

        }

    }

}
