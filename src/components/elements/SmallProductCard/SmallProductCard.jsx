import React, { Component } from 'react';
import "./SmallProductCard.scss";
import { NavLink } from 'react-router-dom';

class SmallProductCard extends Component {
    
    render() {
        if(typeof(this.props.item) !== "undefined") {
            return(
                <div className="content content-shadow-product">
                    <a href="/product-details/">
                        <div className="product-mark-discount">
                            <ul>
                                <li>{this.props.label}</li>
                            </ul>
                        </div>
                        <img src={this.props.item["img_url"]} className="small-card-img" />
                        <div className="text">
                            <p>¥{this.props.item["price"]}</p>
                        </div>
                    </a>
                </div>
            );
        } else {
            return '';
        }
    }
}
    
export default SmallProductCard;