import React, { Component } from 'react';
import "./ProductCard.scss";
import { NavLink } from 'react-router-dom';

class ProductCard extends Component {
    
    render() {
        return(
            <div className="content content-shadow-product">
                <a href="/product-details/">
                    <img src="images/product1.jpg" alt="product" />
                    <div className="text">
                        <p className="title-product">Sweater with latest model</p>
                        <p className="price">$85.00</p>
                        <p className="location">New York</p>
                    </div>
                </a>
            </div>
        );
    }
}
    
export default ProductCard;