import React, {useContext, useEffect, useState} from "react";
import Axios from "axios";
import {domain, header} from "../env";
import SingleProduct from "./SingleProduct";
import {Link} from "react-router-dom";
import "../admin_components/CSS/All_Order.css"
import './css/home.css'
import CarouselBar from "./Carousel";
import Category from "./Category";
import {stateContext, useGlobalState} from "../state/provider";

const HomePage = () => {
    const [{only_product}, dispatch] = useGlobalState();
    const {currentPage, setCurrentPage} = useContext(stateContext);
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState(null);
    // const [currentPage, setCurrentPage] = useState(1);
    let i = 0;
    // useEffect(() => {
    //     const getdata = async () => {
    //         await Axios({
    //             method: "get",
    //             url: `${domain}/api/product/`
    //         }).then(response => {
    //             // console.log(response.data);
    //             setProducts(response.data)
    //         })
    //     }
    //     getdata()
    // }, [])

    useEffect(() => {
        const getCategories = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/category/`
            }).then(response => {
                // console.log(response.data);
                setCategory(response.data)
            })
        }
        getCategories()
    }, [])
    const next_products = async () => {
        setCurrentPage(currentPage + 1)
        await Axios({
            method: "get",
            url: only_product?.next
        }).then(response => {
            // console.log(response.data);
            // setProducts(response.data)
            dispatch({
                type: "ONLY_PRODUCT",
                only_product: response.data
            })
        })
    }

    const previous_products = async () => {
        setCurrentPage(currentPage - 1)
        await Axios({
            method: "get",
            url: only_product?.previous
        }).then(response => {
            // console.log(response.data)
            // setProducts(response.data)
            dispatch({
                type: "ONLY_PRODUCT",
                only_product: response.data
            })
        })
    }

    const getPageNumber = async (num) => {
        setCurrentPage(num)
        await Axios({
            method: "get",
            url: `${domain}/api/product/?page=${num}`
        }).then(response => {
            // console.log(response.data)
            // setProducts(response.data)
            dispatch({
                type: "ONLY_PRODUCT",
                only_product: response.data
            })
        })
    }

    return (
        <div className="container index mt-0">
            <div className="w-100 mb-5">
                <CarouselBar/>
            </div>

            <div className="row mb-5">
                <h1 className="display-6 text-center mb-5">All Brand Category</h1>
                <div className="col-md-12">
                    <div className="row">
                        {
                            category !== null &&
                            category?.map((category, i) => (
                                <div key={i} className="col-md-6 col-lg-4 my-2">
                                    {/*<Link to={`/category/${category.id}`} className="btn btn-outline-info">{category?.title}</Link>*/}
                                    <Category category={category}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="row">
                <h1 className="display-6 text-center mb-5">All Products</h1>
                <div className="col-md-12">
                    <div className="row">
                        {
                            only_product !== null &&
                            only_product?.results.map((item, i) => (
                                <div key={i} className="col-md-6 col-lg-3 my-2">
                                    <SingleProduct item={item} identity={1}/>
                                </div>
                            ))
                        }
                        <div className="homepage__pagination">
                            <div>
                                {
                                    only_product?.previous !== null ? (
                                        <button onClick={previous_products}
                                                className="btn btn-outline-danger">Previous</button>
                                    ) : (
                                        <button className="btn btn-outline-danger" disabled>Previous</button>
                                    )
                                }

                            </div>

                            <div>
                                <nav aria-label="...">
                                    <ul className="pagination pagination-lg">
                                        {
                                            only_product !== null &&
                                            [...Array(Math.ceil(((only_product?.count) / 8)))].map((_, index) => (
                                                currentPage === (index + 1) ?
                                                    <>
                                                        <li key={index} className="page-item pagination_item active"
                                                            onClick={() => getPageNumber(index + 1)}><span
                                                            className="page-link">{index + 1}</span></li>
                                                    </>
                                                    :
                                                    <>
                                                        <li key={index} className="page-item pagination_item"
                                                            onClick={() => getPageNumber(index + 1)}><span
                                                            className="page-link">{index + 1}</span></li>
                                                    </>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>

                            <div>
                                {
                                    only_product?.next !== null ? (
                                        <button onClick={next_products}
                                                className="btn btn-outline-success">Next</button>
                                    ) : (
                                        <button className="btn btn-outline-success" disabled>Next</button>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className="col-md-3 padding text-center">*/}
                {/*    <h1 className="display-5">All Categories</h1>*/}
                {/*    {*/}
                {/*        category !== null &&*/}
                {/*            category?.map((category, i)=>(*/}
                {/*                <div key={i} className="my-2">*/}
                {/*                    <Link to={`/category/${category.id}`} className="btn btn-outline-info">{category?.title}</Link>*/}
                {/*                </div>*/}
                {/*            ))*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default HomePage