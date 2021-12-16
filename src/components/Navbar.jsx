import React from "react";
import {Link} from "react-router-dom";
import {useGlobalState} from "../state/provider";

const Navbar = () => {
    const [{profile, cart_incomplete}, dispatch] = useGlobalState()
    let cart_product_length = 0
    if (cart_incomplete !== null)
    {
        cart_product_length = cart_incomplete?.cartproduct?.length
    }
    else
    {
        cart_product_length = 0
    }

    // console.log(profile, " From Navbar Page")

    const logout = () => {
        window.localStorage.clear()
        dispatch({
            type: "ADD_PROFILE",
            profile: null
        })
        window.location.href = '/'
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Ecommerce </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">

                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {
                        profile !== null ?
                            (
                                <>
                                    <Link className="nav-link" to="/cart">Cart({cart_product_length})</Link>
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                    <Link onClick={logout} className="nav-link" to="">Logout</Link>
                                </>
                            )
                            :
                            (
                                <>
                                    <Link className="nav-link" to="/login">Login</Link>
                                    <Link className="nav-link" to="/register">Registration</Link>
                                </>
                            )
                    }



                </div>
            </div>
        </nav>
    )
}

export default Navbar