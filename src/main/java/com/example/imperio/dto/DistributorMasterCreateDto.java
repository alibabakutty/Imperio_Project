package com.example.imperio.dto;

import jakarta.persistence.Column;
import lombok.*;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DistributorMasterCreateDto {



    private String distributorCode;


    private String distributorCompanyName;


    private String distributorOwnerName;


    private String mobileNo;


    private String executiveCode;


    private String executiveMaster;


    private String regionCode;


    private String regionMaster;


    private String contactPersonName;


    private String contactMobileNo;
}
