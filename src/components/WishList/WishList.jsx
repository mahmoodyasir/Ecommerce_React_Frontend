import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import SingleWishList from "./SingleWishList";
import Axios from "axios";
import {domain, header} from "../../env";
import {useGlobalState} from "../../state/provider";

const WishList = () => {

    const [{ all_wishlist }, dispatch] = useGlobalState();
    console.log(all_wishlist)

    return (
        <div className="container">
            {
                all_wishlist !== null &&
                all_wishlist[0]?.wishedProduct.length !== 0 ?
                    <>
                        <h1 className="text-center mb-4 display-6">Your Wish List</h1>
                    </>
                    :
                    <>
                        <h1 className="text-center mb-4 display-6">You Have No Wish List</h1>
                    </>
            }

            {
                all_wishlist !== null &&
                all_wishlist[0]?.wishedProduct.map((item, i) => (
                    <div key={i}>
                        <SingleWishList item={item} />
                    </div>
                ))
            }
        </div>
    );
};

export default WishList;
