package com.bridge.kinder.repository;

import com.bridge.kinder.entity.MemberChild;

public interface MemberChildRepository {
    void save(MemberChild memberChild);
    int findByChildNo(int childNo);
}
