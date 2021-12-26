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
import Admin_Profile from "./admin_components/Admin_Profile";
import {Admin_Logout} from "./admin_components/Admin_Logout";
import Add_Category from "./admin_components/Add_Category";
import Only_Products from "./admin_components/Add_Product";
import Admin_Product_Details from "./admin_components/Admin_Product_Details";
import All_Orders from "./admin_components/All_Orders";
import Order_Control from "./admin_components/Order_Control";

const App = () =>{
    // console.log(userToken, " this is userToken")
    const [{profile, page_reload, admin_profile, cart_incomplete, cart_complete, category_product, only_product, all_orders}, dispatch] = useGlobalState()
    // console.log(cart_complete, "#### cart complete ####")
    // console.log(cart_incomplete, "#### cart Incomplete ####")
    // console.log(profile, "$$$ User Profile")

    useEffect(() => {
        if (userToken !== null)
        {
            const getdata = async () =>{
                await Axios({
                    method: "get",
                    url: `${domain}/api/profile/`,
                    headers: header
                }).then(response => {
                    // console.log(response.data["data"], " $$$$$$$$ user profile data");
                    dispatch({
                        type:"ADD_PROFILE",
                        profile:response.data["data"]
                    })
                })
            }
            getdata()
        }
    }, [dispatch, page_reload]);

    useEffect(() => {
        if (adminToken !== null)
        {
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
            }).then(response =>{
                // console.log(response.data, " CART");
                {
                    const all_data = []
                    // eslint-disable-next-line array-callback-return
                    response?.data.map(data => {
                        if (data.complete)
                        {
                            all_data.push(data)
                            dispatch({
                                type: "ADD_CARTCOMPLETE",
                                cart_complete: all_data
                            })
                        }
                        else
                        {
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
                url: `${domain}/api/category/`,
                headers: admin_header
            }).then(response =>{
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
        const  only_product = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/product/`,
                headers: admin_header
            }).then(response =>{
                // console.log(response.data, " ONLY PRODUCTS ");
                dispatch({
                     type: "ONLY_PRODUCT",
                     only_product: response.data
                })
            })
        }
        only_product()
    }, [dispatch, admin_profile]);



  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/admin_login" component={admin_login}/>
              {
                  admin_profile !== null ? (
                      <>
                           {/*<Route exact path="/admin_dashboard" component={Admin_dashboard}/>*/}
                          <Admin_dashboard />
                          <Switch>
                                <Route exact path="/profile_role/admin_profile" component={Admin_Profile}/>
                                <Route exact path="/admin_action/add_category" component={Add_Category}/>
                                <Route exact path="/admin_action/add_product" component={Only_Products}/>
                                <Route exact path="/admin_action/add_product/product_details/:id" component={Admin_Product_Details}/>
                                <Route exact path="/order_page/all_order" component={All_Orders}/>
                                <Route exact path="/admin_logout" component={Admin_Logout}/>
                          </Switch>
                      </>
                  ):
                      ("")
              }
              {
                  profile !== null ? (
                      <>
                          <Navbar/>
                          <Route exact path="/profile" component={ProfilePage} />
                          <Route exact path="/cart" component={Cart} />
                          <Route exact path="/oldorders" component={Oldorders} />
                          <Route exact path="/order" component={Order} />
                          <Route exact path="/orderdetails/:id" component={OrderDetails} />

                          <Route exact path="/" component={HomePage}/>
                          <Route exact path="/product/:id" component={ProductDetails}/>
                          <Route exact path="/category/:id" component={CategoryProducts}/>
                      </>
                  ):
                      (
                          <>
                              <Navbar/>
                              <Route exact path="/login" component={LoginPage} />
                              <Route exact path="/register" component={RegisterPage} />

                              <Route exact path="/" component={HomePage}/>
                              <Route exact path="/product/:id" component={ProductDetails}/>
                              <Route exact path="/category/:id" component={CategoryProducts}/>
                          </>
                      )

              }

              <Route exact component={HomePage}/>
          </Switch>
      </BrowserRouter>
  )
}

export default App;
