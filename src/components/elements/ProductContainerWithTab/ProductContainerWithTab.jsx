import React, { Component } from 'react';
import "./ProductContainerWithTab.scss";
import ProductCard from '../ProductCard';
import Masonry from 'react-masonry-css';
import { Toolbar, Link, Tabs } from 'framework7-react';
import ProductCardWithLove from '../ProductCardWithLove';

class ProductContainerWithTab extends Component {

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
                return <div key={i+1}><ProductCardWithLove item={item} lat={currLat} lng={currLng} /></div>
            });

            var items2 = this.props.items2;
            items2 = items2.map(function(item, i) {
                return <div key={i+1}><ProductCardWithLove item={item} lat={currLat} lng={currLng} /></div>
            });
            return(
                <div className="recommended product segments-bottom">
                    <Toolbar id="tabbar-items" tabbar labels position='top' style={{marginBottom: 50}}>
                        <Link tabLink="#tab-items-1" tabLinkActive><center className="tab-title">Recently Added Items</center></Link>
                        <Link tabLink="#tab-items-2"><center className="tab-title">Free Items</center></Link>
                    </Toolbar>
                    <div className="container">
                        <div className="tabs-swipeable-wrap">
                            <div className="tabs">
                                <div id="tab-items-1" className="tab tab-active tab-items-1">
                                    <Masonry
                                        breakpointCols={2}
                                        className="my-masonry-grid"
                                        columnClassName="my-masonry-grid_column">
                                        {items}
                                    </Masonry>
                                </div>
                                <div id="tab-items-2" className="tab tab-items-2">
                                    <Masonry
                                        breakpointCols={2}
                                        className="my-masonry-grid"
                                        columnClassName="my-masonry-grid_column">
                                        {items2}
                                    </Masonry>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }

}

export default ProductContainerWithTab;