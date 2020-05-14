import React, { Component } from 'react';
import "./HomeBanners.scss";
import { Swiper, SwiperSlide } from 'framework7-react';
import FullWidthCard from '../FullWidthCard/FullWidthCard';
import AutcompleteComponent from 'framework7/components/autocomplete/autocomplete';

class HomeBanners extends Component {
    constructor(props) {
        super(props);
        this.state = { width: (window.innerWidth/1.25) - 25, height: (window.innerHeight/2) - 25 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: (window.innerWidth/1.25) - 25 });
        this.setState({ height: (window.innerHeight/2) - 25 });
    }
    
    render() {
        if(typeof(this.props.items) !== "undefined") {
            return (
                <div className="slider">
                    <div className="container" style={{display: 'flex', flexWrap: "nowrap", overflow: "auto", height: this.state.height}}>
                        { this.props.items.map(function (item, i) {
                            return (
                                <FullWidthCard item={item} style={{flex: '0 0 auto'}} />
                            );
                        })}
                    </div>
                </div>
            )
        } else {
            return '';
        }
    }
}

export default HomeBanners;