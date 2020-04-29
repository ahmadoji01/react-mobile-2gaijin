import React, { Component } from 'react';
import "./ProductCard.scss";
import { NavLink } from 'react-router-dom';

class ProductCard extends Component {
    
    calcDistance(lat1, lng1, lat2, lng2) {
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2-lat1) * (Math.PI/180);  // deg2rad below
        var dLon = (lng2-lng1) * (Math.PI/180); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;

        var text = "";

        if (lat2 != 0.0) {
            text = d.toFixed(1) + " km away";
        }

        return text;
    }

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
                            <p className="title-product">{this.calcDistance(parseFloat(item.location[0]), parseFloat(item.location[1]), parseFloat(this.props.lat),  parseFloat(this.props.lng))}</p>
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