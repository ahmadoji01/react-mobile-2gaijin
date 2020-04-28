import React, { Component } from 'react';
import "./ProductDisplaySlider.scss";
import { NavLink } from 'react-router-dom';
import SmallProductCard from '../SmallProductCard';
import { Swiper, SwiperSlide } from 'framework7-react';

class ProductDisplaySlider extends Component {
    
    render() {
        if(typeof(this.props.items) !== "undefined") {
            const labelName = this.props.label;
            return(
                <div className="flash-sale segments no-pd-b">
                    <div className="display-container">
                        <div className="section-title flash-s-title">
                            <h3>{this.props.title}</h3>
                            <Swiper params={{speed:500, slidesPerView: 3, spaceBetween: 20}}>
                                { this.props.items.map(function (item, i) {
                                    return (
                                        <SwiperSlide key={i}>
                                            <SmallProductCard item={item} label={labelName} />
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