import React, { useEffect, useState } from "react";
import { addOrder, editOrder, getOrder } from "../services/OrderService";
import { useNavigate, useParams } from "react-router-dom";

export const OrderComponent = () => {
    const [tailNumber, setTailNumber] = useState("");
    const [airportCode, setAirportCode] = useState("");
    const [requestedVolume, setRequestedVolume] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [status, setStatus] = useState("Pending");
    const navigator = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        tailNumber: "",
        airportCode: "",
        requestedVolume: "",
        deliveryTime: "",
        status: ""
    });

    useEffect(() => {

        if (id) {
            getOrder(id).then((response) => {
                setTailNumber(response.data.tailNumber);
                setAirportCode(response.data.airportCode);
                setRequestedVolume(response.data.requestedVolume);
                setDeliveryTime(response.data.deliveryTime);
                setStatus(response.data.status);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }



    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        // Tail Number
        if (!tailNumber.trim()) {
            errorsCopy.tailNumber = "Tail Number is required";
            valid = false;
        } else {
            errorsCopy.tailNumber = "";
        }

        // Airport Code – must be exactly 4 letters
        if (!airportCode.trim()) {
            errorsCopy.airportCode = "Airport Code is required";
            valid = false;
        } else if (!/^[A-Za-z]{4}$/.test(airportCode.trim())) {
            errorsCopy.airportCode = "Airport Code must be exactly 4 letters";
            valid = false;
        } else {
            errorsCopy.airportCode = "";
        }

        // Requested Volume – must be a positive number
        if (!requestedVolume || requestedVolume === '') {
            errorsCopy.requestedVolume = "Requested Volume is required";
            valid = false;
        } else if (isNaN(requestedVolume) || Number(requestedVolume) <= 0) {
            errorsCopy.requestedVolume = "Volume must be a positive number";
            valid = false;
        } else {
            errorsCopy.requestedVolume = "";
        }

        if (!deliveryTime.trim()) {
            errorsCopy.deliveryTime = "Delivery time is required";
            valid = false;
        } else if (!/^\d{2}:\d{2}$/.test(deliveryTime)) {
            errorsCopy.deliveryTime = "Invalid time format (HH:MM)";
            valid = false;
        } else {
            // Example: limit between 06:00 and 22:00
            const [h, m] = deliveryTime.split(":").map(Number);
            const minutes = h * 60 + m;
            const minAllowed = 6 * 60;  // 06:00
            const maxAllowed = 22 * 60; // 22:00
            if (minutes < minAllowed || minutes > maxAllowed) {
                errorsCopy.deliveryTime = "Delivery must be between 06:00 and 22:00";
                valid = false;
            } else {
                errorsCopy.deliveryTime = "";
            }
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdate(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const order = {
            tailNumber,
            airportCode,
            requestedVolume: Number(requestedVolume),
            deliveryTime,
            status
        };
        console.log("Order submitted:", order);
        if (id) {
            editOrder(id, order).then((response) => {
                console.log(response.data);
                navigator('/orders');
            }).catch(error => {
                console.error(error);
            })
        } else {
            addOrder(order).then((response) => {
                console.log(response.data);
                navigator('/orders')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <div className="card-header">
                        <h2>{pageTitle()}</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveOrUpdate}>
                            {/* Tail Number */}
                            <div className="form-group mb-2">
                                <label className="form-label">Tail Number:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Tail Number"
                                    name="tailNumber"
                                    value={tailNumber}
                                    className={`form-control ${errors.tailNumber ? "is-invalid" : ""
                                        }`}
                                    onChange={(e) => setTailNumber(e.target.value)}
                                />
                                {errors.tailNumber && (
                                    <div className="invalid-feedback">{errors.tailNumber}</div>
                                )}
                            </div>

                            {/* Airport Code */}
                            <div className="form-group mb-2">
                                <label className="form-label">Airport ICAO Code:</label>
                                <input
                                    type="text"
                                    placeholder="Enter ICAO Code"
                                    name="airportCode"
                                    value={airportCode}
                                    className={`form-control ${errors.airportCode ? "is-invalid" : ""
                                        }`}
                                    onChange={(e) => setAirportCode(e.target.value)}
                                />
                                {errors.airportCode && (
                                    <div className="invalid-feedback">{errors.airportCode}</div>
                                )}
                            </div>

                            {/* Requested Volume */}
                            <div className="form-group mb-2">
                                <label className="form-label">Fuel Volume:</label>
                                <input
                                    type="number"
                                    placeholder="Enter volume"
                                    name="requestedVolume"
                                    value={requestedVolume}
                                    className={`form-control ${errors.requestedVolume ? "is-invalid" : ""
                                        }`}
                                    onChange={(e) => setRequestedVolume(e.target.value)}
                                />
                                {errors.requestedVolume && (
                                    <div className="invalid-feedback">
                                        {errors.requestedVolume}
                                    </div>
                                )}
                            </div>

                            {/* Delivery Time */}
                            <div className="form-group mb-2">
                                <label className="form-label">Delivery Time:</label>
                                <input
                                    type="time"
                                    name="deliveryTime"
                                    value={deliveryTime}
                                    className={`form-control ${errors.deliveryTime ? "is-invalid" : ""
                                        }`}
                                    onChange={(e) => setDeliveryTime(e.target.value)}
                                />
                                {errors.deliveryTime && (
                                    <div className="invalid-feedback">{errors.deliveryTime}</div>
                                )}
                            </div>
                            {/* Status dropdown only when editing */}
                            {id && (
                                <div className="form-group mb-2">
                                    <label className="form-label">Status:</label>
                                    <select
                                        name="status"
                                        value={status}
                                        className={`form-control ${errors.status ? "is-invalid" : ""}`}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && (
                                        <div className="invalid-feedback">{errors.status}</div>
                                    )}
                                </div>
                            )}
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
