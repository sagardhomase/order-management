package com.fuel.order.demo.converter;

import com.fuel.order.demo.dto.OrderDTO;
import com.fuel.order.demo.entity.Order;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Component
public class OrderDTOToOrderConverter implements Converter<OrderDTO, Order> {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    @Override
    public Order convert(OrderDTO source) {
        Order order = new Order();
        order.setTailNumber(source.getTailNumber());
        order.setAirportCode(source.getAirportCode());
        order.setRequestedVolume(source.getRequestedVolume());
        order.setStatus(source.getStatus());
        order.setDeliveryTime(LocalTime.parse(source.getDeliveryTime(),TIME_FORMATTER));
        return order;
    }
}
