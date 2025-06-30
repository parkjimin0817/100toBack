package com.bridge.kinder.repository;

import com.bridge.kinder.entity.Child;
import com.bridge.kinder.entity.MemberChild;
import java.util.List;

public interface MemberChildRepository {
    void save(MemberChild memberChild);
    int findByChildNo(int childNo);
}
