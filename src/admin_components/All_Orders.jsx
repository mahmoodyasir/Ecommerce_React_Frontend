import React, {useEffect, useState} from "react";
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {admin_header, domain} from "../env";
import Order_Control from "./Order_Control";
import "./CSS/All_Order.css";

const All_Orders = () => {
    const [{ all_order }, dispatch] = useGlobalState();

    const [order, setOrder] = useState(null);
    const [order_id, setOrder_id] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const all_orders = async () =>{
            await Axios({
                method: "get",
                url: `${domain}/api/all_order/`,
                headers: admin_header
            }).then(response =>{
                setOrder(response.data)
                dispatch({
                    type: "ALL_ORDER",
                    all_order: response.data,
                })

            })
        }
        all_orders()
    }, [dispatch, all_order]);


    return (
        <div>
            {modal && <Order_Control setModal={setModal} order_id={order_id} order={order}/>}
            {/*{order !== null && <Order_Control order={order}/>}*/}
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>SN</td>
                        <td>Order ID</td>
                        <td>Email</td>
                        <td>Mobile</td>
                        <td>Total</td>
                        <td>Date</td>
                        <td>Payment</td>
                        <td>Order Status</td>
                        <td>Username</td>
                        <td>Actions</td>
                    </tr>
                    </thead>

                    <tbody>
                        {
                            order?.map((item, i) => (
                              <tr key={i}>
                                 <td>{i+1}</td>
                                 <td>{item?.id}</td>
                                 <td>{item?.email}</td>
                                 <td>{item?.mobile}</td>
                                 <td>{item?.total}</td>
                                 <td>{item?.date}</td>
                                 <td>{item?.payment_complete.toString()}</td>
                                 <td>{item?.order_list?.choice_name}</td>
                                 <td>{item?.userdata['0']?.username}</td>
                                 <td>
                                     <button className="btn btn-primary" onClick={() => {
                                         setModal(true);
                                         setOrder_id(i);
                                     }}>Control Order</button>
                                 </td>
                              </tr>
                            ))
                        }
                    </tbody>
                </table>

        </div>
        </div>
    )
}

export default All_Orders;