package com.fuel.order.demo.service.impl;

import com.fuel.order.demo.dto.OrderDTO;
import com.fuel.order.demo.entity.Order;
import com.fuel.order.demo.exception.BusinessException;
import com.fuel.order.demo.repository.OrderRepository;
import com.fuel.order.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ConversionService conversionService;

    @Override
    public OrderDTO addOrder(OrderDTO orderDTO) {
        try {
            Order order = conversionService.convert(orderDTO, Order.class);
            if (order == null) {
                throw new BusinessException("O03", "Unable to convert OrderDTO to Order", HttpStatus.BAD_REQUEST);
            }
            order = orderRepository.save(order);
            return conversionService.convert(order, OrderDTO.class);
        } catch (Exception e) {
            throw new BusinessException("O04", "Error adding order: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public List<OrderDTO> getOrders() {
        List<Order> orders = orderRepository.findAll();
        if (orders.isEmpty()) {
            throw new BusinessException("O01", "No orders available", HttpStatus.NOT_FOUND);
        }
        return orders.stream()
                .map(o -> conversionService.convert(o, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO getOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new BusinessException("O02", "Order not found with id: " + id, HttpStatus.NOT_FOUND));
        return conversionService.convert(order, OrderDTO.class);
    }

    @Override
    public void updateOrder(OrderDTO orderDTO, Long id) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new BusinessException("O02", "Order not found with id: " + id, HttpStatus.NOT_FOUND));

        Order updatedOrder = conversionService.convert(orderDTO, Order.class);
        if (updatedOrder == null) {
            throw new BusinessException("O03", "Unable to convert OrderDTO to Order", HttpStatus.BAD_REQUEST);
        }

        updatedOrder.setId(id);
        orderRepository.save(updatedOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new BusinessException("O02", "Order not found with id: " + id, HttpStatus.NOT_FOUND);
        }
        orderRepository.deleteById(id);
    }
}
