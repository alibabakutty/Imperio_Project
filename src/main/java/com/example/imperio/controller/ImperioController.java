package com.example.imperio.controller;


import com.example.imperio.dto.DistributorMasterCreateDto;
import com.example.imperio.dto.ExecutiveMasterCreateDto;
import com.example.imperio.dto.ProductMasterCreateDto;
import com.example.imperio.dto.RegionMasterCreateDto;
import com.example.imperio.service.MasterCreateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4000")
@RestController
@RequestMapping("/api/master")
public class ImperioController {

    @Autowired
    private MasterCreateService masterCreateService;

    //Build ADD Masters REST API
    @PostMapping("/addRegion")
    public ResponseEntity<RegionMasterCreateDto> createDtoResponseEntity(@RequestBody RegionMasterCreateDto regionMasterCreateDto){

        RegionMasterCreateDto saveRegionMaster = masterCreateService.createRegionMaster(regionMasterCreateDto);

        return new ResponseEntity<>(saveRegionMaster, HttpStatus.CREATED);
    }

    @PostMapping("/addExecutive")
    public ResponseEntity<ExecutiveMasterCreateDto> createDtoResponseEntity(@RequestBody ExecutiveMasterCreateDto executiveMasterCreateDto){

        ExecutiveMasterCreateDto saveExecutiveMaster = masterCreateService.createExecutiveMaster(executiveMasterCreateDto);

        return new ResponseEntity<>(saveExecutiveMaster, HttpStatus.CREATED);
    }


    @PostMapping("/addDistributor")
    public ResponseEntity<DistributorMasterCreateDto> createDtoResponseEntity(@RequestBody DistributorMasterCreateDto distributorMasterCreateDto){

        DistributorMasterCreateDto saveDistributorMaster = masterCreateService.createDistributorMaster(distributorMasterCreateDto);

        return new ResponseEntity<>(saveDistributorMaster, HttpStatus.CREATED);
    }

    @PostMapping("/addProduct")
    public ResponseEntity<ProductMasterCreateDto> createDtoResponseEntity(@RequestBody ProductMasterCreateDto productMasterCreateDto){

        ProductMasterCreateDto saveProductMaster = masterCreateService.createProductMaster(productMasterCreateDto);

        return new ResponseEntity<>(saveProductMaster, HttpStatus.CREATED);
    }

    //Build GET Master Ids REST API
    @GetMapping("/displayRegion/{regionMasterId}")
    public ResponseEntity<RegionMasterCreateDto> getDataByRegionMasterId(@PathVariable String regionMasterId){

        RegionMasterCreateDto regionMasterCreateDto = masterCreateService.getRegionMaster(regionMasterId);


        return ResponseEntity.ok(regionMasterCreateDto);
    }

    @GetMapping("/displayExecutive/{executiveCode}")
    public ResponseEntity<ExecutiveMasterCreateDto> getDataByExecutiveCode(@PathVariable String executiveCode){

        ExecutiveMasterCreateDto executiveMasterCreateDto = masterCreateService.getExecutiveMaster(executiveCode);

        return ResponseEntity.ok(executiveMasterCreateDto);
    }

    @GetMapping("/displayDistributor/{distributorCode}")
    public ResponseEntity<DistributorMasterCreateDto> getDataByDistributorCode(@PathVariable String distributorCode){

        DistributorMasterCreateDto distributorMasterCreateDto = masterCreateService.getDistributorMaster(distributorCode);

        return ResponseEntity.ok(distributorMasterCreateDto);
    }

    @GetMapping("/displayProduct/{productCode}")
    public ResponseEntity<ProductMasterCreateDto> getDataByProductCode(@PathVariable String productCode){

        ProductMasterCreateDto productMasterCreateDto = masterCreateService.getProductMaster(productCode);

        return ResponseEntity.ok(productMasterCreateDto);
    }


    //Build GET All Master Ids REST API
    @GetMapping("/allRegion")
    public ResponseEntity<List<RegionMasterCreateDto>> getAllRegionMasterIds(){

        List<RegionMasterCreateDto> allRegionMasters = masterCreateService.getAllRegionMasterIds();

        return ResponseEntity.ok(allRegionMasters);
    }

    @GetMapping("/allExecutive")
    public ResponseEntity<List<ExecutiveMasterCreateDto>> getAllExecutiveMasterCodes(){

        List<ExecutiveMasterCreateDto> allExecutiveMasters = masterCreateService.getAllExecutiveMasterCodes();

        return ResponseEntity.ok(allExecutiveMasters);
    }

    @GetMapping("/allDistributor")
    public ResponseEntity<List<DistributorMasterCreateDto>> getAllDistributorMasterCodes(){

        List<DistributorMasterCreateDto> allDistributorMasters = masterCreateService.getAllDistributorMaterCodes();

        return ResponseEntity.ok(allDistributorMasters);

    }

    @GetMapping("/allProduct")
    public ResponseEntity<List<ProductMasterCreateDto>> getAllProductMasterCodes(){

        List<ProductMasterCreateDto> allProductMasters = masterCreateService.getAllProductMasterCodes();

        return ResponseEntity.ok(allProductMasters);

    }


    //Build UPDATE Master REST API
    @PutMapping("/alterRegionMaster/{regionMasterId}")
    public ResponseEntity<RegionMasterCreateDto> updateRegion(@PathVariable String regionMasterId, @RequestBody RegionMasterCreateDto updatedRegion){

        RegionMasterCreateDto regionMasterCreateDto = masterCreateService.updateRegion(regionMasterId, updatedRegion);

        return ResponseEntity.ok(regionMasterCreateDto);
    }

    @PutMapping("/alterExecutiveMaster/{executiveCode}")
    public ResponseEntity<ExecutiveMasterCreateDto> updateExecutive(@PathVariable String executiveCode, @RequestBody ExecutiveMasterCreateDto updatedExecutive){

        ExecutiveMasterCreateDto executiveMasterCreateDto = masterCreateService.updateExecutive(executiveCode, updatedExecutive);

        return ResponseEntity.ok(executiveMasterCreateDto);
    }

    @PutMapping("/alterDistributorMaster/{distributorCode}")
    public ResponseEntity<DistributorMasterCreateDto> updateDistributor(@PathVariable String distributorCode, @RequestBody DistributorMasterCreateDto updatedDistributor){

        DistributorMasterCreateDto distributorMasterCreateDto = masterCreateService.updateDistributor(distributorCode, updatedDistributor);

        return ResponseEntity.ok(distributorMasterCreateDto);
    }

    @PutMapping("/alterProductMaster/{productCode}")
    public ResponseEntity<ProductMasterCreateDto> updateProduct(@PathVariable String productCode, @RequestBody ProductMasterCreateDto updatedProduct){

        ProductMasterCreateDto productMasterCreateDto = masterCreateService.updateProduct(productCode,updatedProduct);

        return ResponseEntity.ok(productMasterCreateDto);
    }


    //Build DELETE Ledger REST API
    @DeleteMapping("/deleteRegion/{regionMasterId}")
    public ResponseEntity<String> deleteRegion(@PathVariable String regionMasterId){

        masterCreateService.deleteRegion(regionMasterId);

        return ResponseEntity.ok("Region deleted successfully!.");
    }

    @DeleteMapping("/deleteExecutive/{executiveCode}")
    public ResponseEntity<String> deleteExecutive(@PathVariable String executiveCode){

        masterCreateService.deleteExecutive(executiveCode);

        return ResponseEntity.ok("Executive deleted successfully!.");
    }

    @DeleteMapping("/deleteDistributor/{distributorCode}")
    public ResponseEntity<String> deleteDistributor(@PathVariable String distributorCode){

        masterCreateService.deleteDistributor(distributorCode);

        return ResponseEntity.ok("Distributor deleted successfully!.");

    }

    @DeleteMapping("/deleteProduct/{productCode}")
    public ResponseEntity<String> deleteProduct(@PathVariable String productCode){

        masterCreateService.deleteProduct(productCode);

        return ResponseEntity.ok("Product deleted successfully!>");
    }


}
