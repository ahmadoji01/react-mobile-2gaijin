import React, { Component } from 'react';
import "./ProductContainerInfinite.scss";
import { NavLink } from 'react-router-dom';
import ProductCard from '../ProductCard';

class ProductContainerInfinite extends Component {

    state = {
        currLat: 0.0,
        currLng: 0.0
    };
    
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const location = JSON.stringify(position);
            this.setState({ currLat: position.coords.latitude, currLng: position.coords.longitude });
        });
    }

    render() {
        if(typeof(this.props.items) !== "undefined") {
            const items = this.props.items;
            this.findCoordinates();
            var currLat = this.state.currLat; var currLng = this.state.currLng;
            return(
                <div className="recommended product segments-bottom">
                    <div className="container">
                        <div className="section-title">
                            <h3>{this.props.title}</h3>
                        </div>
                        { items.map(function (item, i) {
                            if((i+1)%2 == 1) {
                                if(typeof(items[i+1]) !== "undefined") {
                                    return (
                                        <div className="row">
                                            <div className="col-50">
                                                <ProductCard item={items[i]} lat={currLat} lng={currLng} />
                                            </div>
                                            <div className="col-50">
                                                <ProductCard item={items[i+1]} lat={currLat} lng={currLng} />
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="row">
                                            <div className="col-50">
                                                <ProductCard item={items[i]} lat={currLat} lng={currLng} />
                                            </div>
                                        </div>
                                    );
                                }
                            } else {
                                return '';
                            }
                        })}
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default ProductContainerInfinite;

