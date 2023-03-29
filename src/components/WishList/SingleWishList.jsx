import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {domain, header} from "../../env";
import {useGlobalState} from "../../state/provider";
import Axios from "axios";
import toast from "react-hot-toast";

const SingleWishList = ({item}) => {
    const [{profile, all_wishlist}, dispatch] = useGlobalState();
    const history = useHistory();
    // console.log(item)

    const addtocart = async (id) => {
        profile !== null ? (
                await Axios({
                    method: "post",
                    url: `${domain}/api/addtocart/`,
                    data: {"id": id},
                    headers: header
                }).then(response => {
                    console.log(response.data["error"]);
                    if (response.data["error"] === false) {
                        Axios({
                            method: "delete",
                            url: `${domain}/api/wishlist/${id}/`,
                            headers: header
                        }).then(response => {
                            dispatch({
                                type: "PAGE_RELOAD",
                                page_reload: response.data
                            })
                            toast.success("Product Added To Cart")
                        })

                    }


                })
            ) :
            (
                history.push("/login")
            )
    }

    const deleteWishItem = async (id) => {
        await Axios({
            method: "delete",
            url: `${domain}/api/wishlist/${id}/`,
            headers: header
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
            toast.error("WishList Item Deleted")
        })
    }

    return (
        <div>
            <div className="row justify-content-center mb-3">
                <div className="col-md-12 col-xl-10">
                    <div className="card border-0 shadow rounded-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                        <img
                                            style={{maxWidth: "100px"}}
                                            src={`${domain}${item.image}`}
                                            className="" alt=""/>
                                        <Link to="#">
                                            <div className="hover-overlay">
                                                <div className="mask"></div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-6">
                                    <h5>{item?.title}</h5>
                                    <div className="mt-1 mb-0 ">
                                        <span>{item?.category?.title}</span>
                                        <span className="text-primary"> • </span>
                                    </div>
                                    <br/>
                                    <p className="text-truncate mb-4 mb-md-0 text-muted small">
                                        {item?.description}
                                    </p>
                                    <button onClick={() => deleteWishItem(item?.id)} className="btn btn-danger btn-sm mt-3">Remove</button>
                                </div>
                                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                    <div className="d-flex flex-row align-items-center mb-1">
                                        <h4 className="mb-1 me-1">${item?.selling_price}</h4>
                                        <span className="text-danger"><s>${item?.market_price}</s></span>
                                    </div>

                                    <div className="d-flex flex-column mt-4">
                                        <Link to={`/product/${item.id}`} className="btn btn-primary btn-sm" type="button">Details</Link>
                                        <button onClick={() => addtocart(item?.id)}
                                                className="btn btn-outline-primary btn-sm mt-2" type="button">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleWishList;
