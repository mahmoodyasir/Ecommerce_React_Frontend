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

const App = () =>{
    // console.log(userToken, " this is userToken")
    const [{profile, page_reload, admin_profile, cart_incomplete, cart_complete}, dispatch] = useGlobalState()
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
                console.log(response.data, " CART");
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


  return (
      <BrowserRouter>
          <Navbar/>
          <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/product/:id" component={ProductDetails}/>
              <Route exact path="/category/:id" component={CategoryProducts}/>
              <Route exact path="/admin_login" component={admin_login}/>
              {
                  admin_profile !== null ? (
                      <>
                          <Route exact path="/admin_dashboard" component={Admin_dashboard}/>
                      </>
                  ):
                      ("")
              }
              {
                  profile !== null ? (
                      <>
                          <Route exact path="/profile" component={ProfilePage} />
                          <Route exact path="/cart" component={Cart} />
                          <Route exact path="/oldorders" component={Oldorders} />
                          <Route exact path="/order" component={Order} />
                          <Route exact path="/orderdetails/:id" component={OrderDetails} />
                      </>
                  ):
                      (
                          <>
                              <Route exact path="/login" component={LoginPage} />
                              <Route exact path="/register" component={RegisterPage} />
                          </>
                      )

              }

              <Route exact component={HomePage}/>
          </Switch>
      </BrowserRouter>
  )
}

export default App;
