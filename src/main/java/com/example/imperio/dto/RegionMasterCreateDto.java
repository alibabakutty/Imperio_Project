package com.example.imperio.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegionMasterCreateDto {



    private String regionMasterId;


    private String regionName;


    private String regionState;


    private String country;
}
