import React, { Component } from 'react';
import "./HomeBanners.scss";
import FullWidthCard from '../FullWidthCard/FullWidthCard';
import { geolocated } from 'react-geolocated';
import shortid from "shortid";

class HomeBanners extends Component {
    constructor(props) {
        super(props);
        this.state = { width: (window.innerWidth/1.25) - 25, height: (window.innerHeight) - 25 };
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
        this.setState({ height: (window.innerHeight) - 25 });
    }
    
    render() {
        if(typeof(this.props.items) !== "undefined") {
            var currLat = 0.0; var currLng = 0.0;
            if(this.props.isGeolocationEnabled) {
                if(this.props.coords !== null) {
                    currLat = this.props.coords.latitude;
                    currLng = this.props.coords.longitude;
                }
            }
            
            return (
                <div className="slider" style={{ marginTop: 0 }}>
                    <div className="container">
                        <div className="section-title">
                            <h3>2Gaijin's Picks
                                <a href="/profile/5da95727697d19f3f01f62b6" className="see-all-link">See All</a>
                            </h3>
                        </div>
                    </div>
                    <div className="container" style={{display: 'flex', flexWrap: "nowrap", overflow: "auto"}}>
                        { this.props.items.map(function (item, i) {
                            return (
                                <FullWidthCard key={shortid.generate()} item={item} lat={currLat} lng={currLng} style={{flex: '0 0 auto'}} />
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

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(HomeBanners);