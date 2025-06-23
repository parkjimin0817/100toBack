package com.bridge.kinder.dto;

import com.bridge.kinder.entity.Center;
import com.bridge.kinder.entity.Child;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
}
