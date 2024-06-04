package com.example.imperio.mapper;

import com.example.imperio.dto.ExecutiveMasterCreateDto;
import com.example.imperio.entity.ExecutiveMasterCreate;

public class ExecutiveMasterCreateMapper {



    public static ExecutiveMasterCreateDto mapToExecutiveMasterCreateDto(ExecutiveMasterCreate executiveMasterCreate){
        return new ExecutiveMasterCreateDto(

                executiveMasterCreate.getExecutiveCode(),
                executiveMasterCreate.getExecutiveMaster(),
                executiveMasterCreate.getDateOfJoin(),
                executiveMasterCreate.getMobileNo(),
                executiveMasterCreate.getEmailId(),
                executiveMasterCreate.getStatus()
        );
    }

    public static ExecutiveMasterCreate mapToExecutiveMasterCreate(ExecutiveMasterCreateDto executiveMasterCreateDto){

        return new ExecutiveMasterCreate(
                executiveMasterCreateDto.getExecutiveCode(),
                executiveMasterCreateDto.getExecutiveMaster(),
                executiveMasterCreateDto.getDateOfJoin(),
                executiveMasterCreateDto.getMobileNo(),
                executiveMasterCreateDto.getEmailId(),
                executiveMasterCreateDto.getStatus()
        );
    }
}
