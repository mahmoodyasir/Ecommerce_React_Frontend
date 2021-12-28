import React, {useEffect, useState} from "react";
import Axios from "axios";
import {admin_header, domain, header} from "../env";
import {useGlobalState} from "../state/provider";
import Select from "react-select/base";
import ProductDetails from "../components/ProductDetails";
import {Link} from "react-router-dom";
import SunEditor from "suneditor-react";

const Only_Products = () => {

    const [{ only_product,category_product, admin_profile }, dispatch] = useGlobalState();
    const [num, setNum] = useState(0);
    const [all_category, setAll_category] = useState(null);
    const [product_name, setProduct_name] = useState(null);
    const [image, setImage] = useState(null);
    const [market_price, setMarket_price] = useState(null);
    const [sell_price, setSell_price] = useState(null);
    const [desc, setDesc] = useState(null);


    const add_product = async () => {
        const formdata = new FormData()
        formdata.append("title", product_name);
        formdata.append("category", all_category);
        formdata.append("image", image);
        formdata.append("market_price", market_price);
        formdata.append("selling_price", sell_price);
        formdata.append("description", desc);

        await Axios({
            method: "post",
            url: `${domain}/api/add_product/`,
            headers: admin_header,
            data: formdata

        }).then(response => {
            dispatch({
                type: "ADMIN_PROFILE",
                admin_profile: response.data
            })
        })
    }


    const next_products = async () =>{
        await Axios({
            method: "get",
            url: only_product?.next
        }).then(response=>{
            dispatch({
                     type: "ONLY_PRODUCT",
                     only_product: response.data
                })
        })
    }

    const previous_products=async () =>{
        await Axios({
            method: "get",
            url: only_product?.previous
        }).then(response=>{
           dispatch({
                     type: "ONLY_PRODUCT",
                     only_product: response.data
                })
        })
    }

    const deleteproduct = async (id) => {
        await Axios({
            method: 'delete',
            url: `${domain}/api/product_delete/${id}/`,
            headers: admin_header
        }).then(response => {
            console.log(response.data)
            alert("Product Deleted")
            dispatch({
                type: "ADMIN_PROFILE",
                admin_profile: response.data
            })

        })
    }


    return (

        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Product Name</th>
                                <th>Brand Category</th>
                                <th>Price</th>
                                <th>Discount Price</th>
                                <th>Details</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            only_product?.results?.map((item, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.category?.title}</td>
                                    <td>{item.market_price}</td>
                                    <td>{item.selling_price}</td>
                                    <td>
                                        <Link to={`/admin_action/add_product/product_details/${item.id}`} target="_blank" className="btn btn-info">Details</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteproduct(item?.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>

                    </table>

                    <div className="homepage__pagination">
                        <div>
                            {
                                only_product?.previous !== null ? (
                                    <button onClick={previous_products} className="btn btn-danger">Previous</button>
                                ):(
                                    <button className="btn btn-danger" disabled>Previous</button>
                                )
                            }

                        </div>
                        <div>
                            {
                                only_product?.next !== null ? (
                                     <button onClick={next_products} className="btn btn-success">Next</button>
                                ):(
                                     <button className="btn btn-success" disabled>Next</button>
                                )
                            }

                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <h1>Add New Product</h1>
                    <div>

                    <div className="form-group my-3">
                        <label>Products Name</label>
                        <input onChange={e => setProduct_name(e.target.value)} type="text" className="form-control" placeholder="Write Product Names"/>
                    </div>

                   <div className="form-group my-3">
                        <label>Category</label>
                       <select onChange={e => setAll_category(e.target.value)} className="form-control"  value={all_category}>

                           {
                               category_product?.map((item, index) => {
                                   return <option value={item.id} key={index}>{item.title}</option>
                               })
                           }

                       </select>
                    </div>

                    <div className="form-group my-3">
                        <label >Product Image:</label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control"/>
                    </div>

                    <div className="form-group my-3">
                        <label >Market Price:</label>
                        <input onChange={(e) => setMarket_price(e.target.value)} type="number" className="form-control" placeholder="Enter Market Price"/>
                    </div>

                    <div className="form-group my-3">
                        <label >Discount Price:</label>
                        <input onChange={(e) => setSell_price(e.target.value)} type="number" className="form-control" placeholder="Enter Discount Price"/>
                    </div>

                     <div className="form-group my-3">
                        <label>Product Description:</label>
                        <textarea onChange={(e) => setDesc(e.target.value)} className="form-control" placeholder="Write Product Description"/>
                    </div>

                    <button onClick={add_product} className="btn btn-primary my-2">Add To Product</button>

                </div>
                </div>


            </div>
        </div>
    )
}

export default Only_Products;