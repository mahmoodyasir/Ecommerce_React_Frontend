import React from "react";
import {Link, useHistory} from "react-router-dom";
import Axios from "axios";
import {domain, header} from "../env";
import {useGlobalState} from "../state/provider";

const SingleProduct = ({item}) => {
    const [{profile}, dispatch] = useGlobalState()
    const history = useHistory()
    const addtocart = async (id) => {
        profile !== null ?(
        await Axios({
            method:"post",
            url:`${domain}/api/addtocart/`,
            data:{"id":id},
            headers:header
        }).then(response => {
            console.log(response.data, "$$$$$$$$$$ ADD to CART $$$$$$$");
            dispatch({
                type:"PAGE_RELOAD",
                page_reload:response.data
            })
        })
        ):
             (
                 history.push("/login")
             )
    }
    return (
        <div className="card single_product" >
            <Link to={`/product/${item.id}`}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img className="card-img-top" src={item.image} onError={(e)=>{e.target.onerror = null; e.target.src=`${domain}${item.image}`}}/>
            </Link>

                <div className="card-body">
                    <h5 className="card-title display-6">{item.title}</h5>
                    <p className="card-text text-capitalize text-break">{(item.description).substring(0,100)}.... <Link to={`/product/${item.id}`} target="_blank">see more</Link> </p>
                    <button onClick={()=>addtocart(item.id)} className="btn bg-purple text-white rounded-pill">Add to Cart</button>
                </div>
            <div className="card-footer">
                <h5>price: <del>{item.market_price}$</del> {item.selling_price}$</h5>
            </div>
        </div>
    )
}

export default SingleProduct