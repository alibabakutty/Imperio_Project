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
@Table(name = "region_master")
public class RegionMasterCreate {


    @Id
    @Column(name = "region_master_id")
    private String regionMasterId;

    @Column(name = "region_name")
    private String regionName;

    @Column(name = "region_state")
    private String regionState;

    @Column(name = "country")
    private String country;
}
