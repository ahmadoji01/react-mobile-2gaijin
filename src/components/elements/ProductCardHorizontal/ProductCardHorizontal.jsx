import React, { Component } from 'react';
import './ProductCardHorizontal.scss';
import {Link} from 'framework7-react';

class ProductCardHorizontal extends Component {
    
    constructor(props) {
        super(props);
        this.state = { cardWidth: (window.innerWidth/2) - 25, cardHeight: (window.innerHeight/2) - 25 };
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
        this.setState({ cardWidth: (window.innerWidth/2) - 25 });
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
            var locText = this.calcDistance(parseFloat(item.latitude), 
            parseFloat(item.longitude), 
            parseFloat(this.props.lat),  
            parseFloat(this.props.lng));

            let locColumn;
            if(locText != "") {
                locColumn = <p className="location" style={{marginBottom: 0}}><i className="fa fa-map-marker"></i>{locText}</p>
            }
            return(
                <div className="profile-container content-shadow">
                    <div className="row" style={{paddingBottom: 0}}>
                        <div className="col-30 product-img-container" style={{backgroundImage: `url("${item["img_url"]}")`}}></div>
                        <div className="col-70">
                            <div className="text" style={{padding: 0, fontFamily: "Poppins"}}>
                                <p className="title-product" style={{lineHeight: "1em", height: "2em", marginTop: 10, marginBottom: 0, fontWeight: 600, color: "black"}}>{item.name}</p>
                                <p className="location" style={{marginBottom: 0}}>by {item.seller_name}</p>
                                <p className="price" style={{marginBottom: 0}}>¥{item.price}</p>
                                {locColumn}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }  
    }
}

export default ProductCardHorizontal;