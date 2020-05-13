import React, { Component } from 'react';
import "./ProductDisplaySlider.scss";
import { NavLink } from 'react-router-dom';
import ProductCard from '../ProductCard';
import SmallProductCard from '../SmallProductCard';
import { Swiper, SwiperSlide } from 'framework7-react';

class ProductDisplaySlider extends Component {
    
    render() {
        if(typeof(this.props.items) !== "undefined") {
            const labelName = this.props.label;
            return(
                <div className="recommended product segments-bottom product-slider">
                    <div className="container">
                        <div className="section-title">
                            <h3>{this.props.title}
                                <a href="#" className="see-all-link">See All</a>
                            </h3>
                            <Swiper params={{speed:500, slidesPerView: 2, spaceBetween: 10}}>
                                { this.props.items.map(function (item, i) {
                                    return (
                                        <SwiperSlide className="product-swiper" key={i}>
                                            <div key={i}><ProductCard item={item} label={labelName} /></div>
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