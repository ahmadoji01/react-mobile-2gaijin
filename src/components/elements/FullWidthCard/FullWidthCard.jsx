import React, { Component } from 'react';
import './FullWidthCard.scss';
import { Icon, Link } from 'framework7-react';
import { geolocated } from 'react-geolocated';
import PinIcon from "../../icons/PinIcon.svg";

class FullWidthCard extends Component {
    constructor(props) {
        super(props);
        this.state = { cardWidth: (window.innerWidth/1.5) - 25, locText: "", cardHeight: (window.innerHeight/4) - 25, currLat: 0.0, currLng: 0.0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.findCoordinates = this.findCoordinates.bind(this);
        this.calcDistance = this.calcDistance.bind(this);
    }
    
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const location = JSON.stringify(position);
            this.setState({ currLat: position.coords.latitude, currLng: position.coords.longitude }, () => {
                this.calcDistance();
            });
        });
    }
    
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.findCoordinates();
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ cardWidth: (window.innerWidth/1.5) - 25 });
        this.setState({ cardHeight: (window.innerHeight/4) - 25 });
    }

    calcDistance() {
        if(typeof(this.props.item) !== 'undefined') {
            var item = this.props.item;
            var lat1 = parseFloat(item.location.latitude);
            var lng1 = parseFloat(item.location.longitude);
            var lat2 = parseFloat(this.state.currLat);
            var lng2 = parseFloat(this.state.currLng);
        
            if(this.state.locText != "") {
                return;
            }
            
            if (lat1 === 0.0 || lat2 === 0.0) {
                if(this.state.locText != "") {
                    this.setState({ locText: "" });
                }
                return;
            }

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
    }

    redirectToProductDetail(productID) {
        this.$f7.view.main.router.navigate("/product/" + productID);
    }

    render() {
        if(typeof(this.props.item) !== 'undefined') {
            const item = this.props.item;

            let locColumn;
            if(this.state.locText != "") {
                locColumn = <div className="column">
                    <p className="location" style={{ display: "inline" }}><img src={PinIcon} style={{ width: 20, height: 20, float: "left" }} />{this.state.locText}</p>
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

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(FullWidthCard);