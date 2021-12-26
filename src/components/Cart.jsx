import React from "react";
import {useGlobalState} from "../state/provider";
import {Link, useHistory} from "react-router-dom";
import Axios from "axios";
import {domain, header} from "../env";

const Cart = () => {
    // eslint-disable-next-line no-empty-pattern
    const [{ cart_incomplete }, dispatch] = useGlobalState()
    const history =  useHistory()
    let cart_product_length = 0
    if (cart_incomplete !== null)
    {
        cart_product_length = cart_incomplete?.cartproduct?.length
    }
    else
    {
        cart_product_length = 0
    }

    const increase_cart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/increasecart/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const decrease_cart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/decreasecart/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const delete_cart_product = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/deletecartproduct/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const deletefullcart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/deletefullcart/`,
            headers: header,
            data: {"id": id}
        }).then(response=>{
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
             dispatch({
                type: "ADD_CARTINCOMPLETE",
                cart_incomplete: null
            })
            alert("Your Full Cart is Deleted")
            history.push("/")
        })
    }
    return (
        <div className="container p-2">
            {
                cart_product_length !== 0 ?
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            // eslint-disable-next-line no-undef
                            cart_incomplete?.cartproduct.map((data, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{data.product[0]?.title}</td>
                                    <td>{data.price}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.subtotal}</td>
                                    <td>
                                        <button onClick={() => decrease_cart(data.id)} className="btn btn-info">-</button>
                                        <button onClick={() => delete_cart_product(data.id)} className="btn btn-danger mx-1">X</button>
                                        <button onClick={() => increase_cart(data.id)} className="btn btn-success">+</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="4" className="text-right">Total: </th>
                                <th>{cart_incomplete?.total}</th>
                                <th>
                                    <Link className="btn btn-success" to="/order">Order Now</Link>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                    :
                    <div>
                        <h2>There is no product in Cart</h2>
                    </div>
            }
            <div className="row">
                <div className="col">
                    <Link className="btn btn-info" to="/oldorders">Old Orders</Link>
                </div>
                {
                    cart_product_length !== 0 &&
                        <div className="col">
                            <Link onClick={() => deletefullcart(cart_incomplete?.id)} to="" className="btn btn-danger">Delete Cart</Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default Cart