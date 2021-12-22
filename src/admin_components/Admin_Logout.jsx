import React from "react";
import {useGlobalState} from "../state/provider";

export const Admin_Logout = () => {
    const [{admin_profile}, dispatch] = useGlobalState()
        window.localStorage.clear()
        dispatch({
            type: "ADMIN_PROFILE",
            admin_profile: null
        })
        window.location.href = '/admin_login'
    }