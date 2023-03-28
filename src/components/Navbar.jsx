import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useGlobalState} from "../state/provider";
import * as GiIcon from "react-icons/gi";
import '../components/css/nav.css'
import SearchBox from "./SearchBox";

const Navbar = () => {
    const [{profile, cart_incomplete}, dispatch] = useGlobalState();
    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("/");
    let quantity = 0;

    for (let i = 0; i < cart_incomplete?.cartproduct?.length; i++) {
        quantity = quantity + (cart_incomplete?.cartproduct[i]?.quantity);
    }

    // let cart_product_length = 0
    // if (cart_incomplete !== null) {
    //     cart_product_length = cart_incomplete?.cartproduct?.length
    // } else {
    //     cart_product_length = 0
    // }

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
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light main-nav">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/">Mobile Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto item-effect">
                            <li className="nav-item">
                                <Link
                                    className={splitLocation[1] === "" ? "nav-link items text-white activeBtn" : "nav-link items text-white"}
                                    to="/">Home</Link>
                            </li>

                            {
                                profile !== null ?
                                    <>
                                        <li className="nav-item">
                                            {/*({cart_product_length})*/}
                                            <Link
                                                className={splitLocation[1] === "cart" || splitLocation[1] === "order" || splitLocation[1] === "oldorders" ? "nav-link items text-white activeBtn" : "nav-link items text-white"}
                                                to="/cart">Cart({quantity})</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className={splitLocation[1] === "profile" ? "nav-link items text-white activeBtn" : "nav-link items text-white"}
                                                to="/profile">Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={splitLocation[1] === "wishlist" ? "nav-link items text-white activeBtn" : "nav-link items text-white"}
                                                  to="/wishlist">Wishlist</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link onClick={logout}
                                                  className={splitLocation[1] === "logout" ? "nav-link items text-white activeBtn" : "nav-link items text-white"}
                                                  to="">Logout</Link>
                                        </li>

                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link
                                                className={splitLocation[1] === "login" ? "nav-link items text-white activeBtn" : "nav-link items text-white"}
                                                to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                className={splitLocation[1] === "register" ? "nav-link items text-white activeBtn" : "nav-link items text-white"}
                                                to="/register">Registration</Link>
                                        </li>
                                    </>
                            }

                        </ul>
                        <div className="searchbox">
                            <SearchBox/>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar