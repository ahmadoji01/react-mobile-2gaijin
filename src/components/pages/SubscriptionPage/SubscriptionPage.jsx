import React, { Component } from "react";
import { Page, Preloader } from "framework7-react";
import SubscriptionIllustration from "../../illustrations/SubscriptionIllustration.png";

class LoadingPage extends Component {
    render() {
        return (
            <Page>
                <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                    <div>
                        <div style={{display: 'table', margin: '0 auto'}}><img style={{ maxWidth: 300 }} src={SubscriptionIllustration} /></div>
                        <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h4><b>Choose a subscription plan</b></h4></div>
                        <div style={{fontWeight: 700, display: 'table', margin: '0 auto'}}><p><b>...and start selling your items today</b></p></div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default LoadingPage;