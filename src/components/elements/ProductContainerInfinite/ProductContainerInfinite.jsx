import React, { Component } from 'react';
import "./ProductContainerInfinite.scss";
import ProductCard from '../ProductCard';
import Masonry from 'react-masonry-css';
import { geolocated } from 'react-geolocated';
import shortid from  "shortid";

class ProductContainerInfinite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currLat: 0.0,
            currLng: 0.0,
            cardWidth: (window.innerWidth/2) - 25, 
            cardHeight: (window.innerHeight/2) - 25,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const location = JSON.stringify(position);
            this.setState({ currLat: position.coords.latitude, currLng: position.coords.longitude });
        });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ cardWidth: (window.innerWidth/2) - 25 });
        this.setState({ cardHeight: (window.innerHeight/2) - 50 });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.items === nextProps.items) {
          return false;
        } else {
          return true;
        }
    }

    render() {
        if(typeof(this.props.items) !== "undefined") {
            this.findCoordinates();
            var currLat = this.state.currLat; var currLng = this.state.currLng;
            var cardHeight = this.state.cardHeight; var cardWidth = this.state.cardWidth;
            var items = this.props.items;
            return(
                <div className="recommended product segments-bottom">
                    <div className="section-title">
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="container">
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {items.map(function(item, i) {
                                return <ProductCard key={shortid.generate()} item={item} lat={currLat} lng={currLng} cardWidth={cardWidth} cardHeight={cardHeight} />
                            })}
                        </Masonry>
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
  })(ProductContainerInfinite);

