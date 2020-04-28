import React, { Component } from 'react';
import "./HomeBanners.scss";
import { Swiper, SwiperSlide } from 'framework7-react';

class HomeBanners extends Component {
    render() {
        if(typeof(this.props.banners) !== "undefined") {
            return (
                <div className="slider">
                    <div className="container">
                        
                        <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" className="swiper-container swiper-init swiper-container-horizontal">
                            <div className="swiper-pagination"></div>
                            <Swiper pagination params={{speed:500, spaceBetween: 10}} >
                                { this.props.banners.map(function (banner, i) {
                                    return (
                                        <SwiperSlide>
                                            <div className="content">
                                                <div className="mask"></div>
                                                <img src={banner.img_url}  alt=""/>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            )
        } else {
            return '';
        }
    }
}

export default HomeBanners;