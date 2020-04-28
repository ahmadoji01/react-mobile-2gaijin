import React, { Component } from 'react';
import "./ProductCard.scss";
import { NavLink } from 'react-router-dom';

class ProductCard extends Component {
    
    render() {
        return(
            <div className="content content-shadow-product">
                <a href="/product-details/">
                    <img src="images/product8.jpg" alt="product" />
                    <div className="text">
                        <p className="title-product">Loafers with genuine leather, guaranteed</p>
                        <p className="price">$299.99</p>
                        <p className="location">New York</p>
                    </div>
                </a>
            </div>
        );
    }
}
    
export default ProductCard;