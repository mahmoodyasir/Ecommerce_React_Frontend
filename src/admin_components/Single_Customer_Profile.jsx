import React from 'react';
import {domain} from "../env";
import '../admin_components/CSS/All_Order.css'

const Single_Customer_Profile = ({item}) => {
    return (
        <div>
            <div className="card mb-3 text-appear">
                <div className="row">
                    <div className="col-md-4">
                        <img className="img-fluid rounded-start h-100" src={item.image} onError={(e)=>{e.target.onerror = null; e.target.src=`${domain}${item.image}`}}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Username: {item?.prouser?.username}</h5>
                            <h6>First Name: {item?.prouser?.first_name}</h6>
                            <h6>Last Name: {item?.prouser?.last_name}</h6>
                            <h6>Email: {item?.prouser?.email}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single_Customer_Profile;
