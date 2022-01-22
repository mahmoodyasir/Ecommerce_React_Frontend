import React, {useEffect, useState} from 'react';
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {admin_header, domain} from "../env";
import logo from "../image_folder/defaul_img.png";
import sidepic from "../image_folder/swamp.png"
import {Link} from "react-router-dom";
// import './mysass.scss';

const AdminHomePage = () => {
    const [{admin_profile, category_product, only_product, all_order, count_state}, dispatch] = useGlobalState()
    const [obj, setObj] = useState(null);
    let count=0;
    let payment_count_true=0;
    let payment_count_false=0;

    useEffect(() => {
        const data_count = async () => {
            await Axios ({
                get: "post",
                url: `${domain}/api/data_count/`,
                headers: admin_header
            }).then(response => {
                setObj(response.data)
                console.log(response.data)
                dispatch({
                    type: "COUNT_STATE",
                    count_state: response.data
                })

            })
        }
        data_count()
    }, []);

    for (let i=0 ; i<obj?.cart?.length; i++)
    {
        if(obj?.cart[i]?.complete === false)
        {
            count++;
        }
    }

    for (let i=0 ; i<obj?.order?.length; i++)
    {
        if(obj?.order[i]?.payment_complete === false)
        {
            payment_count_false++;
        }
    }

    for (let i=0 ; i<obj?.order?.length; i++)
    {
        if(obj?.order[i]?.payment_complete === true)
        {
            payment_count_true++;
        }
    }

    return (
        <div className="container">

            <div className="col-md-12 my-3 row">
                <div className="card mb-3 col-md-5 bg-success">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="" className="img-fluid rounded-start" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title bg-white rounded beside display-6">Total Product: {obj?.product?.length}</h5>
                            <Link className="card-text btn rounded bg-info" to="/admin_action/add_product" target="_blank">See Products</Link>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3 col-md-5 mx-4 bg-warning">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="" className="img-fluid rounded-start" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title bg-danger text-white rounded beside display-6">Total Customer: {obj?.users?.length}</h5>
                            <Link className="card-text btn rounded bg-indigo text-white" to="/customers" target="_blank">See Customers</Link>

                        </div>
                    </div>
                </div>
            </div>

            </div>


            <div className="col-md-10 my-3">

                <div className="card mb-3 bg-light">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={sidepic} className="img-fluid rounded-start h-100" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-light bg-primary rounded beside display-6">Incomplete Orders: {count}</h5>
                            <h5 className="card-title text-light bg-warning rounded beside display-6">Total orders: {obj?.order?.length}</h5>
                            <h5 className="card-title text-light bg-info rounded beside display-6">Product Category: {obj?.category?.length}</h5>
                            <h5 className="card-title text-light bg-orange rounded beside display-6">Number of Product in Carts: {obj?.cart?.length}</h5>
                            <h5 className="card-title text-light bg-teal rounded beside display-6">Total Product Added In Carts: {obj?.cartproduct?.length}</h5>
                            <h5 className="card-title text-light bg-purple rounded beside display-6">Payment Complete: {payment_count_true}</h5>
                            <h5 className="card-title text-light bg-indigo rounded beside display-6">Payment Incomplete: {payment_count_false}</h5>
                            {/*<p className="card-text btn rounded bg-success text-white">Manage Incomplete Carts</p>*/}

                        </div>
                    </div>
                </div>
            </div>


            </div>



        </div>
    );
};

export default AdminHomePage;
