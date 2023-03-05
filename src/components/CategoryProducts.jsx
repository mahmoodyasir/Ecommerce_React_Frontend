import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Axios from "axios";
import {domain} from "../env";
import SingleProduct from "./SingleProduct";
import {MdOutlineArrowBack} from "react-icons/md";

const CategoryProducts = () => {
    const [category, setCategory] = useState(null);
    const {id} = useParams()
    useEffect(() => {
        const getcategoryproduct = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/category/${id}/`
            }).then(response => {
                // console.log(response.data[0]);
                setCategory(response.data[0])
            })
        }
        getcategoryproduct()
    }, [id]);

    return (
        <div className="container">
            {
                category?.category_products.length !== 0 ?
                    <>
                        <div className="mb-5">
                            <h1 className="display-6">Brand: <span>{category?.title}</span></h1>
                            <h2>Showing All Products Under <span
                                className="text-info">{category?.title}</span> Category</h2>
                            <Link className="text-decoration-none btn btn-outline-info" to="/"><MdOutlineArrowBack className="fs-5"/> Back</Link>
                        </div>
                    </> :
                    <>
                        <div>
                            <h2 className="mb-5">Sorry ! No Products Found Under <span
                                className="text-info">{category?.title}</span> Category</h2>
                            <Link className="text-decoration-none btn btn-outline-info" to="/"><MdOutlineArrowBack className="fs-5"/> Back</Link>
                        </div>
                    </>
            }
            <div className="row">
                {
                    category !== null &&
                    category?.category_products.map((product, i) => (
                        <div key={i} className="col-md-3 my-2">
                            <SingleProduct item={product}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryProducts