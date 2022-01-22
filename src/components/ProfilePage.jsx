import React, {useState} from "react";
import {useGlobalState} from "../state/provider";
import {admin_header, domain, header} from "../env";
import Axios from "axios";
import '../components/css/home.css'

const ProfilePage = () => {
    const [{profile, admin_profile}, dispatch] = useGlobalState()
    // console.log(profile, " $$$$$ This is from Profile Page")
    const [email, setEmail] = useState(profile !== null ? profile?.prouser?.email : admin_profile?.prouser?.email);
    const [firstname, setFirstname] = useState(profile !== null ? profile?.prouser?.first_name : admin_profile?.prouser?.first_name);
    const [lastname, setLastname] = useState(profile !== null ? profile?.prouser?.last_name : admin_profile?.prouser?.last_name);
    const [image, setImage] = useState(null);

    const [oldpass, setOldpass] = useState(null);
    const [newpass, setNewpass] = useState(null);
    // console.log(image, " $$$$$$$$ This is profile image")

    let header_value;
    if (profile !== null)
    {
        header_value = header
    }
    else
    {
        header_value = admin_header
    }

    const userdataupdate = async () => {

        await Axios({
                method: "post",
                url: `${domain}/api/userdataupdate/`,
                headers: header_value,
                data: {
                    "first_name": firstname,
                    "last_name": lastname,
                    "email": email
                }
            }).then(response => {
                console.log(response.data);
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
            })

    }

    const update_profile_image = async () => {
        const formdata = new FormData()
        formdata.append("image", image)

        await Axios({
                method: "post",
                url: `${domain}/api/profile_image_update/`,
                headers: header_value,
                data: formdata
            }).then(response => {
                console.log(response.data)
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
            })

    }

    const change_password = async (oldpass, newpass) => {

        if (newpass.length < 8) {
            alert("Password must be at least 8 character")
        } else if (oldpass === newpass) {
            alert("Your Old Password cannot be the New Password")
        } else {
            await Axios({
                    method: "post",
                    url: `${domain}/api/change_password/`,
                    headers: header_value,
                    data: {
                        "old_pass": oldpass,
                        "new_pass": newpass
                    }
                }).then(response => {
                    console.log(response.data["message"])
                    if (response.data["message"] === true) {
                        alert("Password Changed Successfully")
                    } else {
                        alert("Password not matched !! ")
                    }
                })
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="media">
                    <img src={profile !== null ? `${domain}${profile?.image}` : `${domain}${admin_profile?.image}`}
                         className="rounded-circle account-image"/>
                    <div className="media-body">
                        <h2>Username: {profile !== null ? profile?.prouser?.username : admin_profile?.prouser?.username}</h2>
                        <p>{profile !== null ? profile?.prouser?.email : admin_profile?.prouser?.email}</p>
                        <p>{profile !== null ? profile?.prouser?.first_name + " " + profile?.prouser?.last_name : admin_profile?.prouser?.first_name + " " + admin_profile?.prouser?.last_name}</p>
                    </div>
                </div>


                <div className="col-md-5">
                    <div className="form-group">
                        <label>Profile Image:</label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control"/>
                        <button onClick={update_profile_image} className="btn btn-info my-2">Upload</button>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control"
                               value={email}/>
                    </div>

                    <div className="form-group">
                        <label>First Name:</label>
                        <input onChange={(e) => setFirstname(e.target.value)} type="text" className="form-control"
                               value={firstname}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input onChange={(e) => setLastname(e.target.value)} type="text" className="form-control"
                               value={lastname}/>
                    </div>
                    <button onClick={userdataupdate} className="btn btn-success my-2">Update</button>
                </div>

                <div className="right-side ">
                    <h1>Change Password</h1>
                    <div className="form-group">
                        <label>Old Password:</label>
                        <input onChange={(e) => setOldpass(e.target.value)} type="text" className="form-control"
                               value={oldpass}/>
                    </div>

                    <div className="form-group">
                        <label>New Password:</label>
                        <input onChange={(e) => setNewpass(e.target.value)} type="text" className="form-control"
                               value={newpass}/>
                    </div>
                    <button onClick={(e) => change_password(oldpass, newpass)} className="btn btn-success my-2">Change
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage