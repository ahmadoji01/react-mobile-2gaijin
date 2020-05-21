import React, { Component } from 'react';
import './MakeAppointment.scss';
import { Icon, Link, Page, Navbar, NavLeft, NavTitle } from 'framework7-react';
import ProductCardHorizontal from '../../elements/ProductCardHorizontal/ProductCardHorizontal';
import { geolocated } from 'react-geolocated';

class MakeAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        fetch('https://go.2gaijin.com/products/' + this.props.productID)
        .then((response) => response.json())
        .then((responseJson) => {
            const jsonData = responseJson.data;
            this.setState({ data: jsonData});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        var calendarDateTime = this.$f7.calendar.create({
            inputEl: '#demo-calendar-date-time',
            timePicker: true,
            dateFormat: { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' },
        });
    }

    render() {
        let itemInfo, sellerInfo;
        if(typeof(this.state.data.item) !== "undefined") {
            itemInfo = this.state.data.item;
            itemInfo.img_url = this.state.data.item.images[0].img_url;
        }
        if(typeof(this.state.data.seller) !== "undefined") {
            sellerInfo = this.state.data.seller;
            itemInfo.seller_name = sellerInfo.first_name + " " + sellerInfo.last_name;
        }
        var currLat = 0.0; var currLng = 0.0;
        if(this.props.isGeolocationEnabled) {
            if(this.props.coords !== null) {
                currLat = this.props.coords.latitude;
                currLng = this.props.coords.longitude;
            }
        }

        return(
            <Page name="appointment" className="page page-appointment">
                <Navbar>
                    <NavLeft>
                        <Link href="/" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Make Appointment</NavTitle>
                </Navbar>
                <div className="notifi segments">
                    <div className="container">
                        <ProductCardHorizontal item={itemInfo} lat={currLat} lng={currLng}/>
                        
                        <div class="block-title">Date + Time</div>
                        <div class="list no-hairlines-md">
                            <ul>
                                <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                    <div class="item-input-wrap">
                                        <input type="text" placeholder="Select date and time" readonly="readonly" id="demo-calendar-date-time"/>
                                    </div>
                                    </div>
                                </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </Page>
        );
    }

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(MakeAppointment);