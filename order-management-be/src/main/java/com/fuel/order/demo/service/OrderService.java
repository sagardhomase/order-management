package com.fuel.order.demo.service;

import com.fuel.order.demo.dto.OrderDTO;
import com.fuel.order.demo.entity.Order;

import java.util.List;

public interface OrderService {

    public OrderDTO addOrder(OrderDTO orderDTO);
    public List<OrderDTO> getOrders();
    public OrderDTO getOrder(Long id);
    public void updateOrder(OrderDTO orderDTO, Long id);
    public void deleteOrder(Long id);
}
