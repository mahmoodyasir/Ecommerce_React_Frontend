import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {admin_header, domain} from "../env";
import Single_Customer_Profile from "./Single_Customer_Profile";

const All_Customer_Profile = () => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const get_customer_data = async () => {
            await Axios ({
                method: "get",
                url: `${domain}/api/user_profile/`,
                headers: admin_header
            }).then(response => {
                console.log(response.data["data"])
                setCustomer(response.data["data"])
            })
        }
        get_customer_data()
    }, []);


    return (
        <div className="container">

                <div className="col-md-9-fluid">
                    <h1 className="display-6 mb-5">All Customers Profile</h1>
                    <div className="row">
                        {
                            customer !== null &&
                                customer?.map((item,i) => (
                                    <div key={i} className="col-md-4 my-2">
                                        <Single_Customer_Profile item={item} />
                                    </div>
                                ))
                        }

                </div>
            </div>
        </div>
    );
};

export default All_Customer_Profile;
