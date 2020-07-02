import React, { Component } from "react";
import { Page } from "framework7-react";
import EmptyIllustration from "../../illustrations/EmptyIllustration.png";
import "./EmptyPage.scss";

class EmptyPage extends Component {
    render() {

        var emptyTitle = "Be more active with us!";
        if(typeof(this.props.title) !== "undefined") {
            emptyTitle = this.props.title;
        }

        var emptyExplanation = "Catch up with us by browsing on one of items posted by our community...";
        if(typeof(this.props.explanation) !== "undefined") {
            emptyExplanation = this.props.explanation;
        }

        return (
            <div style={{height: '100%', width: '100%', padding: 10, paddingTop: 100}} className="display-flex justify-content-center align-items-center">
                <div>
                    <div style={{display: 'table', margin: '0 auto'}}><img style={{ maxWidth: 250 }} src={EmptyIllustration} /></div>
                    <div style={{fontWeight: 900, display: 'table', margin: '0 auto', textAlign: "center"}}><h3><b>{emptyTitle}</b></h3></div>
                    <div style={{fontWeight: 500, display: 'table', margin: '0 auto', textAlign: "center"}}><h6><b>{emptyExplanation}</b></h6></div>
                </div>
            </div>
        );
    }
}

export default EmptyPage;