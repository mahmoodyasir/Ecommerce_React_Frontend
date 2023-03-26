import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom'
import {BsCart4} from "react-icons/bs";
import {ImHeart} from "react-icons/im";
import Axios from "axios";
import {domain, header} from "../env";
import SingleProduct from "./SingleProduct";
import {useGlobalState} from "../state/provider";

const ProductDetails = () => {
    const [{profile, cart_incomplete}, dispatch] = useGlobalState()
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const [ifadded, setIfadded] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [categoryproducts, setCategoryproducts] = useState(null);
    const history = useHistory()

    let cart_product_length = 0
    if (cart_incomplete !== null) {
        cart_product_length = cart_incomplete?.cartproduct?.length
    } else {
        cart_product_length = 0
    }

    useEffect(() => {
        const getdata = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/product/${id}/`
            }).then(response => {
                console.log(response.data);
                setProduct(response.data)
                getcategory(response?.data?.category['id'])
            })
        }
        getdata()
    }, [id])

    const getcategory = async (id) => {
        await Axios({
            method: 'get',
            url: `${domain}/api/category/${id}/`
        }).then(response => {
            console.log(response.data);
            setCategoryproducts(response.data)
        })
    }

    const addtocart = async (id) => {
        profile !== null ? (
                await Axios({
                    method: "post",
                    url: `${domain}/api/addtocart/`,
                    data: {"id": id},
                    headers: header
                }).then(response => {
                    console.log(response.data, "$$$$$$$$$$ ADD to CART $$$$$$$");
                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data
                    })
                })
            ) :
            (
                history.push("/login")
            )
    }


    useEffect(() => {
        const CheckCartData = async () => {
            if (cart_incomplete !== null) {
                // console.log(cart_incomplete?.id, item?.id)
                const formdata = new FormData()
                formdata.append("cartId", cart_incomplete?.id);
                formdata.append("productId", id);
                await Axios({
                    method: "post",
                    url: `${domain}/api/checkproduct/`,
                    headers: header,
                    data: {"cartId": cart_incomplete?.id, "productId": id}
                }).then(response => {
                    setIfadded(response.data["status"])
                    setQuantity(response.data["cartdata"]?.[0]?.quantity)
                    setCartId(response.data["cartdata"]?.[0]?.id)

                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data["status"]
                    })
                })
            }
        }
        CheckCartData();
    }, [cart_product_length, quantity]);


    const increase_cart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/increasecart/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            setQuantity(quantity + 1)
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
            setQuantity(quantity - 1)
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    return (
        <div className="container">
            {
                product !== null &&
                (
                    <div className="row col-md-12">

                        <div className="col-md-4">
                            <div className="image_resize">
                                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                <img className="mt-4" src={product?.image} alt="Card image cap"/>
                            </div>

                            <div className="ms-4 col-md-12 mt-2">
                                <div>
                                    <button style={{borderTopLeftRadius: "6px", borderTopRightRadius: "6px"}}
                                            className="border-0 py-2 w-50 bg-indigo text-white ">
                                        <span><ImHeart className="fs-4"/> Add to Wishlist</span>
                                    </button>
                                </div>
                                <div>
                                    {
                                        ifadded === true ?
                                            <>
                                                <div style={{
                                                    borderBottomRightRadius: "6px",
                                                    borderBottomLeftRadius: "6px"
                                                }}
                                                        className="btn-group w-50 bg-white" aria-label="...">

                                                    <button onClick={() => decrease_cart(cartId)} style={{
                                                        borderBottomLeftRadius: "6px",
                                                        borderTopLeftRadius: "0px"
                                                    }} className="btn btn-danger border-0 pb-2 mt-0">-</button>

                                                    <button className="btn fw-bold"
                                                            disabled>{quantity}</button>

                                                    <button onClick={() => increase_cart(cartId)}
                                                            style={{borderTopRightRadius: "0px"}}
                                                            className="btn btn-success border-0 pb-2 mt-0">+
                                                    </button>

                                                </div>
                                            </>
                                            :
                                            <>
                                                <button style={{
                                                    borderBottomRightRadius: "6px",
                                                    borderBottomLeftRadius: "6px"
                                                }}
                                                        onClick={() => addtocart(product?.id)}
                                                        className="border-0 py-2 w-50 bg-purple text-white add-cart-btn">
                                                    <span className=""><BsCart4 className="fs-4"/> Add to Cart</span>
                                                </button>
                                            </>
                                    }

                                </div>

                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="">
                                <h1 className="display-6">Brand: <span
                                    className="text-info fw-bold">{product?.category?.title}</span></h1>
                                <h1 className="display-6">Model: <span
                                    className="text-success fw-bold">{product?.title}</span></h1>
                                <h2 className="display-6">Market Price: <span className="badge bg-warning text-dark"><del>{product?.market_price}$</del></span>
                                </h2>
                                <h2 className="display-6">Our Price: <span
                                    className="badge bg-success">{product?.selling_price}$</span></h2>
                            </div>

                            <span>
                                <h1 className="display-6">Details: </h1>
                                <p className="fs-5 text-wrap shadow-lg py-2 px-3 rounded-3">{product?.description}</p>
                            </span>
                        </div>
                    </div>
                )
            }
            <div className="row mt-5">
                <h1 className="mb-4">Related Products</h1>
                {
                    categoryproducts !== null &&
                    categoryproducts[0]?.category_products?.map((product, i) => (
                        <div key={i} className="col-md-3 my-2">
                            <SingleProduct item={product}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductDetails