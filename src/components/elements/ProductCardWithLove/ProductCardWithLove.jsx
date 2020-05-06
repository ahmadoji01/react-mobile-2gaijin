import React, { Component } from 'react';
import './ProductCardWithLove.scss';
import { Link } from 'framework7-react';

class ProductCardWithLove extends Component {
    
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

        var text = d.toFixed(1) + " km away";

        if (lat1 === 0.0 || lat2 === 0.0) {
            text = "";
        }

        return text;
    }

    render() {
        if(typeof(this.props.item) !== 'undefined') {
            const item = this.props.item;
            return(
                <Link href={`/product/${item["_id"]}`} >
                    <div className="content content-shadow-product">
                        <div className="love-button">
                            <i className="fas fa-heart"></i>
                        </div>
                        <img src="images/product1.jpg" alt="product" />
                        <div className="text">
                            <p className="title-product">{item.name}</p>
                            <p className="location">by {item.seller_name}</p>
                            <p className="price">¥{item.price}</p>
                            <p className="title-product">{this.calcDistance(parseFloat(item.location.latitude), parseFloat(item.location.longitude), parseFloat(this.props.lat),  parseFloat(this.props.lng))}</p>
                        </div>
                    </div>
                </Link>
            );
        } else {
            return '';
        }
    } 
}

export default ProductCardWithLove;