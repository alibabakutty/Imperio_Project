package com.example.imperio.repository;

import com.example.imperio.entity.ExecutiveMasterCreate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutiveMasterDAO extends JpaRepository<ExecutiveMasterCreate, String> {

    boolean existsByExecutiveCode(String executiveCode);
}
