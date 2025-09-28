package com.fuel.order.demo.converter;

import com.fuel.order.demo.dto.OrderDTO;
import com.fuel.order.demo.entity.Order;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Component
public class OrderToOrderDTOConverter implements Converter<Order, OrderDTO> {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    @Override
    public OrderDTO convert(Order source) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(source.getId());
        orderDTO.setTailNumber(source.getTailNumber());
        orderDTO.setAirportCode(source.getAirportCode());
        orderDTO.setRequestedVolume(source.getRequestedVolume());
        orderDTO.setStatus(source.getStatus());
        orderDTO.setDeliveryTime(source.getDeliveryTime().format(TIME_FORMATTER));
        return orderDTO;
    }
}
