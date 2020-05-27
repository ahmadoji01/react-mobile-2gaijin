import React, { Component } from 'react';
import './FullWidthCard.scss';
import { Icon, Link } from 'framework7-react';

class FullWidthCard extends Component {
    constructor(props) {
        super(props);
        this.state = { cardWidth: (window.innerWidth/1.5) - 25, cardHeight: (window.innerHeight/4) - 25 };
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
        this.setState({ cardWidth: (window.innerWidth/1.5) - 25 });
        this.setState({ cardHeight: (window.innerHeight/4) - 25 });
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

    redirectToProductDetail(productID) {
        this.$f7.view.main.router.navigate("/product/" + productID);
    }

    render() {
        if(typeof(this.props.item) !== 'undefined') {
            const item = this.props.item;
            var locText = this.calcDistance(parseFloat(item.location.latitude), 
            parseFloat(item.location.longitude), 
            parseFloat(this.props.lat),  
            parseFloat(this.props.lng));

            let locColumn;
            if(locText != "") {
                locColumn = <div className="column">
                    <p className="location">{locText}</p>
                </div>
            }

            return(
                <Link href={`/product/${item["_id"]}`} className="product-card" style={{ marginRight: 20}} >
                    <div className="content" style={{borderRadius: 20}}>
                        <div className="big-image-container" style={{backgroundImage: `url(${item["img_url"]})`, width: `${this.state.cardWidth}px`}}></div>
                        <div className="text-full-width" style={{padding: 10}}>
                            <div className="row" style={{marginBottom: 0, paddingBottom: 0}}>
                                <div className="column" style={{width: "90%"}}>
                                    <p className="title-product">{item.name}</p>
                                </div>
                                <div className="column" style={{width: "10%"}}>
                                    <Icon f7="heart_circle_fill" size="24px" color="gray"></Icon>
                                </div>
                            </div>
                            <div className="row" style={{marginBottom: 0, paddingBottom: 0}}>
                                <div className="column">
                                    <p className="location">by {item.seller_name}</p>
                                </div>
                                {locColumn}
                            </div>
                            <p className="price">¥{item.price}</p>
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