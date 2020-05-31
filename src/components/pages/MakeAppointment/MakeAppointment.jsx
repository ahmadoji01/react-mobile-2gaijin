import React, { Component } from 'react';
import { ReactSVG } from 'react-svg';
import './MakeAppointment.scss';
import { Icon, Link, Page, Navbar, NavLeft, NavTitle, Button, Popup } from 'framework7-react';
import ProductCardHorizontal from '../../elements/ProductCardHorizontal/ProductCardHorizontal';
import { geolocated } from 'react-geolocated';
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
        };
        this.submitAppointment = this.submitAppointment.bind(this);
        this.backToHome = this.backToHome.bind(this);
    }

    submitAppointment() {
        var calendarPicker = document.getElementById("demo-calendar-date-time");
        var meetingTime = new Date(calendarPicker.value).getTime();
        var status = "pending";
        
        if(this.state.itemID != "") {
            var payload = {
                "status": status,
                "meeting_time": meetingTime,
                "product_id": this.state.itemID,
                "seller_id": this.state.sellerID,
                "is_delivery": this.state.isDelivery
            }
            console.log(payload);
            
            return axios
            .post("/insert_appointment", payload, { 
                headers: {
                    'Authorization': localStorage.getItem("access_token"),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response);
                if(response.data.status == "Success") {
                    this.setState({submitted: true});
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
            dateFormat: { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' },
            disabled: {
                to: today
            }
        });
        this.setState({ isDelivery: (this.props.withDelivery == "true") });
        console.log(this.state.itemID);
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
                        <div class="block-title-appointment">When do you want to meet?</div>
                        <div class="list no-hairlines-md">
                            <ul>
                                <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                    <div class="item-input-wrap">
                                        <input  type="text" placeholder="Select date and time" readonly="readonly" id="demo-calendar-date-time"/>
                                    </div>
                                    </div>
                                </div>
                                </li>
                            </ul>
                        </div>
                        <Button onClick={this.submitAppointment} raised fill round>Send Appointment Request</Button>
                    </div>
                </div>

                <Popup className="demo-popup-push" opened={this.state.submitted} onPopupClosed={() => this.setState({submitted : false})} push>
                    <Page>
                        <Navbar title="Popup Push">
                            <NavLeft>
                                <Link popupClose>Close</Link>
                            </NavLeft>
                        </Navbar>
                        <div style={{height: '100%'}} className="display-flex justify-content-center align-items-center">
                            <div className={`cat-icon-base base-${this.props.iconcolor}-color`}>
                                <ReactSVG className="icon-svg" src={`${process.env.PUBLIC_URL}/icons/BooksIcon.svg`} />
                                <span className="icon-name">{this.props.iconname}</span>
                                <Button onClick={this.backToHome} raised fill round>Back to Home</Button>
                            </div>
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