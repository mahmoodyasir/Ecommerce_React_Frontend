import React, {useEffect, useState} from "react";
import Axios from "axios";
import {domain, header} from "../env";
import {Link} from "react-router-dom";

const Oldorders = () => {
    const [orders, setOrders] = useState(null);
    const [reload, setReload] = useState(null);
    const [orderdetails, setOrderdetails] = useState(null);
    const product = orderdetails?.cartproduct
    useEffect(() => {
        const getorders = async () => {
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

    const getOrderDetails = async (id) => {
        await Axios({
            method: "get",
            url: `${domain}/api/orders/${id}/`,
            headers: header
        }).then(response => {
            console.log(response.data["data"][0], " $$$$$$ Order Details Page $$$$$$$");
            setOrderdetails(response.data["data"][0])
        })
    }

    return (
        <div className="container">
            <h1>Order History</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>SN</th>
                    <th>Date</th>
                    <th>Payment Type</th>
                    <th>Total</th>
                    <th>Product</th>
                    <th>Order Status</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {
                    orders?.length !== 0 ?
                        orders?.map((order, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{order?.date}</td>
                                <td>{order?.payment_type === 'online' ? "Online" : "Cash On Delivery"}</td>
                                <td>{order?.total}</td>
                                <td>{order?.cartproduct?.length}</td>
                                <td>{order?.order_list?.choice_name}</td>
                                <td>
                                    {/*<Link to={`/orderdetails/${order?.id}`} className="btn btn-info">Details</Link>*/}
                                    <Link onClick={() => getOrderDetails(order?.id)} to="#"
                                          className="btn btn-info">Details</Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteorderhistory(order?.id)}
                                            className="btn btn-danger">Delete
                                    </button>
                                </td>
                            </tr>
                        ) :
                        <div>
                            <h1>No Old Orders</h1>
                            <Link to="/" className="btn btn-info">Go to Home</Link>
                        </div>
                }
                </tbody>
            </table>


            {
                orderdetails !== null ?
                    <>
                        <h1 className="display-6 mt-5 text-center mb-4">Order Details</h1>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                {/*<th>Date</th>*/}
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Products</th>
                                {
                                    orderdetails?.payment_type === 'online' ?
                                        <>
                                            <th>Medium</th>
                                            <th>Transaction ID</th>
                                        </>
                                        :
                                        <></>
                                }
                                <th>Total</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                {
                                    <>
                                        {/*<td>{orderdetails?.date}</td>*/}
                                        <td>{orderdetails?.email}</td>
                                        <td>{orderdetails?.mobile}</td>
                                        <td>{orderdetails?.cartproduct?.length}</td>
                                        {
                                            orderdetails?.payment_type === 'online' ?
                                                <>
                                                    <td>{orderdetails?.transaction_medium}</td>
                                                    <td>{orderdetails?.transaction_id}</td>
                                                </>
                                                :
                                                <></>
                                        }
                                        <td>{orderdetails?.total}</td>
                                    </>
                                }
                            </tr>
                            </tbody>
                        </table>
                        <h1>Product Details</h1>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>SN</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                product?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.product[0]?.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.subtotal}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </>
                    :
                    <></>
            }


        </div>
    )
}

export default Oldorders