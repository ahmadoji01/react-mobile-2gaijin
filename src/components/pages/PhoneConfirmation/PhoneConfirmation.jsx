import React, { Component } from "react";
import { Page, Popup, Button } from "framework7-react";
import { ReactComponent as AppointmentIllustration } from "../../illustrations/AppointmentIllustration.svg";
import PhoneConfirmIllustration from "../../illustrations/PhoneConfirmIllustration.png";
import ConfirmedIllustration from "../../illustrations/ConfirmedIllustration.png";
import axios from "axios";

class PhoneConfirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmed: false
        };
        this.backToHome = this.backToHome.bind(this);
    }

    backToHome() {
        this.$f7router.navigate("/");
    }

    componentDidMount() {
        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
            params: {
              phone: this.props.phone,
              confirm_token: this.props.token
            }
        }

        var self = this;
        return axios
        .get(`https://go.2gaijin.com/confirm_phone`, config)
        .then(response => {
            console.log(response);
            if(response.data.status == "Success") {
                self.setState({ confirmed: true });
            } else {
                self.$f7.view.main.router.navigate("/error/somethingwrong");
            }
        });
    }

    render() {
        return (
            <Page>
                <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                    <div>
                        <div style={{display: 'table', margin: '0 auto'}}><AppointmentIllustration /></div>
                        <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Confirming Phone...</b></h3></div>
                        <div className="appointment-sent-text">
                            Please wait while we are confirming your phone...
                        </div>
                    </div>
                </div>
                <Popup className="demo-popup-push" opened={this.state.confirmed} onPopupClosed={() => this.setState({confirmed: false})} push>
                    <Page>
                        <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                            <div>
                                <div style={{display: 'table', margin: '0 auto'}}><AppointmentIllustration /></div>
                                <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Phone Confirmed!</b></h3></div>
                                <div className="appointment-sent-text">
                                    You can now enjoy surfing and have your own items sold on our platform!
                                </div>
                            </div>
                        </div>
                        <div style={{height: '10%', width: '100%', padding: 5}}>
                            <Button className="general-btn" href="/" style={{color: '#fff'}} raised fill round>Back to Home</Button>
                        </div>
                    </Page>
                </Popup>
            </Page>
        );
    }
}

export default PhoneConfirmation;