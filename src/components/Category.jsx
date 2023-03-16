import React from 'react';
import {Link} from "react-router-dom";

const Category = ({category}) => {
    return (
        <div>
            <Link className="card border-0 shadow py-2 text-center content text-decoration-none category-product" to={`/category/${category.id}`}>
                <h3>{category?.title}</h3>
            </Link>
        </div>
    );
};

export default Category;
