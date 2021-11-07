import React from "react";
import {Link} from "react-router-dom";

const SingleProduct = ({item}) => {
    return (
        <div className="card single_product" >
            <Link to={`/product/${item.id}`}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img className="card-img-top" src={item.image} alt="Card image cap"/>
            </Link>

                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{(item.description).substring(0,100)}.... <Link to={`/product/${item.id}`}>see more</Link> </p>
                    <Link href="#" className="btn btn-primary">Add to Cart</Link>
                </div>
            <div className="card-footer">
                <h5>price: <del>{item.market_price}$</del> {item.selling_price}$</h5>
            </div>
        </div>
    )
}

export default SingleProduct