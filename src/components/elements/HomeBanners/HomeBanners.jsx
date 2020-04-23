import React from "react";
import "./HomeBanners.scss";

const HomeBanners = () => (
    <div className="slider">
        <div className="container">
            <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" className="swiper-container swiper-init swiper-container-horizontal">
                <div className="swiper-pagination"></div>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="content">
                            <div className="mask"></div>
                            <img src="images/banner1.png" alt=""/>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="content">
                            <div className="mask"></div>
                            <img src="images/banner2.png" alt=""/>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="content">
                            <div className="mask"></div>
                            <img src="images/banner3.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HomeBanners;