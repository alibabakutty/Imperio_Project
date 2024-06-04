package com.example.imperio.repository;

import com.example.imperio.entity.RegionMasterCreate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionMasterDAO extends JpaRepository<RegionMasterCreate,String> {
   boolean existsByRegionMasterId(String regionMasterId);
}
