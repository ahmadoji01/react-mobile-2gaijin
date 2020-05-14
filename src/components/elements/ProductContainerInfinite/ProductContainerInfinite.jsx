import React, { Component } from 'react';
import "./ProductContainerInfinite.scss";
import { NavLink } from 'react-router-dom';
import ProductCard from '../ProductCard';
import Masonry from 'react-masonry-css';
import { Toolbar, Link } from 'framework7-react';

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
            this.findCoordinates();
            var currLat = this.state.currLat; var currLng = this.state.currLng;

            var items = this.props.items;
            items = items.map(function(item, i) {
                return <div key={i+1}><ProductCard item={item} lat={currLat} lng={currLng} /></div>
            });
            
            return(
                <div className="recommended product segments-bottom">
                    <div className="section-title">
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="container">
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {items}
                        </Masonry>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default ProductContainerInfinite;

