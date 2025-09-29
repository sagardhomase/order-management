package com.fuel.order.demo.controller;

import com.fuel.order.demo.dto.OrderDTO;
import com.fuel.order.demo.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/test")
    public String test(){
        return "test";
    }
    @PostMapping("/add-order")
    public ResponseEntity<OrderDTO> addOrder(@RequestBody @Valid OrderDTO orderDTO){
        OrderDTO result = orderService.addOrder(orderDTO);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping
    public ResponseEntity<Page<OrderDTO>> getOrders(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "5") int size,
                                                    @RequestParam(defaultValue = "id") String sortBy,
                                                    @RequestParam(defaultValue = "asc") String sortDir,
                                                    @RequestParam(required = false) String airportCode){
        Page<OrderDTO> orderDTOS = orderService.getOrders(page,size, sortBy, sortDir, airportCode);
        if(orderDTOS.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderDTOS, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long id){
        OrderDTO orderDTO = orderService.getOrder(id);
        if(orderDTO==null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity editOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO){
        orderService.updateOrder(orderDTO, id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteOrder(@PathVariable Long id){
        orderService.deleteOrder(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
