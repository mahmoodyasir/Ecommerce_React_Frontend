import React, {useState} from "react";
import {useGlobalState} from "../state/provider";
import {domain, header} from "../env";
import Axios from "axios";

const ProfilePage = () => {
    const [{profile}, dispatch] = useGlobalState()
    // console.log(profile, " $$$$$ This is from Profile Page")
    const [email, setEmail] = useState(profile?.prouser?.email);
    const [firstname, setFirstname] = useState(profile?.prouser?.first_name);
    const [lastname, setLastname] = useState(profile?.prouser?.last_name);
    const [image, setImage] = useState(null);
    // console.log(image, " $$$$$$$$ This is profile image")

    const userdataupdate = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/userdataupdate/`,
            headers:header,
            data:{
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
            headers:header,
            data: formdata
        }).then(response => {
            console.log(response.data)
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="media">
                    <img src={`${domain}${profile?.image}`} className="rounded-circle account-image" />
                    <div className="media-body">
                        <h2>Username: {profile?.prouser?.username}</h2>
                        <p>{profile?.prouser?.email}</p>
                        <p>{profile?.prouser?.first_name} {profile?.prouser?.last_name}</p>
                    </div>
                </div>


                <div className="col-md-5">
                    <div className="form-group">
                        <label >Profile Image:</label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control"/>
                        <button onClick={update_profile_image} className="btn btn-info my-2">Upload</button>
                    </div>
                    <div className="form-group">
                        <label >Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" value={email}/>
                    </div>

                    <div className="form-group">
                        <label >First Name:</label>
                        <input onChange={(e) => setFirstname(e.target.value)} type="text" className="form-control" value={firstname}/>
                    </div>

                    <div className="form-group">
                        <label >Last Name:</label>
                        <input onChange={(e) => setLastname(e.target.value)} type="text" className="form-control" value={lastname}/>
                    </div>
                    <button onClick={userdataupdate} className="btn btn-success my-2">Update</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage