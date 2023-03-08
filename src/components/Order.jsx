import React, {useState} from "react";
import {useGlobalState} from "../state/provider";
import {Link, useHistory} from "react-router-dom";
import Axios from "axios";
import {domain, header} from "../env";

const Order = () => {
    const [{cart_incomplete, profile}, dispatch] = useGlobalState()
    const history = useHistory()
    const [email, setEmail] = useState(profile?.prouser?.email !== null ? profile?.prouser?.email : null);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    let quantity = 0;
    console.log(cart_incomplete)
    console.log(profile?.prouser?.first_name)
    console.log(email.length, "Email")

    for (let i = 0; i < cart_incomplete?.cartproduct?.length; i++) {
        quantity = quantity + (cart_incomplete?.cartproduct[i]?.quantity);
    }
    console.log(quantity)

    const order = async () => {
        if (phone === null || address === null || email === null || phone === '' || address === '' || email==='') {
            alert("Please Provide All Fields !! ")
        } else {
            await Axios({
                method: "post",
                url: `${domain}/api/orders/`,
                headers: header,
                data: {
                    "cartId": cart_incomplete?.id,
                    "address": address,
                    "email": email,
                    "mobile": phone,

                }
            }).then(response => {
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
                dispatch({
                    type: "ADD_CARTINCOMPLETE",
                    cart_incomplete: null
                })
                alert("Your order has been placed")
                history.push("/oldorders")
            })
        }
    }

    const onlineOrder = async () => {
        if (email === null || phone === null || address === null || phone === '' || address === '' || email==='') {
            alert("Please Provide All Fields !! ")
        } else {
            const formdata = new FormData()
            formdata.append("email", email);
            formdata.append("name", profile?.prouser?.first_name + " " + profile?.prouser?.last_name);
            formdata.append("cartId", cart_incomplete?.id);
            formdata.append("mobile", phone);
            formdata.append("address", address);
            formdata.append("quantity", quantity);
            formdata.append("total", cart_incomplete?.total);

            await Axios({
                method: "post",
                url: `${domain}/api/online_payment/`,
                headers: header,
                data: formdata
            }).then(response => {
                console.log(response.data)
                if (response.data['status'] === "SUCCESS") {
                    window.location.replace(response.data['GatewayPageURL']);

                } else {
                    alert("Something Went Wrong !!")
                }
            })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
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
                            cart_incomplete?.cartproduct?.map((item, i) => (
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

                        <tfoot>
                        <tr>
                            <td>
                                <Link to="/cart" className="btn btn-success">Edit Cart</Link>
                            </td>
                            <td colSpan="3">Total:</td>
                            <td>{cart_incomplete?.total}</td>
                        </tr>
                        </tfoot>

                    </table>
                </div>

                <div className="col-md-6">
                    <h1>Order Now</h1>
                    <div>
                        <div className="form-group">
                            <label>Address</label>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className="form-control"
                                   placeholder="Address"/>
                        </div>
                        <div className="form-group">
                            <label>Phone No</label>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" className="form-control"
                                   placeholder="Phone No"/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control"
                                   placeholder="Email" value={email}/>
                        </div>
                        <div className="">
                            <div>
                                <button onClick={order} className="btn btn-success my-2">Cash On Delivery</button>
                            </div>
                            <div>
                                <button onClick={onlineOrder} className="btn btn-outline-info fs-5">Pay Through
                                    SSLCOMMERZ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order