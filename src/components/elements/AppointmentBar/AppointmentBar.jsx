import React, { Component } from 'react';
import './AppointmentBar.scss';
import { geolocated } from 'react-geolocated';

class AppointmentBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = { currLat: 0.0, currLng: 0.0 };
        this.findCoordinates = this.findCoordinates.bind(this);
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const location = JSON.stringify(position);
            this.setState({ currLat: position.coords.latitude, currLng: position.coords.longitude });
        });
    }
    
    render() {
        this.findCoordinates();
        var currLat = this.state.currLat; var currLng = this.state.currLng;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-20">
                        <div className="content-image">
                            <img src="images/product12.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-55">
                        <div className="content-title-product">
                            <a href="/product-details/"><p className="title-product">Loafers with genuine leather, guaranteed</p></a>
                        </div>
                    </div>
                    <div className="col-25">
                        <div className="content-info">
                            <p className="price">$229.99</p>
                            <p className="transaction-status"><i className="fas fa-undo"></i>RETURNED</p>
                        </div>
                    </div>
                </div>

                <div className="divider-line-half"></div>
            </React.Fragment>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(AppointmentBar);