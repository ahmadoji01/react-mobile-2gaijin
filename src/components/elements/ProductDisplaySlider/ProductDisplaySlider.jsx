import React, { Component } from 'react';
import "./ProductDisplaySlider.scss";
import { NavLink } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { Swiper, SwiperSlide } from 'framework7-react';

class ProductDisplaySlider extends Component {
    
    render() {
        return(
            <div className="popular-product segments-bottom">
                <div className="container">
                    <div className="section-title">
                        <h3>Popular Product
                            <a href="#" className="see-all-link">See All</a>
                        </h3>
                    </div>
                    <Swiper navigation params={{speed:500, slidesPerView: 3, spaceBetween: 20}}>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        );
    }
}

export default ProductDisplaySlider;