import React, { Component } from 'react';
import "./SmallProductCard.scss";
import { NavLink } from 'react-router-dom';

class SmallProductCard extends Component {
    
    render() {
        return(
            <div className="content content-shadow-product">
                <a href="/product-details/">
                    <div className="product-mark-discount">
                        <ul>
                            <li>50%</li>
                            <li>OFF</li>
                        </ul>
                    </div>
                    <img src="images/flash-sale1.jpg" alt="flash-sale" />
                    <div className="text">
                        <p>$50 <span>$100</span></p>
                    </div>
                </a>
            </div>
        );
    }
}
    
export default SmallProductCard;