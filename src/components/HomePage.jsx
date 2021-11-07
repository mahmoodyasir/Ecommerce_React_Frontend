import React, {useEffect, useState} from "react";
import Axios from "axios";
import {domain} from "../env";
import SingleProduct from "./SingleProduct";
import {Link} from "react-router-dom";

const HomePage = () => {
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState(null);
    useEffect(()=>{
        const getdata=async () =>{
            await Axios({
                method:"get",
                url:`${domain}/api/product/`
            }).then(response => {
                // console.log(response.data);
                setProducts(response.data)
            })
        }
        getdata()
    },[])
    useEffect(()=>{
        const getCategories = async () =>{
            await Axios({
                method: "get",
                url: `${domain}/api/category/`
            }).then(response => {
                // console.log(response.data);
                setCategory(response.data)
            })
        }
        getCategories()
    },[])
    const next_products=async () =>{
        await Axios({
            method: "get",
            url: products?.next
        }).then(response=>{
            console.log(response.data);
            setProducts(response.data)
        })
    }

    const previous_products=async () =>{
        await Axios({
            method: "get",
            url: products?.previous
        }).then(response=>{
            console.log(response.data)
            setProducts(response.data)
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                    <div className="row">
                        {
                        products !== null &&
                            products?.results.map((item,i)=>(
                                <div key={i} className="col-md-4 my-2">
                                    <SingleProduct item={item}/>
                                </div>
                            ))
                    }
                    <div className="homepage__pagination">
                        <div>
                            {
                                products?.previous !== null ? (
                                    <button onClick={previous_products} className="btn btn-danger">Previous</button>
                                ):(
                                    <button className="btn btn-danger" disabled>Previous</button>
                                )
                            }

                        </div>
                        <div>
                            {
                                products?.next !== null ? (
                                     <button onClick={next_products} className="btn btn-success">Next</button>
                                ):(
                                     <button className="btn btn-success" disabled>Next</button>
                                )
                            }

                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <h1>All Categories</h1>
                    {
                        category !== null &&
                            category?.map((category, i)=>(
                                <div key={i} className="my-2">
                                    <Link to={`/category/${category.id}`} className="btn btn-success">{category?.title}</Link>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage