# order-management
Fuel Order Management with react and spring boot

#Frontend with react 
run the application with cmd - npm run dev
url - http://localhost:3000/

#Backend with spring boot 
run the application with cmd - mvn spring-boot:run
url - http://localhost:8080/api/orders

# Below are the curl for orders

**Add**
curl --location 'http://localhost:8080/api/orders/add-order' \
--header 'Content-Type: application/json' \
--data '{
    "tailNumber": 234,
    "airportCode": "ADXB",
    "requestedVolume" : 8,
    "deliveryTime" : "21:45",
    "status" : "Pending"
}
'

**Update**
curl --location --request PUT 'http://localhost:8080/api/orders/1' \
--header 'Content-Type: application/json' \
--data '{
    "tailNumber": 234,
    "airportCode": "ABDX",
    "requestedVolume" : 99,
    "deliveryTime" : "21:45",
    "status" : "Completed"
}
'

**Get by Id**
curl --location --request GET 'http://localhost:8080/api/orders/1' \
--header 'Content-Type: application/json' \
--data '{
    "tailNumber": 234,
    "airportCode": "ABDX",
    "requestedVolume" : 99,
    "deliveryTime" : "21:45",
    "status" : "Pending"
}
'

**Get All**
curl --location --request GET 'http://localhost:8080/api/orders?page=0&size=5&sortBy=tailNumber&sortDir=asc&airportCode=ADXB' \
--header 'Content-Type: application/json' \
--data '{
    "tailNumber": 234,
    "airportCode": "ABDX",
    "requestedVolume" : 99,
    "deliveryTime" : "21:45",
    "status" : "Complete"
}
'
