import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteOrder, listOrders } from '../services/OrderService';

const ListFuelOrderComponent = () => {

    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();
    const dummyData=[{
        "id":1,
        "tailNumber":564,
        "airportCode": "DXB",
        "requestedVolume":10,
        "deliveryTimeWindow":10,
        "status":"Pending",
        "createdAt":10
    }];

    useEffect(() => {
         getOrders();
    }, [])

    function getOrders() {
        listOrders().then((response) => {
            console.log(response.data);
            setOrders(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function handleAddOrder(){
        navigator('/add-order');
    }
    function handleAEditOrder(id){
        navigator(`/edit-order/${id}`);
    }
    function handleDeleteOrder(id){
        deleteOrder(id).then((response) => {
            setOrders(prev => prev.filter(o => o.id !== id));
        }).catch(error => {
            console.error(error);
        })
    }
    return (
        <div className="container">
          <h2 className="text-center">Fuel Orders</h2>
          <button className="btn btn-primary mb-3" onClick={handleAddOrder}>
            Add Order
          </button>
      
          {orders.length === 0 ? (
            <div className="alert alert-info text-center">
              No orders found.
            </div>
          ) : (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Tail Number</th>
                  <th>Airport</th>
                  <th>Requested Volume</th>
                  <th>Delivery Window</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((e) => (
                  <tr key={e.id}>
                    <td>{e.tailNumber}</td>
                    <td>{e.airportCode}</td>
                    <td>{e.requestedVolume}</td>
                    <td>{e.deliveryTime}</td>
                    <td>{e.status}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleAEditOrder(e.id)}
                      >
                        Update
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteOrder(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
      
}

export default ListFuelOrderComponent