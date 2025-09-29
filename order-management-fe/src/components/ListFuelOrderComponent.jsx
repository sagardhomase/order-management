import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { deleteOrder, listOrders } from "../services/OrderService";

const ListFuelOrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);        
    const [perPage, setPerPage] = useState(5);
    const [sortField, setSortField] = useState("id");
    const [sortDir, setSortDir] = useState("asc");
    const [airportFilter, setAirportFilter] = useState("");

    const navigator = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await listOrders(page - 1, perPage, sortField, sortDir, airportFilter);
            setOrders(response.data.content);
            setTotalRows(response.data.totalElements);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, [page, perPage, sortField, sortDir, airportFilter]);

    const handleAddOrder = () => navigator("/add-order");
    const handleEditOrder = (id) => navigator(`/edit-order/${id}`);
    const handleDeleteOrder = (id) => {
        deleteOrder(id).then((response) => {
            setOrders(prev => prev.filter(o => o.id !== id));
        }).catch(error => {
            console.error(error);
        })
    };

    const columns = [
        { name: "Tail Number", selector: (row) => row.tailNumber, sortable: true, sortField: "tailNumber" },
        { name: "Airport Code", selector: (row) => row.airportCode, sortable: true, sortField: "airportCode" },
        { name: "Requested Volume", selector: (row) => row.requestedVolume, sortable: true, sortField: "requestedVolume" },
        { name: "Delivery Window", selector: (row) => row.deliveryTime, sortable: true, sortField: "deliveryTime" },
        { name: "Status", selector: (row) => row.status, sortable: true, sortField: "status" },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <button className="btn btn-info btn-sm" onClick={() => handleEditOrder(row.id)}>Update</button>
                    &nbsp;
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteOrder(row.id)}>Delete</button>
                </>
            ),
        },
    ];

    const handleSort = (column, sortDirection) => {
        setSortField(column.sortField || column.selector);
        setSortDir(sortDirection);
    };

    return (
        <div className="container">
            <h2 className="text-center">Fuel Orders</h2>
                <DataTable
                    columns={columns}
                    data={orders}
                    progressPending={loading}
                    persistTableHead={true}
                    pagination
                    paginationServer
                    sortServer={true}
                    onSort={handleSort}
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        <div className="d-flex justify-content-between w-100">
                            <button className="btn btn-primary" onClick={handleAddOrder}>
                                Add Order
                            </button>

                            <input
                                type="text"
                                placeholder="Filter by airport code"
                                className="form-control w-25"
                                value={airportFilter}
                                onChange={(e) => setAirportFilter(e.target.value)}
                            />
                        </div>

                    }
                    noDataComponent={
                        <div className="text-center text-muted p-2">
                            No records found.
                        </div>
                    }
                />
        </div>
    );
};

export default ListFuelOrderComponent;
