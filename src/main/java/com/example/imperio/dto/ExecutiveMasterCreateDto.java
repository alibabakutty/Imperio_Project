package com.example.imperio.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExecutiveMasterCreateDto {


    private String executiveCode;


    private  String executiveMaster;


    private String dateOfJoin;


    private  String mobileNo;


    private String emailId;

    private String status;
}
