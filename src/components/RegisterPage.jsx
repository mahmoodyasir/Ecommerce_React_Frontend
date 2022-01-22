import React, {useState} from "react";
import Axios from "axios";
import {domain} from "../env";
import {useHistory} from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirmpassword] = useState(null);
    const history = useHistory()

    const registernewuser = async () => {
        if (password !== confirmpassword)
        {
            alert("Password not matched !! Try Again .... ")
        }
        else
        {
            await Axios({
                method: "post",
                url: `${domain}/api/register/`,
                data: {
                    "username": username,
                    "password": password
                }
            }).then(response => {
                // console.log(response.data)
                alert(response.data['message'])
                history.push("/login")
            })
        }
    }
    return (
        <div className="container">
            <h1 className="display-6">Registration</h1>
            <div className="form-group">
                <label>Username</label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Username"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"/>
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input onChange={(e) => setConfirmpassword(e.target.value)} type="password" className="form-control" placeholder="Confirm Password"/>
            </div>

            <button onClick={registernewuser} className="btn btn-info my-2">Register</button>

        </div>
    )
}

export default RegisterPage