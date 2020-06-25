import React, { Component } from 'react';
import "./ProductDisplaySlider.scss";
import { NavLink } from 'react-router-dom';
import ProductCard from '../ProductCard';
import SmallProductCard from '../SmallProductCard';
import { Swiper, SwiperSlide } from 'framework7-react';

class ProductDisplaySlider extends Component {
    
    render() {
        if(typeof(this.props.items) !== "undefined") {
            var currLat = 0.0; var currLng = 0.0;
            if(this.props.isGeolocationEnabled) {
                if(this.props.coords !== null) {
                    currLat = this.props.coords.latitude;
                    currLng = this.props.coords.longitude;
                }
            }

            var seeAllLink = "#";
            if(typeof(this.props.seeAllLink) !== "undefined") {
                seeAllLink = this.props.seeAllLink;
            }

            return(
                <div className="recommended product segments-bottom product-slider">
                    <div className="container">
                        <div className="section-title">
                            <h3>{this.props.title}
                                <a href={seeAllLink} className="see-all-link">See All</a>
                            </h3>
                            <Swiper params={{speed:500, slidesPerView: 2, spaceBetween: 10}}>
                                { this.props.items.map(function (item, i) {
                                    return (
                                        <SwiperSlide className="product-swiper" key={i}>
                                            <div key={i}><ProductCard item={item} lat={currLat} lng={currLng} /></div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default ProductDisplaySlider;