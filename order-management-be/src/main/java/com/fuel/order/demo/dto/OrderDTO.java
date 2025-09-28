package com.fuel.order.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    @JsonProperty("id")
    private Long id;

    @NotNull
    @JsonProperty(value = "tailNumber", required = true)
    private String tailNumber;

    @JsonProperty(value="airportCode", required = true)
    @Size(max = 4, min = 4, message = "Airport Code should be 4 characters only")
    private String airportCode;

    @JsonProperty(value="requestedVolume", required = true)
    @Min(value = 1, message = "Volume should be greater than or equal to 1")
    private Integer requestedVolume;

    @JsonProperty(value = "deliveryTime", required = true)
    private String deliveryTime;

    @JsonProperty(value = "status")
    private String status;
}
