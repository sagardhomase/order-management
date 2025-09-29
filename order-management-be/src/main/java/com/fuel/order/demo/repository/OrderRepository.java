package com.fuel.order.demo.repository;

import com.fuel.order.demo.dto.OrderDTO;
import com.fuel.order.demo.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByAirportCodeContainingIgnoreCase(String airportCode, Pageable pageable);
}
