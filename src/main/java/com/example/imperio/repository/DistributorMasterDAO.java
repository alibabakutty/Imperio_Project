package com.example.imperio.repository;

import com.example.imperio.entity.DistributorMasterCreate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistributorMasterDAO extends JpaRepository<DistributorMasterCreate,String> {

    boolean existsByDistributorCode(String distributorCode);
}
