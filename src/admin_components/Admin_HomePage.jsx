import React, {useEffect, useState} from 'react';
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {admin_header, domain} from "../env";

const AdminHomePage = () => {
    const [{admin_profile, category_product, only_product, all_order}, dispatch] = useGlobalState()
    const [order_obj, setOrder_obj] = useState(null);

    useEffect(() => {
        const orders = async () => {
            await Axios ({
                get: "post",
                url: `${domain}/api/orders/`,
                headers: admin_header
            }).then(response => {
                setOrder_obj(response.data)
                console.log(response.data)

            })
        }
        orders()
    }, []);


    return (
        <div className="container">

            <div className="col-md-12 my-3 row">
                <div className="card mb-3 col-md-5 mx-3 bg-success">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="" className="img-fluid rounded-start" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title bg-white rounded beside display-6">Total Product: {only_product?.count}</h5>
                            <p className="card-text btn rounded bg-info">See Products</p>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3 col-md-5 bg-warning">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="" className="img-fluid rounded-start" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title bg-danger rounded beside display-6">Total Customer: 5</h5>
                            <p className="card-text btn rounded bg-secondary text-white">See Customers</p>

                        </div>
                    </div>
                </div>
            </div>

            </div>

            <div className="beside col-md-10">
                <div className="card mb-3 col-md-6 bg-primary">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="" className="img-fluid rounded-start" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title bg-light rounded beside display-6">Incomplete Orders: 2</h5>
                            <p className="card-text btn rounded bg-success text-white">Manage Incomplete Carts</p>

                        </div>
                    </div>
                </div>
            </div>
            </div>



        </div>
    );
};

export default AdminHomePage;
