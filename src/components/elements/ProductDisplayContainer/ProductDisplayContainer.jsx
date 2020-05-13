import React, { Component } from 'react';
import "./ProductDisplayContainer.scss";
import { NavLink } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { geolocated } from 'react-geolocated';
import Masonry from 'react-masonry-css';
import ProductCardWithLove from '../ProductCardWithLove';

class ProductDisplayContainer extends Component {

    render() {
        if(typeof(this.props.items) !== "undefined") {
            var currLat = 0.0; var currLng = 0.0;
            if(this.props.isGeolocationEnabled) {
                if(this.props.coords !== null) {
                    currLat = this.props.coords.latitude;
                    currLng = this.props.coords.longitude;
                }
            }

            var items = this.props.items;
            items = items.map(function(item, i) {
                return <div key={i+1}><ProductCardWithLove item={item} lat={currLat} lng={currLng} /></div>
            });

            return(
                <div className="recommended product segments-bottom">
                    <div className="container">
                        <div className="section-title">
                            <h3>{this.props.title}
                                <a href="#" className="see-all-link">See All</a>
                            </h3>
                        </div>
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {items}
                        </Masonry>
                    </div>
                </div>
            )
        } else {
            return '';
        }
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(ProductDisplayContainer);

