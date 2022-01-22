import React, {useEffect, useState} from 'react';
import '../admin_components/CSS/image-table.css'
import Axios from "axios";
import {admin_header, domain} from "../env";

const Incomplete_Orders = () => {

    const [incomplete_order, setIncomplete_order] = useState(null);

    useEffect(() => {
        const incomplete_data = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/incomplete_order/`,
                headers: admin_header
            }).then(response => {
                console.log(response.data["data"])
                setIncomplete_order(response.data["data"])
            })
        }
        incomplete_data()
    }, []);


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h6 className="display-6 mb-5">Incomplete Orders</h6>
                        <table className="table table-striped table-image bg-light">
                            <thead>
                            <tr>
                                <th scope="col">SN</th>
                                <th scope="col">Image</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Product Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                incomplete_order !== null &&
                                incomplete_order?.map((item, i) => (
                                    <tr key={i} className="text-style">
                                        <td scope="row">{i+1}</td>
                                        <td className="w-25">
                                            <img className="img-fluid img-thumbnail img-data" src={item?.product['0']?.image} onError={(e)=>{e.target.onerror = null; e.target.src=`${domain}${item?.product['0']?.image}`}}/>
                                        </td>
                                        <td>{item?.id}</td>
                                        <td>{item?.cart?.customer?.prouser?.username}</td>
                                        <td>{item?.product['0']?.title}</td>
                                        <td>{item?.price}</td>
                                        <td>{item?.quantity}</td>
                                        <td>{item?.subtotal}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Incomplete_Orders;
