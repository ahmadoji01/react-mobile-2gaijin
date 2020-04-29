import React, { Component } from 'react';
import "./HomeBanners.scss";
import { Swiper, SwiperSlide } from 'framework7-react';

class HomeBanners extends Component {
    render() {
        if(typeof(this.props.banners) !== "undefined") {
            return (
                <div className="slider" style={{marginTop: 0}}>
                    <div className="container">
                        <Swiper pagination params={{speed:500, spaceBetween: 10}} >
                            { this.props.banners.map(function (banner, i) {
                                return (
                                    <SwiperSlide key={i} style={{marginTop: 50}}>
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
            )
        } else {
            return '';
        }
    }
}

export default HomeBanners;