import React, {useEffect, useState} from "react";
import {useGlobalState} from "../state/provider";
import {useParams} from "react-router-dom";
import Axios from "axios";
import {admin_header, domain} from "../env";
import logo from '../image_folder/defaul_img.png'
import "./CSS/All_Order.css";

const User_Control_Admin = () => {
    const {id} = useParams()
    const [object, setObject] = useState(null);
    const [history, setHistory] = useState(null);
    const [orderdetails, setOrderdetails] = useState(null);

    useEffect(() => {
        const get_user_data = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/all_order/${id}/`,
                headers: admin_header
            }).then(response => {
                setObject(response.data["data"][0]);
                // console.log(response.data["data"][0]?.profile_user['0']?.prouser?.id)
                get_history(response.data["data"][0]?.profile_user['0']?.prouser?.id)
            })
        }
        get_user_data()
    }, []);


     const get_history = async (s_id) => {
           await Axios({
               method: "get",
               url: `${domain}/api/any_user_order/${s_id}/`,
               headers: admin_header
              }).then(response => {
                  setHistory(response.data);
                  console.log(response.data)
              })
            }

    const show_details = async (id) => {
        await Axios({
            method: "get",
            url: `${domain}/api/orders/${id}/`,
            headers: admin_header
        }).then(response => {
            console.log(response.data["data"][0]);
            setOrderdetails(response.data["data"][0])
        })
    }

    const product = orderdetails?.cartproduct

    return (

        <div className="container">
            <div className="row">
                <div className="media beside">
                    <div>
                        <img src={`${domain}${object?.profile_user['0']?.image}`} className="rounded-circle account-image" onError={(e)=>{e.target.onerror = null; e.target.src=logo}}/>
                    </div>
                    <div className="col-md-4 media-body card text-white bg-success mb-3">
                        <h2 className="card-title display-6">Username: {object?.profile_user['0']?.prouser?.username}</h2>
                        <p className="card-text">{object?.profile_user['0']?.prouser?.email}</p>
                        <p className="card-text">{object?.profile_user['0']?.prouser?.first_name} {object?.profile_user['0']?.prouser?.last_name}</p>
                    </div>
                </div>
            </div>

            <div className="container">
                {/*<h1>{object?.profile_user['0']?.prouser?.id}</h1>*/}
                <div className="row beside col-md-12">

                    <div className="col-md-6 card text-black bg-white">
                        <h1 className="display-6 mb-3 beside mt-4">Order History</h1>
                        <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>SN</th>
                            <th>Total</th>
                            <th>Number Of Product</th>
                            <th>Order Status</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                           history?.length !==0 ?
                           history?.map((item, i) =>
                               <tr key={i}>
                                   <td>{i+1}</td>
                                   <td>{item?.total}</td>
                                   <td>{item?.cartproduct?.length}</td>
                                   <td>{item?.order_list?.choice_name}</td>
                                   <td>
                                       <button onClick={() => show_details(item?.id)} className="btn btn-info">Details</button>
                                   </td>
                               </tr>
                           ):
                               <div>
                                <h1 className="beside display-6">NO ORDER FOUND</h1>
                               </div>
                        }
                        </tbody>
                    </table>
                    </div>


                        {orderdetails !== null?
                        <>
                            <div className="card text-black bg-white mb-4 mt-2">
                            <h1 className="beside display-6 mt-4">ORDER DETAILS</h1>
                            <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Discount</th>
                                <th>Products</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                {
                                        <>
                                            <td>{orderdetails?.date}</td>
                                            <td>{orderdetails?.total}</td>
                                            <td>{orderdetails?.email}</td>
                                            <td>{orderdetails?.mobile}</td>
                                            <td>{orderdetails?.discount}%</td>
                                            <td>{orderdetails?.cartproduct?.length}</td>
                                        </>
                                }
                            </tr>
                            </tbody>
                            </table>

                            <h1 className="beside display-6 mt-4">PRODUCT DETAILS</h1>
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
                                        <td>{i+1}</td>
                                        <td>{item.product[0]?.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.subtotal}</td>
                                    </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                            </div>
                        </>
                        :
                        <></>
                    }




                </div>
            </div>
        </div>
    )
}

export default User_Control_Admin