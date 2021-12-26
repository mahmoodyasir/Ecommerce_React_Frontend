import React, {useEffect, useState} from "react";
import Axios from "axios";
import {domain, header} from "../env";
import {Link} from "react-router-dom";

const Oldorders = () => {
    const [orders, setOrders] = useState(null);
    const [reload, setReload] = useState(null);
    useEffect(() => {
        const getorders = async () =>{
            await Axios({
                method: "get",
                url: `${domain}/api/orders`,
                headers: header
            }).then(response => {
                console.log(response.data, " $$$$$$$ OLD ORDERS")
                setOrders(response.data)
            })
        }
        getorders()
    }, [reload]);

    const deleteorderhistory = async (id) => {
        await Axios({
            method: 'delete',
            url: `${domain}/api/orders/${id}/`,
            headers: header
        }).then(response => {
            console.log(response.data)
            setReload(response.data)
        })
    }

    return (
        <div className="container">
            <h1>Order History</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>SN</th>
                    <th>Total</th>
                    <th>Product</th>
                    <th>Order Status</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {
                    orders?.length !==0 ?
                        orders?.map((order, i) =>
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{order?.total}</td>
                            <td>{order?.cartproduct?.length}</td>
                            <td>{order?.order_list?.choice_name}</td>
                            <td>
                                <Link to={`/orderdetails/${order?.id}`} className="btn btn-info">Details</Link>
                            </td>
                            <td>
                                <button onClick={() => deleteorderhistory(order?.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        ):
                        <div>
                            <h1>No Old Orders</h1>
                            <Link to="/" className="btn btn-info">Go to Home</Link>
                        </div>
                }
                </tbody>
            </table>
        </div>
    )
}

export default Oldorders