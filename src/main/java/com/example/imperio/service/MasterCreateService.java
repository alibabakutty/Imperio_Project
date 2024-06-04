package com.example.imperio.service;

import com.example.imperio.dto.DistributorMasterCreateDto;
import com.example.imperio.dto.ExecutiveMasterCreateDto;
import com.example.imperio.dto.ProductMasterCreateDto;
import com.example.imperio.dto.RegionMasterCreateDto;

import java.util.List;

public interface MasterCreateService {


    RegionMasterCreateDto createRegionMaster(RegionMasterCreateDto regionMasterCreateDto);



    ExecutiveMasterCreateDto createExecutiveMaster(ExecutiveMasterCreateDto executiveMasterCreateDto);


    DistributorMasterCreateDto createDistributorMaster(DistributorMasterCreateDto distributorMasterCreateDto);


    ProductMasterCreateDto createProductMaster(ProductMasterCreateDto productMasterCreateDto);


    RegionMasterCreateDto getRegionMaster(String regionMasterId);

    List<RegionMasterCreateDto> getAllRegionMasterIds();


    ExecutiveMasterCreateDto getExecutiveMaster(String executiveCode);

    List<ExecutiveMasterCreateDto> getAllExecutiveMasterCodes();


    DistributorMasterCreateDto getDistributorMaster(String distributorCode);

    List<DistributorMasterCreateDto> getAllDistributorMaterCodes();


    ProductMasterCreateDto getProductMaster(String productCode);

    List<ProductMasterCreateDto> getAllProductMasterCodes();

    RegionMasterCreateDto updateRegion(String regionMasterId, RegionMasterCreateDto updatedRegion);

    ExecutiveMasterCreateDto updateExecutive(String executiveCode, ExecutiveMasterCreateDto updatedExecutive);

    DistributorMasterCreateDto updateDistributor(String distributorCode, DistributorMasterCreateDto updatedDistributor);

    ProductMasterCreateDto updateProduct(String productCode, ProductMasterCreateDto updatedProduct);

    void deleteRegion(String regionMasterId);

    void deleteExecutive(String executiveCode);

    void deleteDistributor(String distributorCode);

    void deleteProduct(String productCode);
}
