import React, { Component } from "react";
import { Page, Popup, Button } from "framework7-react";
import EmailConfirmIllustration from "../../illustrations/EmailConfirmIllustration.png";
import ConfirmedIllustration from "../../illustrations/ConfirmedIllustration.png";
import axios from "axios";

class EmailConfirmation extends Component {

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
              email: this.props.email,
              confirm_token: this.props.token
            }
        }

        var self = this;
        return axios
        .get(`https://go.2gaijin.com/confirm_email`, config)
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
                        <div style={{display: 'table', margin: '0 auto'}}><img style={{ maxWidth: 300 }} src={EmailConfirmIllustration} /></div>
                        <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Confirming Email...</b></h3></div>
                        <div className="appointment-sent-text">
                            Please wait while we are confirming your email...
                        </div>
                    </div>
                </div>
                <Popup className="demo-popup-push" opened={this.state.confirmed} onPopupClosed={() => this.setState({confirmed: false})} push>
                    <Page>
                        <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                            <div style={{padding: 5}}>
                                <div style={{display: 'table', margin: '0 auto'}}><img style={{ maxWidth: 300 }} src={ConfirmedIllustration} /></div>
                                <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Email has been Confirmed!</b></h3></div>
                                <div className="appointment-sent-text">
                                    You can now enjoy surfing and have your own items sold on our platform!
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

export default EmailConfirmation;