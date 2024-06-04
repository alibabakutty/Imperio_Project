package com.example.imperio.mapper;


import com.example.imperio.dto.RegionMasterCreateDto;
import com.example.imperio.entity.RegionMasterCreate;

public class RegionMasterCreateMapper {


    public static RegionMasterCreateDto mapToRegionMasterCreateDto(RegionMasterCreate regionmastercreate){
        return new RegionMasterCreateDto(
                regionmastercreate.getRegionMasterId(),
                regionmastercreate.getRegionName(),
                regionmastercreate.getRegionState(),
                regionmastercreate.getCountry()
        );
    }


    public static RegionMasterCreate mapToRegionMasterCreate(RegionMasterCreateDto regionmastercreatedto){

        return new RegionMasterCreate(
                regionmastercreatedto.getRegionMasterId(),
                regionmastercreatedto.getRegionName(),
                regionmastercreatedto.getRegionState(),
                regionmastercreatedto.getCountry()
        );
    }


}
