import React, { Component } from "react";
import './Delivery.scss';
import { Icon, Link, Page, Navbar, NavLeft, NavTitle, Button, Popup, Block, Preloader, List, ListInput, NavRight, TextEditor } from 'framework7-react';
import { ReactComponent as AppointmentIllustration } from "../../illustrations/AppointmentIllustration.svg";
import axios from 'axios';
import AuthService from "../../../services/auth.service.js";

class Delivery extends Component {

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
            origin: "",
            destination: "",
            wechat: "",
            facebook: "",
            notes: "",
            notesPopupOpened: false
        };
        this.submitDelivery = this.submitDelivery.bind(this);
        this.backToHome = this.backToHome.bind(this);
        this.onOriginChange = this.onOriginChange.bind(this);
        this.onDestinationChange = this.onDestinationChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onFacebookChange = this.onFacebookChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
        this.onWeChatChange = this.onWeChatChange.bind(this);
    }

    submitDelivery() {
        var calendarPicker = document.getElementById("demo-calendar-date-time");
        var meetingTime = new Date(calendarPicker.value).getTime();
        if(calendarPicker.value == "") {
            this.setState({ validateInput: 1 });
            return;
        }
        var status = "pending";
        var payload = {
            "origin": this.state.origin,
            "destination": this.state.destination,
            "name": this.state.name,
            "email": this.state.email,
            "phone": this.state.phoneNumber,
            "wechat": this.state.wechat,
            "facebook": this.state.facebook,
            "notes": this.state.notes,
            "delivery_time": meetingTime
        }
        
        var self = this;
        AuthService.refreshToken().then(() => {
            self.setState({ message: "", isLoading: true });
            return axios
            .post(`https://go.2gaijin.com/insert_delivery`, payload, { 
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

    componentWillMount() {
        this.setState({ name: localStorage.getItem("first_name") + " " + localStorage.getItem("last_name") });
        this.setState({ email: localStorage.getItem("email") });
        this.setState({ phoneNumber: localStorage.getItem("phone") });
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

    onOriginChange(e) {
        this.setState({ origin: e.target.value });
    }

    onDestinationChange(e) {
        this.setState({ destination: e.target.value });
    }

    onEditorChange(e) {
        this.setState({ notes: e });
    }

    render() {
        
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
                    <NavTitle>Order Delivery</NavTitle>
                </Navbar>
                <div className="notifi segments">
                    <div className="container">
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
                                onChange={this.onOriginChange}
                                value={this.state.origin}
                                label="Origin"
                                type="text"
                                onInputClear={() => this.setState({ origin: "" })}
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
                        <Button className="general-btn" disabled={this.state.isLoading} style={{color: "#fff", marginTop: 20}} onClick={this.submitDelivery} raised fill round>Request Delivery</Button>
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
                                <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Delivery Request Sent!</b></h3></div>
                                <div className="appointment-sent-text">
                                    Our delivery partner will get back to you later. Meanwhile, you can enjoy your time surfing through our website!
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

export default Delivery;