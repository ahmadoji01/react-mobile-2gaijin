import React, { Component } from 'react';
import "./ProductCard.scss";
import { NavLink } from 'react-router-dom';

class ProductCard extends Component {
    
    render() {
        if(typeof(this.props.item) !== 'undefined') {
            const item = this.props.item;
            return(
                <div className="content content-shadow-product">
                    <a href="/product-details/">
                        <img src={item.img_url} alt="product" />
                        <div className="text">
                            <p className="title-product">{item.name}</p>
                            <p className="location">by {item.seller_name}</p>
                            <p className="price">¥{item.price}</p>
                            <p className="title-product">Sapporo</p>
                        </div>
                    </a>
                </div>
            );
        } else {
            return '';
        }
    }
}
    
export default ProductCard;