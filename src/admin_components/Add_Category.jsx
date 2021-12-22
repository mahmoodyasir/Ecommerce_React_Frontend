import React, {useEffect, useState} from "react";
import Axios from "axios";
import {admin_header, domain} from "../env";
import {useGlobalState} from "../state/provider";

const Add_Category = () => {

    const [{ category_product, admin_profile }, dispatch] = useGlobalState();
    const [all_category, setAll_category] = useState(null);
    const [category_name, setCategory_name] = useState(null);

    const add_category = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/add_category/`,
            headers: admin_header,
            data: {
                "title": category_name
            }
        }).then(response => {
            dispatch({
                type: "ADMIN_PROFILE",
                admin_profile: response.data
            })
        })
    }

    const delete_category = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/delete_category/`,
            headers: admin_header,
            data: {
                "id": id
            }
        }).then(response => {
            dispatch({
                type: "ADMIN_PROFILE",
                admin_profile: response.data
            })
        })
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Brand Category</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            category_product?.map((item, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <button onClick={() => delete_category(item.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>

                    </table>
                </div>

                <div className="col-md-6">
                    <h1>Add New Category</h1>
                    <div>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input onChange={e => setCategory_name(e.target.value)} type="text" className="form-control" placeholder="Write Category Names"/>
                    </div>
                    <button onClick={add_category} className="btn btn-success my-2">Add To Category</button>
                </div>
                </div>


            </div>
        </div>
    )
}

export default Add_Category;