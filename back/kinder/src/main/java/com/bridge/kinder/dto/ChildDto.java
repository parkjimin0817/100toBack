package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
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


//    @Getter
//    @Setter
//    @AllArgsConstructor
//    @NoArgsConstructor
//    @Builder
//    public static class Response {
//        private int child_no;
//        private String child_name;
//        private String child_resident_no;
//        private String f_parents_name;
//        private String f_parents_phone;
//        private String m_parents_name;
//        private String m_parents_phone;
//        private MultipartFile child_profile;
//
//        private int member_no;
//        private int center_no;
//        private int class_no;
//
//        public Response toDto(Child child) {
//            return Response.builder()
//                    .child_no(child.getChildNo())
//                    .child_name(child.getChildName())
//                    .child_resident_no(child.getChildResidentNo())
//                    .f_parents_name(child.getFParentsName())
//                    .f_parents_phone(child.getFParentsPhone())
//                    .m_parents_name(child.getMParentsName())
//                    .m_parents_phone(child.getMParentsPhone())
//                    .child_profile(child_profile)
//                    .member_no(member_no)
//                    .center_no(center_no)
//                    .class_no(class_no)
//                    .build();
//        }
//
//    }

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
        private String child_name;
        private String class_name;

        public static childListResponse toDto(Child child){
            return childListResponse.builder()
                    .child_name(child.getChildName())
                    .class_name(child.getClassRoom().getClassName())
                    .build();
        }
    }
}
