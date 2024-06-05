package com.example.imperio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "executive_master")
public class ExecutiveMasterCreate {

    @Id
    @Column(name = "executive_code")
    private String executiveCode;

    @Column(name = "executive_master")
    private  String executiveMaster;

    @Column(name = "date_of_join")
    private String dateOfJoin;

    @Column(name = "mobile_no")
    private  String mobileNo;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "status")
    private String status;


}
