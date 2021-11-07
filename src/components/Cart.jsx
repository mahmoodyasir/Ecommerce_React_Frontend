import React from "react";
import {useGlobalState} from "../state/provider";

const Cart = () => {
    const [{ cart_incomplete }, { }] = useGlobalState()
    let cart_product_length = 0
    if (cart_incomplete !== null)
    {
        cart_product_length = cart_incomplete?.cartproduct?.length
    }
    else
    {
        cart_product_length = 0
    }
    return (
        <div className="container p-2">
            {
                cart_product_length !== 0 ?
                    <table className="table table-striped">
                        <thead>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                        {
                            // eslint-disable-next-line no-undef
                            cart_incomplete?.cartproduct.map((data, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{data.product[0].title}</td>
                                    <td>{data.price}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.subtotal}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    :
                    <div>
                        <h2>There is no product in Cart</h2>
                    </div>
            }
        </div>
    )
}

export default Cart