import React, { Component } from 'react';
import './MakeAppointment.scss';
import { Icon, Link, Page, Navbar, NavLeft, NavTitle, Button, Popup } from 'framework7-react';
import ProductCardHorizontal from '../../elements/ProductCardHorizontal/ProductCardHorizontal';
import { geolocated } from 'react-geolocated';
import { ReactComponent as AppointmentIllustration } from "../../illustrations/AppointmentIllustration.svg";
import axios from 'axios';

class MakeAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            submitted: false,
            itemID: "",
            sellerID: "",
            isDelivery: false,
            validateInput: 0,
        };
        this.submitAppointment = this.submitAppointment.bind(this);
        this.backToHome = this.backToHome.bind(this);
    }

    submitAppointment() {
        var calendarPicker = document.getElementById("demo-calendar-date-time");
        var meetingTime = new Date(calendarPicker.value).getTime();
        if(calendarPicker.value == "") {
            this.setState({ validateInput: 1 });
            return;
        }
        var status = "pending";
        if(this.state.itemID != "") {
            var payload = {
                "status": status,
                "meeting_time": meetingTime,
                "product_id": this.state.itemID,
                "seller_id": this.state.sellerID,
                "is_delivery": this.state.isDelivery
            }
            
            return axios
            .post(`https://go.2gaijin.com/insert_appointment`, payload, { 
                headers: {
                    'Authorization': localStorage.getItem("access_token"),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if(response.data.status == "Success") {
                    this.setState({submitted: true});
                    this.setState({ validateInput: 0 });
                }
            });
        }
    }

    componentWillMount() {
        fetch('https://go.2gaijin.com/products/' + this.props.productID)
        .then((response) => response.json())
        .then((responseJson) => {
            const jsonData = responseJson.data;
            this.setState({ data: jsonData});
            this.setState({ itemID: jsonData.item._id });
            this.setState({ sellerID: jsonData.seller._id });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        var today = new Date();
        var calendarDateTime = this.$f7.calendar.create({
            inputEl: '#demo-calendar-date-time',
            timePicker: true,
            footer: true,
            dateFormat: { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' },
            disabled: {
                to: today
            }
        });
        this.setState({ isDelivery: (this.props.withDelivery == "true") });
    }

    backToHome() {
        this.setState({submitted : false});
        this.$f7.view.main.router.navigate("/");
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

        let validMsg;
        if(this.state.validateInput == 1) {
            validMsg = <p>You must input date and time</p>;
        } else {
            validMsg = <p></p>;
        }

        return(
            <Page name="appointment" className="page page-appointment">
                <Navbar>
                    <NavLeft>
                        <Link href="/" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Make Appointment</NavTitle>
                </Navbar>
                <div className="notifi segments">
                    <div className="container">
                        <ProductCardHorizontal item={itemInfo} lat={currLat} lng={currLng}/>
                        <div className="block-title-appointment">When do you want to meet?</div>
                        <div className="list no-hairlines-md">
                            <ul>
                                <li>
                                <div className="item-content item-input item-input-outline">
                                    <div className="item-inner">
                                        <div className="item-input-wrap">
                                            <input type="text" placeholder="Select date and time" readOnly id="demo-calendar-date-time"/>
                                        </div>
                                    </div>
                                </div>
                                </li>
                            </ul>
                        </div>
                        {validMsg}
                        <Button className="general-btn" style={{color: "#fff", marginTop: 20}} onClick={this.submitAppointment} raised fill round>Confirm Appointment Request</Button>
                    </div>
                </div>

                <Popup className="demo-popup-push" opened={this.state.submitted} onPopupClosed={() => this.setState({submitted : false})} push>
                    <Page>
                        <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                            <div>
                                <div style={{display: 'table', margin: '0 auto'}}><AppointmentIllustration /></div>
                                <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Appointment Request Sent!</b></h3></div>
                                <div className="appointment-sent-text">
                                    The owner will respond to your request in a few hours. Check your notification page for update!
                                </div>
                            </div>
                        </div>
                        <div style={{height: '10%', width: '100%', padding: 5}}>
                            <Button className="general-btn" style={{color: '#fff'}} onClick={this.backToHome} raised fill round>Back to Home</Button>
                        </div>
                    </Page>
                </Popup>
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