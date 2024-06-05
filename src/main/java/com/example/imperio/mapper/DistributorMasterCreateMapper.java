package com.example.imperio.mapper;

import com.example.imperio.dto.DistributorMasterCreateDto;
import com.example.imperio.entity.DistributorMasterCreate;

public class DistributorMasterCreateMapper {


    public static DistributorMasterCreateDto mapToDistributorMasterCreateDto(DistributorMasterCreate distributorMasterCreate){

        return new DistributorMasterCreateDto(

                distributorMasterCreate.getDistributorCode(),
                distributorMasterCreate.getDistributorCompanyName(),
                distributorMasterCreate.getDistributorOwnerName(),
                distributorMasterCreate.getMobileNo(),
                distributorMasterCreate.getExecutiveCode(),
                distributorMasterCreate.getExecutiveMaster(),
                distributorMasterCreate.getRegionCode(),
                distributorMasterCreate.getRegionMaster(),
                distributorMasterCreate.getContactPersonName(),
                distributorMasterCreate.getContactMobileNo()
        );
    }


    public static DistributorMasterCreate mapToDistributorMasterCreate(DistributorMasterCreateDto distributorMasterCreateDto){

        return new DistributorMasterCreate(

                distributorMasterCreateDto.getDistributorCode(),
                distributorMasterCreateDto.getDistributorCompanyName(),
                distributorMasterCreateDto.getDistributorOwnerName(),
                distributorMasterCreateDto.getMobileNo(),
                distributorMasterCreateDto.getExecutiveCode(),
                distributorMasterCreateDto.getExecutiveMaster(),
                distributorMasterCreateDto.getRegionCode(),
                distributorMasterCreateDto.getRegionMaster(),
                distributorMasterCreateDto.getContactPersonName(),
                distributorMasterCreateDto.getContactMobileNo()
        );
    }
}
