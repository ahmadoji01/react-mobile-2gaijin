import React, { Component } from 'react';
import './FullWidthCard.scss';
import { Link } from 'framework7-react';

class FullWidthCard extends Component {
    constructor(props) {
        super(props);
        this.state = { cardWidth: (window.innerWidth/1.25) - 25, cardHeight: (window.innerHeight/2) - 25 };
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
        this.setState({ cardWidth: (window.innerWidth/1.25) - 25 });
        this.setState({ cardHeight: (window.innerHeight/2) - 25 });
    }

    calcDistance(lat1, lng1, lat2, lng2) {
        var R = 6371;
        var dLat = (lat2-lat1) * (Math.PI/180);
        var dLon = (lng2-lng1) * (Math.PI/180); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;

        var text = d.toFixed(1) + " km away";

        if (lat1 === 0.0 || lat2 === 0.0) {
            text = "";
        }

        return text;
    }

    render() {
        if(typeof(this.props.item) !== 'undefined') {
            const item = this.props.item;
            return(
                <Link href={`/product/${item["_id"]}`} className="product-card" style={{ height: `${this.state.height}px`, width: `${this.state.cardWidth}px`}} >
                    <div className="content content-shadow-product content-full-width">
                        <div className="image-container" style={{backgroundImage: `url(${item["img_url"]})`, width: `${this.state.cardWidth}px`}}></div>
                        <div className="text">
                            <p className="title-product">{item.name}</p>
                            <p className="location">by {item.seller_name}</p>
                            <p className="price">¥{item.price}</p>
                            <p className="location">{this.calcDistance(parseFloat(item.location.latitude), parseFloat(item.location.longitude), parseFloat(this.props.lat),  parseFloat(this.props.lng))}</p>
                        </div>
                    </div>
                </Link>
            );
        } else {
            return '';
        }
    }
}

export default FullWidthCard;