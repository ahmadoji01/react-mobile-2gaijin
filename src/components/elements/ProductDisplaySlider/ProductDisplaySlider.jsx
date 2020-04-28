import React, { Component } from 'react';
import "./ProductDisplaySlider.scss";
import { NavLink } from 'react-router-dom';
import SmallProductCard from '../SmallProductCard';
import { Swiper, SwiperSlide } from 'framework7-react';

class ProductDisplaySlider extends Component {
    
    render() {
        return(
            <div className="flash-sale segments no-pd-b">
                <div className="display-container">
                    <div className="section-title flash-s-title">
                        <h3>FLASH SALE</h3>
                        <Swiper params={{speed:500, slidesPerView: 3, spaceBetween: 20}}>
                            <SwiperSlide>
                                <SmallProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <SmallProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <SmallProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <SmallProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <SmallProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <SmallProductCard />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDisplaySlider;