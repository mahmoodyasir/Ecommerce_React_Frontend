import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {BsCart4} from "react-icons/bs";
import {ImHeart} from "react-icons/im";
import Axios from "axios";
import {domain, header} from "../env";
import "./css/SingleProduct.css"
import {useGlobalState} from "../state/provider";
import toast from "react-hot-toast";

const SingleProduct = ({item, identity}) => {
    const [{profile, cart_incomplete, all_wishlist, only_product, page_reload}, dispatch] = useGlobalState()
    const [ifadded, setIfadded] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [wish, setWish] = useState(null);
    let cart_product_length = 0
    if (cart_incomplete !== null) {
        cart_product_length = cart_incomplete?.cartproduct?.length
    } else {
        cart_product_length = 0
    }
    console.log(identity)

    const history = useHistory();
    const addtocart = async (id) => {
        profile !== null ? (
                await Axios({
                    method: "post",
                    url: `${domain}/api/addtocart/`,
                    data: {"id": id},
                    headers: header
                }).then(response => {
                    // console.log(response.data, "$$$$$$$$$$ ADD to CART $$$$$$$");
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
                formdata.append("productId", item?.id);
                await Axios({
                    method: "post",
                    url: `${domain}/api/checkproduct/`,
                    headers: header,
                    data: {"cartId": cart_incomplete?.id, "productId": item?.id}
                }).then(response => {
                    setIfadded(response.data["status"])
                    setQuantity(response.data["cartdata"]?.[0]?.quantity)
                    setCartId(response.data["cartdata"]?.[0]?.id)
                    // console.log(response.data["cartdata"]?.[0]?.product?.[0]?.id)
                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data["status"]
                    })
                })
            }
        }
        CheckCartData();
    }, [cart_product_length, quantity, only_product]);


    const increase_cart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/increasecart/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            // console.log(response.data);
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
            // console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const addToWishList = async (id) => {
        profile !== null ?
            (
                await Axios({
                    method: "post",
                    url: `${domain}/api/wishlist/`,
                    data: {"id": id},
                    headers: header
                }).then(response => {
                    // console.log(response.data)
                    setWish(response.data["error"])
                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data
                    })
                    toast.success("Added to WishList")
                })
            )
            :
            (
                history.push('/login')
            )
    }

    useEffect(() => {
        let i = 0;
        const wishlistChecker = () => {
            if (all_wishlist !== null && all_wishlist[0]?.wishedProduct.length > 0) {
                for (i = 0; i < all_wishlist[0]?.wishedProduct.length; i++) {
                    if (all_wishlist[0]?.wishedProduct[i]?.id === item?.id) {
                        setWish(item?.id)
                        // console.log("Matched ", item?.title, item?.id)
                    }
                }
            }
        }
        wishlistChecker();
    }, [all_wishlist, page_reload, only_product]);


    return (
        <div className="card single_product border-0 shadow rounded-3 mb-5">
            <span className="highlight w-50 text-white fs-5 border-0">{item?.category?.title}</span>
            <div>

                <div className="d-flex justify-content-center">
                    {
                        identity === 1 ?
                            <>
                                <Link to={`/product/${item.id}`}>
                                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                    <img className="card-img-top mt-2" src={item.image} onError={(e) => {
                                        e.target.src = item?.productImageUrl
                                    }}/>
                                </Link>
                            </>
                            :
                            <>
                                <Link to={`/product/${item.id}`}>
                                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                                    <img className="card-img-top mt-2" src={`${domain}${item.image}`} onError={(e) => {
                                        e.target.src = item?.productImageUrl
                                    }}/>
                                </Link>
                            </>
                    }
                </div>

                <div className="card-body">
                    <h5 className="card-title display-6 title-size">{item.title}</h5>
                    <h5>Price: <span className="badge bg-warning text-dark me-2"><del>{item.market_price}$</del></span><span
                        className="badge bg-success fs-5">{item.selling_price}$</span></h5>
                    {/*<p className="card-text text-capitalize text-break">{(item.description).substring(0, 100)}.... <Link*/}
                    {/*    to={`/product/${item.id}`} target="_blank">see more</Link></p>*/}
                </div>
                <div className="card-footer border-0 p-0 bg-white">

                    {
                        wish === item?.id ?
                            <>
                                <button style={{borderBottomLeftRadius: "6px"}}
                                        className="border-0 py-2 m-0 w-50 bg-warning text-white disabled"
                                        disabled={true}>
                                    <span><ImHeart className="fs-4"/> Added</span>
                                </button>
                            </>
                            :
                            <>
                                <button onClick={() => addToWishList(item.id)} style={{borderBottomLeftRadius: "6px"}}
                                        className="border-0 py-2 m-0 w-50 bg-indigo text-white add-wish-btn">
                                    <span><ImHeart className="fs-4"/> Wishlist</span>
                                </button>
                            </>
                    }


                    {
                        ifadded === true ?
                            <>
                                <div style={{borderBottomRightRadius: "6px"}} className="btn-group w-50 bg-white"
                                     aria-label="...">
                                    <button onClick={() => decrease_cart(cartId)}
                                            style={{borderBottomLeftRadius: "0px", borderTopLeftRadius: "0px"}}
                                            className="btn btn-danger border-0 pb-2 mt-0">-
                                    </button>
                                    <button className="btn border-0 pb-2 mt-0 fw-bold" disabled>{quantity}</button>
                                    <button onClick={() => increase_cart(cartId)} style={{borderTopRightRadius: "0px"}}
                                            className="btn btn-success border-0 pb-2 mt-0">+
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                <button style={{borderBottomRightRadius: "6px"}} onClick={() => addtocart(item.id)}
                                        className="border-0 py-2 w-50 bg-purple text-white add-cart-btn">
                                    <span className=""><BsCart4 className="fs-4"/> Add to Cart</span>
                                </button>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}

export default SingleProduct