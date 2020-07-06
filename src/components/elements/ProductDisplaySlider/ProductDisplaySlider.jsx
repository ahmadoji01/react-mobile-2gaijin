import React, { Component } from 'react';
import "./ProductDisplaySlider.scss";
import ProductCard from '../ProductCard';
import { Swiper, SwiperSlide } from 'framework7-react';
import { geolocated } from 'react-geolocated';
import shortid from  "shortid";

class ProductDisplaySlider extends Component {

    state = {
        currLat: 0.0,
        currLng: 0.0,
        cardWidth: (window.innerWidth/2) - 25, 
        cardHeight: (window.innerHeight/2) - 25,
    };

    componentDidMount() {
        this.updateWindowDimensions();
        //this.calcDistance();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ cardWidth: (window.innerWidth/2) - 25 });
        this.setState({ cardHeight: (window.innerHeight/2) - 50 });
    }

    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    render() {
        if(typeof(this.props.items) !== "undefined") {
            var currLat = 0.0; var currLng = 0.0;
            var cardHeight = this.state.cardHeight; var cardWidth = this.state.cardWidth;
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
                                        <SwiperSlide className="product-swiper" key={shortid.generate()}>
                                            <div key={shortid.generate()}><ProductCard item={item} lat={currLat} lng={currLng} cardWidth={cardWidth} cardHeight={cardHeight} /></div>
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

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(ProductDisplaySlider);