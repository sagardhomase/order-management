package com.fuel.order.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tail_number", nullable = false)
    private String tailNumber;

    @Column(name = "airport_code", length = 4,nullable = false)
    private String airportCode;

    @Column(name = "requested_volume" ,nullable = false)
    private Integer requestedVolume;

    @Column(name = "delivery_time" ,nullable = false)
    private LocalTime deliveryTime;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createDate = LocalDateTime.now();

}
