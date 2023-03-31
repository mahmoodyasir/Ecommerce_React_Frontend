import React, {useEffect} from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import CategoryProducts from "./components/CategoryProducts";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import Axios from "axios";
import {admin_header, adminToken, domain, header, userToken} from "./env";
import {useGlobalState} from "./state/provider";
import Cart from "./components/Cart";
import Oldorders from "./components/Oldorders";
import Order from "./components/Order";
import OrderDetails from "./components/OrderDetails";
import admin_login from "./admin_components/admin_login";
import Admin_dashboard from "./admin_components/admin_dashboard";
import {Admin_Logout} from "./admin_components/Admin_Logout";
import Add_Category from "./admin_components/Add_Category";
import Only_Products from "./admin_components/Add_Product";
import Admin_Product_Details from "./admin_components/Admin_Product_Details";
import All_Orders from "./admin_components/All_Orders";
import Order_Control from "./admin_components/Order_Control";
import User_Control_Admin from "./admin_components/User_Control_Admin";
import Admin_HomePage from "./admin_components/Admin_HomePage";
import All_Customer_Profile from "./admin_components/All_Customer_Profile";
import Admin_User from "./admin_components/Admin_User";
import Single_Customer_Profile from "./admin_components/Single_Customer_Profile";
import Incomplete_Orders from "./admin_components/Incomplete_Orders";
import SuccessRoute from "./components/OnlinePayment/SuccessRoute";
import FailedRoute from "./components/OnlinePayment/FailedRoute";
import WishList from "./components/WishList/WishList";
import {Toaster} from "react-hot-toast";

const App = () => {
    // console.log(userToken, " this is userToken")
    const [{
        profile,
        page_reload,
        admin_profile,
        only_product
    }, dispatch] = useGlobalState()
    // console.log(cart_complete, "#### cart complete ####")
    // console.log(cart_incomplete, "#### cart Incomplete ####")
    // console.log(profile, "$$$ User Profile")

    useEffect(() => {
        if (userToken !== null) {
            const getdata = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/profile/`,
                    headers: header
                }).then(response => {
                    // console.log(response.data["data"], " $$$$$$$$ user profile data");
                    dispatch({
                        type: "ADD_PROFILE",
                        profile: response.data["data"]
                    })
                })
            }
            getdata()
        }
    }, [dispatch, page_reload]);

    useEffect(() => {
        if (adminToken !== null) {
            const getadmindata = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/admin_profile/`,
                    headers: admin_header
                }).then(response => {
                    // console.log(response.data)
                    dispatch({
                        type: "ADMIN_PROFILE",
                        admin_profile: response.data["data"]
                    })
                })
            }
            getadmindata()
        }

    }, [dispatch, page_reload]);


    useEffect(() => {
        const getcart = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/cart/`,
                headers: header
            }).then(response => {
                // console.log(response.data, " CART");
                {
                    const all_data = []
                    // eslint-disable-next-line array-callback-return
                    response?.data.map(data => {
                        if (data.complete) {
                            all_data.push(data)
                            dispatch({
                                type: "ADD_CARTCOMPLETE",
                                cart_complete: all_data
                            })
                        } else {
                            dispatch({
                                type: "ADD_CARTINCOMPLETE",
                                cart_incomplete: data
                            })
                        }
                    })
                }
            })
        }
        getcart()
    }, [dispatch, page_reload]);


    useEffect(() => {
        const category = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/category/`
            }).then(response => {
                // console.log(response.data, " CATEGORY ");
                {
                    const category_data = []
                    // eslint-disable-next-line array-callback-return
                    response?.data.map(data => {

                        category_data.push(data)
                        dispatch({
                            type: "CATEGORY_PRODUCT",
                            category_product: category_data
                        })

                    })
                }
            })
        }
        category()
    }, [dispatch, admin_profile]);


    useEffect(() => {
        const only_product = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/product/`,

            }).then(response => {
                // console.log(response.data, " ONLY PRODUCTS ");
                dispatch({
                    type: "ONLY_PRODUCT",
                    only_product: response.data
                })
            })
        }
        only_product()
    }, [admin_profile]);

    useEffect(() => {
        const get_search_data = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/search_product/`
            }).then(response => {
                dispatch({
                    type: "ALL_DATA",
                    all_data: response.data
                })
            })
        }
        get_search_data()
    }, [dispatch]);

    useEffect(() => {
        const getWishListItem = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/wishlist/`,
                headers: header
            }).then(response => {
                dispatch({
                    type: "ALL_WISHLIST",
                    all_wishlist: response.data
                })
            })
        }
        getWishListItem();
    }, [dispatch, page_reload, only_product]);


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin_login" component={admin_login}/>
                {
                    admin_profile !== null ? (
                            <>
                                {/*<Route exact path="/admin_dashboard" component={Admin_dashboard}/>*/}
                                <Admin_dashboard/>
                                <Switch>
                                    <Route exact path="/" component={Admin_HomePage}/>
                                    <Route exact path="/admin_action/add_category" component={Add_Category}/>
                                    <Route exact path="/admin_action/add_product" component={Only_Products}/>
                                    <Route exact path="/admin_action/add_product/product_details/:id"
                                           component={Admin_Product_Details}/>
                                    <Route exact path="/admin_action/user_control_admin/:id"
                                           component={User_Control_Admin}/>
                                    <Route exact path="/order_page/all_order" component={All_Orders}/>
                                    <Route exact path="/admin_logout" component={Admin_Logout}/>
                                    <Route exact path="/admin_user" component={Admin_User}/>
                                    <Route exact path="/profile" component={ProfilePage}/>
                                    <Route exact path="/customers" component={All_Customer_Profile}/>
                                    <Route exact path="/order_page/incomplete_order" component={Incomplete_Orders}/>
                                </Switch>
                            </>
                        ) :
                        ("")
                }
                {
                    profile !== null ? (
                            <>
                                <Navbar/>

                                <Switch>
                                    <Route exact path="/profile" component={ProfilePage}/>
                                    <Route exact path="/cart" component={Cart}/>
                                    <Route exact path="/oldorders" component={Oldorders}/>
                                    <Route exact path="/order" component={Order}/>
                                    <Route exact path="/orderdetails/:id" component={OrderDetails}/>

                                    <Route exact path="/" component={HomePage}/>
                                    <Route exact path="/product/:id" component={ProductDetails}/>
                                    <Route exact path="/category/:id" component={CategoryProducts}/>

                                    <Route exact path="/success" component={SuccessRoute}/>
                                    <Route exact path="/failed" component={FailedRoute}/>

                                    <Route exact path="/wishlist" component={WishList}/>
                                </Switch>

                            </>
                        ) :
                        (
                            <>
                                <Navbar/>
                                <div className="mb-5"></div>
                                <Switch>
                                    <Route exact path="/login" component={LoginPage}/>
                                    <Route exact path="/register" component={RegisterPage}/>

                                    <Route exact path="/" component={HomePage}/>
                                    <Route exact path="/product/:id" component={ProductDetails}/>
                                    <Route exact path="/category/:id" component={CategoryProducts}/>
                                </Switch>

                            </>
                        )

                }

                <Route exact component={HomePage}/>
            </Switch>
            <Toaster/>
        </BrowserRouter>
    )
}

export default App;
