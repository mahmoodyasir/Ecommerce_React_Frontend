import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import Axios from "axios";
import {domain} from "../env";
import SingleProduct from "./SingleProduct";

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [categoryproducts, setCategoryproducts] = useState(null);
    useEffect(() => {
            const getdata = async () =>{
                await Axios({
                    method: "get",
                    url: `${domain}/api/product/${id}/`
                }).then(response =>{
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
            }).then(response=>{
                console.log(response.data);
                setCategoryproducts(response.data)
            })
        }
    

    return (
            <div className="container">
                {
                    product !== null &&
                    (
                        <div className="row">
                            <div className="image_resize">
                                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <img src={product?.image} alt="Card image cap"/>
                            </div>

                            <div className="col-md-7">
                                <h1>{product?.title}</h1>
                                <h2> Price: <del>{product?.market_price}$</del> {product?.selling_price}$</h2>
                            </div>
                            <div className="colo-md-4">
                                <button className="btn btn-info">Add to Cart</button>
                            </div>
                            <p>{product?.description}</p>
                        </div>
                    )
                }
                <div className="row">
                    <h1>Related Products</h1>
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