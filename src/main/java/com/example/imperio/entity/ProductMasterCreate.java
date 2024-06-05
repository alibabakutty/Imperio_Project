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
@Table(name = "product_master")
public class ProductMasterCreate {

    @Id
    @Column(name = "product_code")
    private String productCode;

    @Column(name = "product_description")
    private String productDescription;

    @Column(name = "product_category")
    private String productCategory;

    @Column(name = "product_uom")
    private String productUom;


}
