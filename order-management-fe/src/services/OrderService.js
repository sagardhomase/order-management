import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/orders';

export const listOrders = ()=>axios.get(REST_API_BASE_URL);
export const addOrder = (order)=>axios.post(REST_API_BASE_URL+'/add-order', order);    
export const editOrder = (id,order)=>axios.put(REST_API_BASE_URL+'/'+id, order);
export const getOrder = (id)=>axios.get(REST_API_BASE_URL+'/'+id);
export const deleteOrder = (id)=>axios.delete(REST_API_BASE_URL+'/'+id);