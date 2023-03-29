import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {admin_header, domain} from "../env";
import {useGlobalState} from "../state/provider";

const Admin_User = () => {
    const [{admin_profile}, dispatch] = useGlobalState()
    const [admin_user_detect, setAdmin_user_detect] = useState(null);
    const [number, setNumber] = useState(null);

    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    const [f_name, setF_name] = useState(null);
    const [l_name, setL_name] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirm_password, setConfirm_password] = useState(null);

    const admin_user_create = async () => {

        if (password !== confirm_password)
        {
            alert("Password not matched !! Try Again .... ")
        }
        else
        {
            const formdata = new FormData()
            formdata.append("username", user)
            formdata.append("email", email)
            formdata.append("first_name", f_name)
            formdata.append("last_name", l_name)
            formdata.append("password", password)
            await Axios({
                method: "post",
                url: `${domain}/api/admin_user/`,
                headers: admin_header,
                data: formdata

            }).then(response => {
                let value = response.data['error']
                console.log(value)
                if (value === false){
                    alert(response.data["message"])
                    dispatch({
                        type: "ADMIN_PROFILE",
                        admin_profile: response.data
                    })
                }
                else {
                    alert(response.data["message"] + "\n" + "Please Input Valid Data")
                }
            })
        }

    }

    useEffect(() => {
        const admin_user_list = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/data_count/`,
                headers: admin_header
            }).then(response => {
                // console.log(response.data)
                setAdmin_user_detect(response.data)
                setNumber(response.data["admin_profile"].length)
                dispatch({
                        type: "ADMIN_PROFILE",
                        admin_profile: response.data
                    })
            })
        }
        admin_user_list()
    }, [admin_profile]);

    const delete_admin_user = async (id) => {
        if (number <= 1)
        {
            alert("You cannot delete last Admin User")
        }
        else
        {
                await Axios({
                method: "post",
                url: `${domain}/api/delete_admin_user/`,
                headers: admin_header,
                data: {
                    "id": id
                }
            }).then(response => {
                console.log(response.data)
                dispatch({
                            type: "ADMIN_PROFILE",
                            admin_profile: response.data
                        })
            })
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 my-2 mx-auto">
                    <h1 className="display-6 fw-bold">Create an Admin User</h1>
                    <div className="form-group">
                        <label>Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" value={email}/>
                    </div>

                    <div className="form-group">
                        <label>Username:</label>
                        <input onChange={(e) => setUser(e.target.value)} type="text" className="form-control" value={user}/>
                    </div>

                    <div className="form-group">
                        <label>First Name:</label>
                        <input onChange={(e) => setF_name(e.target.value)} type="text" className="form-control" value={f_name}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input onChange={(e) => setL_name(e.target.value)} type="text" className="form-control" value={l_name}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" value={password}/>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input onChange={(e) => setConfirm_password(e.target.value)} type="password" className="form-control" value={confirm_password}/>
                    </div>

                    <button onClick={admin_user_create} className="btn btn-success my-2">Create</button>

                </div>

                <div className="col-md-6 mx-auto">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>id</th>
                                <th>username</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            admin_user_detect?.admin_profile?.map((item, i)=>(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name} {item.last_name}</td>
                                    <td>
                                        <button onClick={() => delete_admin_user(item?.id)}  className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin_User;
