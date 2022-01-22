import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useGlobalState} from "../state/provider";
import * as GiIcon from "react-icons/gi";
import '../components/css/nav.css'

const Navbar = () => {
    const [{profile, cart_incomplete}, dispatch] = useGlobalState()

    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)


    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])

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
            <div className="head">
                <Link className="navbar-brand head_font" to="/">Mobile Shop </Link>
            </div>


            <nav className="flex-row">
            {(toggleMenu || screenWidth > 600) && (
                <div>
                    <ul className="list">

                        {
                            profile !== null ?
                                (
                                    <>
                                        <Link className="nav-link items" to="/cart">Cart({cart_product_length})</Link>
                                        <Link className="nav-link items" to="/profile">Profile</Link>
                                        <Link onClick={logout} className="nav-link items" to="">Logout</Link>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Link className="nav-link items" to="/login">Login</Link>
                                        <Link className="nav-link items" to="/register">Registration</Link>
                                    </>
                                )
                        }

                    </ul>
                </div>
            )}

            {screenWidth <= 600 ? (
                <GiIcon.GiHamburgerMenu onClick={toggleNav} className="icon"/>
            ) : ("")}

        </nav>
        </div>
    )
}

export default Navbar