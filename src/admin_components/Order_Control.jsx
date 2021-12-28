import React, {useEffect, useState} from "react";
import "./CSS/All_Order.css";
import Axios from "axios";
import {admin_header, domain} from "../env";
import {useGlobalState} from "../state/provider";
import All_Orders from "./All_Orders";
import {Link, useHistory} from "react-router-dom";
import User_Control_Admin from "./User_Control_Admin";

const Order_Control = ({ setModal, order_id, order, func }) => {
    const [{ admin_profile, all_order }, dispatch] = useGlobalState();

    const [check, setCheck] = useState(false);
    const history =  useHistory()
    const [order_status, setOrder_status] = useState(null);
    const [get_order_status, setGet_order_status] = useState(order[order_id]?.order_list?.id);
    const [payment, setPayment] = useState(order[order_id]?.payment_complete);

    // console.log(order[order_id]?.order_list?.choice_name)
    // console.log(order[order_id]?.id)
    // console.log(order[order_id]?.payment_complete)
    // console.log(order, "&&&&&&&&& ORDER")

    let order_st = (order[order_id]?.order_list?.choice_name).toString();
    let payment_st = (order[order_id]?.payment_complete).toString();
    let main_id = (order[order_id]?.id).toString();

    useEffect((id) => {
        const get_choice = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/get_choice/`,
                headers: admin_header
            }).then(response => {
                setOrder_status(response.data)
            })
        }
        get_choice()
    }, []);

    const change_status = async () => {
        setModal(false)
        await Axios({
            method: "post",
            url: `${domain}/api/all_order/`,
            headers: admin_header,
            data: {
                "id": main_id,
                "payment_complete": payment,
                "order_list": get_order_status,
            }
        }).then(response => {
            // window.location.href = '/order_page/all_order'
            dispatch({
                type: "ADMIN_PROFILE",
                admin_profile: response.data,
            })

        })
    }

    const user_control = () => {
        let newpageurl = `/admin_action/user_control_admin/${order[order_id]?.id}`;
        window.open(newpageurl,"_blank");

    }


    return (
        <div className="center">
            {/*{check && <User_Control_Admin all_order={all_order}/>}*/}
          <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>User Order Control Panel</h3>
        </div>
        <div className="body">
            <div className="beside">
                    <div className="col-md-4 card bg-light mb-3">
                 <h5 className="card-title">Order ID: {order[order_id]?.id}</h5>
            </div>

                <div className="col-md-6 card text-white bg-primary mb-3 mx-2 btn" onClick={() => {
                    // setCheck(true);
                    user_control();
                }}>
                 <h5 className="card-title">Username: {order[order_id]?.userdata['0']?.username}</h5>
            </div>
            </div>

            <div className="beside">
                <div className="col-md-8 card text-white bg-success mb-3">
                 <h5 className="card-title">Email: {order[order_id]?.email}</h5>
            </div>

            <div className="col-md-4 card text-white bg-info mb-3 mx-2">
                 <h5 className="card-title">Serial: {order_id+1}</h5>
            </div>
            </div>

          <div className="form-group my-3">
             <label>Payment Status</label>
              <select onChange={e => setPayment(e.target.value)} className="form-control" value={payment}>
                  <option value={payment_st} hidden>{payment_st}</option>
                  <option value={true}>True</option>
                  <option value={false}>False</option>
              </select>
          </div>

          <div className="form-group">
             <label>Order Status</label>
             <select onChange={e => setGet_order_status(e.target.value)}  className="form-control" value={get_order_status}>
                 <option value={order_st} hidden>{order_st}</option>
                 {
                  order_status?.map((item, index) => {

                      return <option value={item?.id} key={index}>{item?.choice_name}</option>
                  })
              }
             </select>

          </div>

        </div>
        <div className="footer">
          <button
            onClick={() => {
              setModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={change_status}>Apply Changes</button>
        </div>
      </div>
    </div>
        </div>

    )
}

export default Order_Control;