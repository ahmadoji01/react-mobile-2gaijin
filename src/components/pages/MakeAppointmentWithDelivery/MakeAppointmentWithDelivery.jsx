import React, { Component } from 'react';
import './MakeAppointmentWithDelivery.scss';
import { Icon, Link, Page, Navbar, NavLeft, NavTitle, Button, Popup, Block, Preloader, List, ListInput, NavRight, TextEditor } from 'framework7-react';
import ProductCardHorizontal from '../../elements/ProductCardHorizontal/ProductCardHorizontal';
import { geolocated } from 'react-geolocated';
import { ReactComponent as AppointmentIllustration } from "../../illustrations/AppointmentIllustration.svg";
import axios from 'axios';
import AuthService from "../../../services/auth.service.js";

class MakeAppointmentWithDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            submitted: false,
            itemID: "",
            sellerID: "",
            isDelivery: false,
            validateInput: 0,
            isLoading: false,
            name: "",
            message: "",
            email: "",
            phoneNumber: "",
            destination: "",
            wechat: "",
            facebook: "",
            notes: "",
            notesPopupOpened: false
        };
        this.submitAppointment = this.submitAppointment.bind(this);
        this.backToHome = this.backToHome.bind(this);
        this.onDestinationChange = this.onDestinationChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onFacebookChange = this.onFacebookChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
        this.onWeChatChange = this.onWeChatChange.bind(this);
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
                "appointment": {
                    "status": status,
                    "meeting_time": meetingTime,
                    "product_id": this.state.itemID,
                    "seller_id": this.state.sellerID,
                    "is_delivery": this.state.isDelivery
                },
                "delivery": {
                    "destination": this.state.destination,
                    "name": this.state.name,
                    "email": this.state.email,
                    "phone": this.state.phoneNumber,
                    "wechat": this.state.wechat,
                    "facebook": this.state.facebook,
                    "notes": this.state.notes
                }
            }
            
            var self = this;
            AuthService.refreshToken().then(() => {
                self.setState({ message: "", isLoading: true });
                return axios
                .post(`https://go.2gaijin.com/insert_appointment_with_delivery`, payload, { 
                    headers: {
                        'Authorization': localStorage.getItem("access_token"),
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if(response.data.status == "Success") {
                        self.setState({ message: "", isLoading: false });
                        self.setState({submitted: true});
                        self.setState({ validateInput: 0 });
                    } else {
                        self.setState({ message: response.data.message, isLoading: false });
                    }
                });
            })
        }
    }

    componentWillMount() {
        this.setState({ name: localStorage.getItem("first_name") + " " + localStorage.getItem("last_name") });
        this.setState({ email: localStorage.getItem("email") });
        this.setState({ phoneNumber: localStorage.getItem("phone") });

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

    onNameChange(e) {
        this.setState({ name: e.target.value });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    onPhoneNumberChange(e) {
        this.setState({ phoneNumber: e.target.value });
    }

    onWeChatChange(e) {
        this.setState({ wechat: e.target.value });
    }

    onFacebookChange(e) {
        this.setState({ facebook: e.target.value });
    }

    onDestinationChange(e) {
        this.setState({ destination: e.target.value });
    }

    onEditorChange(e) {
        this.setState({ notes: e });
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

        let loading;
        if(this.state.isLoading) {
            loading = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        }

        let message;
        if(this.state.message) {
            message = <Block className="text-align-center">
                {this.state.message}
            </Block>;
        }

        return(
            <Page name="appointment" className="page page-appointment">
                <Navbar>
                    <NavLeft>
                        <Link href="/" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Request to Buy This Item with Delivery</NavTitle>
                </Navbar>
                <div className="notifi segments">
                    <div className="container">
                        <ProductCardHorizontal item={itemInfo} lat={currLat} lng={currLng}/>
                        <List>
                            <li>
                                <div className="item-content item-input item-input-outline">
                                    <div className="item-inner">
                                        <div class="item-title item-label">Requested Time</div>
                                        <div className="item-input-wrap">
                                            <input type="text" placeholder="Select date and time" readOnly id="demo-calendar-date-time"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <ListInput
                                outline
                                onChange={this.onNameChange}
                                value={this.state.name}
                                ref={formName => (this.formName = formName)}
                                label="Name"
                                type="text"
                                required
                                validate
                                onInputClear={() => this.setState({ name: "" })}
                            />
                            <ListInput
                                outline
                                onChange={this.onEmailChange}
                                value={this.state.email}
                                label="Email Address"
                                type="email"
                                onInputClear={() => this.setState({ email: "" })}
                            />
                            <ListInput
                                outline
                                onChange={this.onPhoneNumberChange}
                                value={this.state.phoneNumber}
                                label="Phone Number"
                                type="text"
                                onInputClear={() => this.setState({ phoneNumber: "" })}
                            />
                            <ListInput
                                outline
                                onChange={this.onWeChatChange}
                                value={this.state.wechat}
                                label="WeChat ID (Optional)"
                                type="text"
                                onInputClear={() => this.setState({ wechat: "" })}
                            />
                            <ListInput
                                outline
                                onChange={this.onFacebookChange}
                                value={this.state.facebook}
                                label="Facebook (Optional)"
                                type="text"
                                onInputClear={() => this.setState({ destination: "" })}
                            />
                            <ListInput
                                outline
                                onChange={this.onDestinationChange}
                                value={this.state.destination}
                                label="Destination"
                                type="text"
                                onInputClear={() => this.setState({ destination: "" })}
                            />
                            <ListInput
                                outline
                                label="Delivery Notes (Special Requests)"
                                type="textarea"
                                placeholder="Add Notes Here >"
                                resizable
                                onFocus={() => this.setState({ notesPopupOpened: true })}
                            />
                        </List>
                        {validMsg}
                        {loading}
                        {message}
                        <Button className="general-btn" disabled={this.state.isLoading} style={{color: "#fff", marginTop: 20}} onClick={this.submitAppointment} raised fill round>Confirm Appointment Request</Button>
                    </div>
                </div>

                <Popup className="item-desc-popup" opened={this.state.notesPopupOpened} onPopupClosed={() => this.setState({notesPopupOpened : false})}>
                    <Page>
                        <Navbar title="Item's Description">
                        <NavRight>
                            <Link popupClose>Close</Link>
                        </NavRight>
                        </Navbar>
                        <Block>
                            <TextEditor
                                value={this.state.notes}
                                onTextEditorChange={this.onEditorChange}
                                placeholder="e.g. Additional Items to be Delivered or Any Special Requests"
                                buttons={[
                                    ['bold', 'italic', 'underline', 'strikeThrough'],
                                    ['orderedList', 'unorderedList']
                                ]}
                            />
                        </Block>
                    </Page>
                </Popup>

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
})(MakeAppointmentWithDelivery);