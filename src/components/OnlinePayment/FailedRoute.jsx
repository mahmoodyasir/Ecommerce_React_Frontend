import React, {useEffect} from 'react';
import {useGlobalState} from "../../state/provider";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {domain} from "../../env";

const FailedRoute = () => {
    const [{cart_incomplete, profile}, dispatch] = useGlobalState();
    const history = useHistory()

    useEffect(() => {
        Axios({
            method: "get",
            url: `${domain}/api/demo_response/`,
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
            alert("Something Went Wrong")
            history.push("/order")
        })
    }, []);
    return (
        <div>

        </div>
    );
};

export default FailedRoute;
