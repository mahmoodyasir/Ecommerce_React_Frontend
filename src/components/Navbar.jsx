import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useGlobalState} from "../state/provider";
import * as GiIcon from "react-icons/gi";
import '../components/css/nav.css'

const Navbar = () => {
    const [{profile, cart_incomplete}, dispatch] = useGlobalState();

    let cart_product_length = 0
    if (cart_incomplete !== null) {
        cart_product_length = cart_incomplete?.cartproduct?.length
    } else {
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
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Mobile Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">

                            {
                                profile !== null ?
                                    <>
                                        <li className="nav-item">
                                            {/*({cart_product_length})*/}
                                            <Link className="nav-link items position-relative"
                                                  to="/cart">Cart({cart_product_length})</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link items" to="/profile">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link onClick={logout} className="nav-link items" to="">Logout</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link items" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link items" to="/register">Registration</Link>
                                        </li>
                                    </>
                            }

                        </ul>
                        <form>
                            <div className="d-flex input-group input-group-lg">
                                <input className="form-control me-2 border-info " type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar