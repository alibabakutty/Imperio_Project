package com.example.imperio.repository;

import com.example.imperio.entity.ProductMasterCreate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMasterDAO extends JpaRepository<ProductMasterCreate,String> {

    boolean existsByProductCode(String productCode);
}
