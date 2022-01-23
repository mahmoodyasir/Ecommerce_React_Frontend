import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom'
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {domain} from "../env";

const Admin_Product_Details = () => {
    const [{ only_product,category_product, admin_profile }, dispatch] = useGlobalState();
    const [product, setProduct] = useState(null);
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {

            const getdata = async () =>{
                await Axios({
                    method: "get",
                    url: `${domain}/api/product/${id}/`
                }).then(response =>{
                    console.log(response.data);
                    setProduct(response.data)
                    dispatch({
                        type: "ADMIN_PROFILE",
                        admin_profile: response.data
                    })
                })
            }
            getdata()
    }, [id])

    return (
        <div className="container">
            {
                <div className="row">
                    <div className="col-md-6 image_resize my-4">
                        <img src={product?.image} alt="Card image cap"/>
                    </div>

                    <div className="col-md-4 card border-primary my-4 mb-3">
                        <div className="card-header">Product Description</div>
                        <div className="card-body text-primary">
                            <h5 className="card-title display-6 my-2">{product?.title}</h5>
                            <p className="card-text">{product?.description}</p>
                        </div>
                    </div>

                    <div className="col-md-3 card text-white bg-primary mb-3">
                        <h1 className="display-6">{product?.title}</h1>
                        <h3> Price: <del>{product?.market_price}$</del> {product?.selling_price}$</h3>
                    </div>

                    <div className="col-md-9"></div>
                    <div className="col-md-2 card bg-light mb-3">
                        <h3 className="card-title">Category:</h3>
                    </div>
                     <div className="col-md-2 card text-white bg-success mb-3 btn mx-2">
                        <h3>{product?.category?.title}</h3>
                    </div>

                </div>

            }
        </div>
    )
}

export default Admin_Product_Details;