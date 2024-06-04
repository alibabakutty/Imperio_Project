package com.example.imperio.service.impl;


import com.example.imperio.dto.DistributorMasterCreateDto;
import com.example.imperio.dto.ExecutiveMasterCreateDto;
import com.example.imperio.dto.ProductMasterCreateDto;
import com.example.imperio.dto.RegionMasterCreateDto;
import com.example.imperio.entity.DistributorMasterCreate;
import com.example.imperio.entity.ExecutiveMasterCreate;
import com.example.imperio.entity.ProductMasterCreate;
import com.example.imperio.entity.RegionMasterCreate;
import com.example.imperio.exception.ResourceNotFoundException;
import com.example.imperio.mapper.DistributorMasterCreateMapper;
import com.example.imperio.mapper.ExecutiveMasterCreateMapper;
import com.example.imperio.mapper.ProductMasterCreateMapper;
import com.example.imperio.mapper.RegionMasterCreateMapper;
import com.example.imperio.repository.DistributorMasterDAO;
import com.example.imperio.repository.ExecutiveMasterDAO;
import com.example.imperio.repository.ProductMasterDAO;
import com.example.imperio.repository.RegionMasterDAO;
import com.example.imperio.service.MasterCreateService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MasterCreateServiceImpl implements MasterCreateService {

    @Autowired
    private RegionMasterDAO regionMasterDAO;


    @Autowired
    private ExecutiveMasterDAO executiveMasterDAO;

    @Autowired
    private DistributorMasterDAO distributorMasterDAO;

    @Autowired
    private ProductMasterDAO productMasterDAO;

    @Override
    public RegionMasterCreateDto createRegionMaster(RegionMasterCreateDto regionMasterCreateDto){


        // Validate the region object
        validateRegionMaster(regionMasterCreateDto);


        // Check for duplicate entry
        if(regionMasterDAO.existsByRegionMasterId(regionMasterCreateDto.getRegionMasterId())){

            throw new DuplicateKeyException("Duplicate entry for unique field:" + regionMasterCreateDto.getRegionMasterId());

        }



        RegionMasterCreate regionMasterCreate = RegionMasterCreateMapper.mapToRegionMasterCreate(regionMasterCreateDto);

        RegionMasterCreate savedRegionMasterCreate = regionMasterDAO.save(regionMasterCreate);

        return RegionMasterCreateMapper.mapToRegionMasterCreateDto(savedRegionMasterCreate);
    }

    private void validateRegionMaster(RegionMasterCreateDto regionMasterCreateDto){

        if(regionMasterCreateDto.getRegionMasterId() == null || regionMasterCreateDto.getRegionMasterId().isEmpty()){

            throw new IllegalArgumentException("Unique field cannot be empty");
        }
    }


    @Override
    public RegionMasterCreateDto getRegionMaster(String regionMasterId){

        RegionMasterCreate regionMasterCreate = regionMasterDAO.findById(regionMasterId).orElseThrow(() ->
                new ResourceNotFoundException("Region is not found with this name:" + regionMasterId));

        return RegionMasterCreateMapper.mapToRegionMasterCreateDto(regionMasterCreate);
    }


    @Override
    public List<RegionMasterCreateDto> getAllRegionMasterIds(){

        List<RegionMasterCreate> regionMasterCreate = regionMasterDAO.findAll();
        return regionMasterCreate.stream().map(RegionMasterCreateMapper::mapToRegionMasterCreateDto).toList();
    }


    @Override
    public ExecutiveMasterCreateDto createExecutiveMaster(ExecutiveMasterCreateDto executiveMasterCreateDto){


        // Validate the executive object
        validateExecutiveMaster(executiveMasterCreateDto);

        // Check for duplicate entry
        if(executiveMasterDAO.existsByExecutiveCode(executiveMasterCreateDto.getExecutiveCode())){

            throw new DuplicateKeyException("Duplicate entry for unique field:" + executiveMasterCreateDto.getExecutiveCode());

        }


        ExecutiveMasterCreate executiveMasterCreate = ExecutiveMasterCreateMapper.mapToExecutiveMasterCreate(executiveMasterCreateDto);

        ExecutiveMasterCreate savedExecutiveMasterCreate = executiveMasterDAO.save(executiveMasterCreate);

        return ExecutiveMasterCreateMapper.mapToExecutiveMasterCreateDto(savedExecutiveMasterCreate);

    }


    private void validateExecutiveMaster(ExecutiveMasterCreateDto executiveMasterCreateDto){

        if(executiveMasterCreateDto.getExecutiveCode() == null || executiveMasterCreateDto.getExecutiveCode().isEmpty()){

            throw new IllegalArgumentException("Unique field cannot be empty");
        }
    }

    @Override
    public ExecutiveMasterCreateDto getExecutiveMaster(String executiveCode){

        ExecutiveMasterCreate executiveMasterCreate = executiveMasterDAO.findById(executiveCode).orElseThrow(() ->


                new ResourceNotFoundException("Executive is not found with this name:" + executiveCode));

        return ExecutiveMasterCreateMapper.mapToExecutiveMasterCreateDto(executiveMasterCreate);
    }

    @Override
    public List<ExecutiveMasterCreateDto> getAllExecutiveMasterCodes(){

        List<ExecutiveMasterCreate> executiveMasterCreate = executiveMasterDAO.findAll();

        return executiveMasterCreate.stream().map(ExecutiveMasterCreateMapper::mapToExecutiveMasterCreateDto).toList();
    }


    @Override
    public DistributorMasterCreateDto createDistributorMaster(DistributorMasterCreateDto distributorMasterCreateDto){


        // Validate the distributor object
        validateDistributorMaster(distributorMasterCreateDto);


        // Check for duplicate entry
        if(distributorMasterDAO.existsByDistributorCode(distributorMasterCreateDto.getDistributorCode())){

            throw new DuplicateKeyException("Duplicate entry for unique field:" + distributorMasterCreateDto.getDistributorCode());

        }

        DistributorMasterCreate distributorMasterCreate = DistributorMasterCreateMapper.mapToDistributorMasterCreate(distributorMasterCreateDto);

        DistributorMasterCreate savedDistributorMasterCreate = distributorMasterDAO.save(distributorMasterCreate);

        return DistributorMasterCreateMapper.mapToDistributorMasterCreateDto(savedDistributorMasterCreate);
    }


    private void validateDistributorMaster(DistributorMasterCreateDto distributorMasterCreateDto){

        if(distributorMasterCreateDto.getDistributorCode() == null || distributorMasterCreateDto.getDistributorCode().isEmpty()){

            throw new IllegalArgumentException("Unique field cannot be empty");
        }
    }


    @Override
    public DistributorMasterCreateDto getDistributorMaster(String distributorCode){

        DistributorMasterCreate distributorMasterCreate = distributorMasterDAO.findById(distributorCode).orElseThrow(() ->


                new ResourceNotFoundException("Distributor is not found with this name:" + distributorCode));

        return DistributorMasterCreateMapper.mapToDistributorMasterCreateDto(distributorMasterCreate);
    }

    @Override
    public List<DistributorMasterCreateDto> getAllDistributorMaterCodes(){

        List<DistributorMasterCreate> distributorMasterCreate = distributorMasterDAO.findAll();

        return distributorMasterCreate.stream().map(DistributorMasterCreateMapper::mapToDistributorMasterCreateDto).toList();

    }

    @Override
    public ProductMasterCreateDto createProductMaster(ProductMasterCreateDto productMasterCreateDto){

        // Validate the distributor object
        validateProductMaster(productMasterCreateDto);

        // Check for duplicate entry
        if (productMasterDAO.existsByProductCode(productMasterCreateDto.getProductCode())){

            throw new DuplicateKeyException("Duplicate entry for unique field:" + productMasterCreateDto.getProductCode());
        }


        ProductMasterCreate productMasterCreate = ProductMasterCreateMapper.mapToProductMasterCreate(productMasterCreateDto);

        ProductMasterCreate savedProductMasterCreate = productMasterDAO.save(productMasterCreate);

        return ProductMasterCreateMapper.mapToProductMasterCreateDto(savedProductMasterCreate);

    }


    private void validateProductMaster(ProductMasterCreateDto productMasterCreateDto){

        if(productMasterCreateDto.getProductCode() == null || productMasterCreateDto.getProductCode().isEmpty()){

            throw new IllegalArgumentException("Unique field cannot be empty");

        }
    }


    @Override
    public ProductMasterCreateDto getProductMaster(String productCode){

        ProductMasterCreate productMasterCreate = productMasterDAO.findById(productCode).orElseThrow(()->
                new ResourceNotFoundException("Product is not found with this name:" + productCode));

        return ProductMasterCreateMapper.mapToProductMasterCreateDto(productMasterCreate);
    }

    @Override
    public List<ProductMasterCreateDto> getAllProductMasterCodes(){

        List<ProductMasterCreate> productMasterCreate = productMasterDAO.findAll();

        return productMasterCreate.stream().map(ProductMasterCreateMapper::mapToProductMasterCreateDto).toList();

    }


    @Override
    public RegionMasterCreateDto updateRegion(String regionMasterId, RegionMasterCreateDto updatedRegion){

        RegionMasterCreate regionMasterCreate = regionMasterDAO.findById(regionMasterId).orElseThrow(() ->

                new ResourceNotFoundException("Region is not found with the given name: " + regionMasterId));

        regionMasterCreate.setRegionMasterId(updatedRegion.getRegionMasterId());
        regionMasterCreate.setRegionName(updatedRegion.getRegionName());
        regionMasterCreate.setRegionState(updatedRegion.getRegionState());
        regionMasterCreate.setCountry(updatedRegion.getCountry());

        RegionMasterCreate regionMasterCreateObj = regionMasterDAO.save(regionMasterCreate);

        return RegionMasterCreateMapper.mapToRegionMasterCreateDto(regionMasterCreateObj);

    }

    @Override
    public ExecutiveMasterCreateDto updateExecutive(String executiveCode, ExecutiveMasterCreateDto updatedExecutive){

        ExecutiveMasterCreate executiveMasterCreate = executiveMasterDAO.findById(executiveCode).orElseThrow(() ->

                new ResourceNotFoundException("Executive is not found with the given name: " + executiveCode));

        executiveMasterCreate.setExecutiveCode(updatedExecutive.getExecutiveCode());
        executiveMasterCreate.setExecutiveMaster(updatedExecutive.getExecutiveMaster());
        executiveMasterCreate.setDateOfJoin(updatedExecutive.getDateOfJoin());
        executiveMasterCreate.setMobileNo(updatedExecutive.getMobileNo());
        executiveMasterCreate.setEmailId(updatedExecutive.getEmailId());
        executiveMasterCreate.setStatus(updatedExecutive.getStatus());

        ExecutiveMasterCreate executiveMasterCreateObj = executiveMasterDAO.save(executiveMasterCreate);

        return ExecutiveMasterCreateMapper.mapToExecutiveMasterCreateDto(executiveMasterCreateObj);
    }

    @Override
    public DistributorMasterCreateDto updateDistributor(String distributorCode, DistributorMasterCreateDto updatedDistributor){

        DistributorMasterCreate distributorMasterCreate = distributorMasterDAO.findById(distributorCode).orElseThrow(() ->

                new ResourceNotFoundException("Distributor is not found with this given name:" + distributorCode));


        distributorMasterCreate.setDistributorCode(updatedDistributor.getDistributorCode());
        distributorMasterCreate.setDistributorCompanyName(updatedDistributor.getDistributorCompanyName());
        distributorMasterCreate.setDistributorOwnerName(updatedDistributor.getDistributorOwnerName());
        distributorMasterCreate.setMobileNo(updatedDistributor.getMobileNo());
        distributorMasterCreate.setExecutiveCode(updatedDistributor.getExecutiveCode());
        distributorMasterCreate.setExecutiveMaster(updatedDistributor.getExecutiveMaster());
        distributorMasterCreate.setRegionCode(updatedDistributor.getRegionCode());
        distributorMasterCreate.setRegionMaster(updatedDistributor.getRegionMaster());
        distributorMasterCreate.setContactPersonName(updatedDistributor.getContactPersonName());
        distributorMasterCreate.setContactMobileNo(updatedDistributor.getContactMobileNo());


        DistributorMasterCreate distributorMasterCreateObj = distributorMasterDAO.save(distributorMasterCreate);

        return DistributorMasterCreateMapper.mapToDistributorMasterCreateDto(distributorMasterCreateObj);

    }


    @Override
    public ProductMasterCreateDto updateProduct(String productCode, ProductMasterCreateDto updatedProduct){

        ProductMasterCreate productMasterCreate = productMasterDAO.findById(productCode).orElseThrow(() ->


                new ResourceNotFoundException("Product is not found with the given name:" + productCode));


        productMasterCreate.setProductCode(updatedProduct.getProductCode());
        productMasterCreate.setProductDescription(updatedProduct.getProductDescription());
        productMasterCreate.setProductCategory(updatedProduct.getProductCategory());
        productMasterCreate.setProductUom(updatedProduct.getProductUom());

        ProductMasterCreate productMasterCreateObj = productMasterDAO.save(productMasterCreate);

        return ProductMasterCreateMapper.mapToProductMasterCreateDto(productMasterCreateObj);


    }

    @Override
    public void deleteRegion(String regionMasterId){

        RegionMasterCreate regionMasterCreate = regionMasterDAO.findById(regionMasterId).orElseThrow(() ->

                new ResourceNotFoundException("Region is not exists with the given name: " + regionMasterId));

        regionMasterDAO.deleteById(regionMasterId);
    }

    @Override
    public void deleteExecutive(String executiveCode){

        ExecutiveMasterCreate executiveMasterCreate = executiveMasterDAO.findById(executiveCode).orElseThrow(() ->

                new ResourceNotFoundException("Executive is not exists with this given name: " + executiveCode));

        executiveMasterDAO.deleteById(executiveCode);
    }

    @Override
    public void deleteDistributor(String distributorCode){

        DistributorMasterCreate distributorMasterCreate = distributorMasterDAO.findById(distributorCode).orElseThrow(() ->

                new ResourceNotFoundException("Distributor is not exists with this given name: " + distributorCode));

        distributorMasterDAO.deleteById(distributorCode);

    }

    @Override
    public void deleteProduct(String productCode){

        ProductMasterCreate productMasterCreate = productMasterDAO.findById(productCode).orElseThrow(() ->

                new ResourceNotFoundException("Product is not exists with this given name: " + productCode));

        productMasterDAO.deleteById(productCode);

    }



}
