import React, { Component } from "react";
import { Page, Preloader } from "framework7-react";
import LoadingIllustration from "../../illustrations/LoadingIllustration.png";

class LoadingPage extends Component {
    render() {
        return (
            <Page>
                <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                    <div>
                        <div style={{display: 'table', margin: '0 auto'}}><img style={{ maxWidth: 300 }} src={LoadingIllustration} /></div>
                        <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>2Gaijin is Loading...</b></h3></div>
                        <div className="appointment-sent-text">
                            The owner will respond to your request in a few hours. Check your notification page for update!
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default LoadingPage;