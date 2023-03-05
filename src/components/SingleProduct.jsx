import React from "react";
import {Link, useHistory} from "react-router-dom";
import {BsCart4} from "react-icons/bs";
import {ImHeart} from "react-icons/im";
import Axios from "axios";
import {domain, header} from "../env";
import "./css/SingleProduct.css"
import {useGlobalState} from "../state/provider";

const SingleProduct = ({item}) => {
    console.log(item)
    const [{profile}, dispatch] = useGlobalState()
    const history = useHistory()
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
    return (
        <div className="card single_product border-0 shadow rounded-3 mb-5">
            <span className="highlight w-50 text-white fs-5 border-0">{item?.category?.title}</span>
            <div>

                <div className="d-flex justify-content-center">
                    <Link to={`/product/${item.id}`}>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img className="card-img-top mt-2" src={item.image} onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${domain}${item.image}`
                        }}/>
                    </Link>
                </div>

                <div className="card-body">
                    <h5 className="card-title display-6">{item.title}</h5>
                    <h5>Price: <span className="badge bg-warning text-dark me-2"><del>{item.market_price}$</del></span><span
                        className="badge bg-success fs-5">{item.selling_price}$</span></h5>
                    {/*<p className="card-text text-capitalize text-break">{(item.description).substring(0, 100)}.... <Link*/}
                    {/*    to={`/product/${item.id}`} target="_blank">see more</Link></p>*/}
                </div>
                <div className="card-footer border-0 p-0">
                    <button style={{borderBottomLeftRadius:"6px"}} className="border-0 py-2 w-50 bg-indigo text-white ">
                        <span><ImHeart className="fs-4"/> Wishlist</span>
                    </button>
                    <button style={{borderBottomRightRadius:"6px"}} onClick={() => addtocart(item.id)} className="border-0 py-2 w-50 bg-purple text-white ">
                        <span className="nowrap"><BsCart4 className="fs-4"/> Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct