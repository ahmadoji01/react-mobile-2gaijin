import React, { Component } from "react";
import { Page, Radio, Button } from "framework7-react";
import SubscriptionIllustration from "../../illustrations/SubscriptionIllustration.png";
import DiscountBadge from "../../illustrations/badge.svg";
import "./SubscriptionPage.scss";

class LoadingPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {activeClasses: [false, false, false, false, false], activeIndex: 0};
        this.toggleSelectedPricing = this.toggleSelectedPricing.bind(this);
        this.goToPaymentPage = this.goToPaymentPage.bind(this);
    }
    
    toggleSelectedPricing(index) {
        var activeClasses = this.state.activeClasses;
        var i = 0;
        for(i = 0; i < activeClasses.length; i++) {
            activeClasses[i] = false;
        }
        if(activeClasses[index] == false) {
            activeClasses[index] = true;
        } else {
            activeClasses[index] = false;
        }

        this.setState({ activeClasses: activeClasses });
        this.setState({ activeIndex: index });
    }

    goToPaymentPage() {
        var activeIndex = this.state.activeIndex;
        var months = 1;
        if(activeIndex == 0) {
            months = 1;
        } else if(activeIndex == 1) {
            months = 3;
        } else if(activeIndex == 2) {
            months = 5;
        } else if(activeIndex == 3) {
            months = 7;
        } else if(activeIndex == 4) {
            months = 9;
        }
            
        this.$f7.view.main.router.navigate("/payment/" + months)
    }
    
    render() {
        var activeClasses = this.state.activeClasses;
        return (
            <Page>
                <div style={{height: '90%', width: '100%'}} className="justify-content-center align-items-center">
                    <div className="row" style={{ marginTop: 30, paddingBottom: 0 }}>
                        <div className="col-100">
                            <div style={{display: 'table', margin: '0 auto'}}><img style={{ maxWidth: 300 }} src={SubscriptionIllustration} /></div>
                            <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h4><b>Choose a subscription plan</b></h4></div>
                            <div style={{fontWeight: 700, display: 'table', margin: '0 auto'}}><p style={{ marginRight: 10, marginLeft: 10, textAlign: "center" }}><b>...and start selling your worthy-unused items today</b></p></div>
                        </div>
                    </div>
                    <div onClick={() => this.toggleSelectedPricing(0)} className={`pricing-list-item pricing-first ${activeClasses[0]? "pricing-selected" : ""}`}>
                        <div className="row pricing-item-inner">
                            <div className="col-15 align-self-center">
                                <Radio name="demo-radio-inline" checked={activeClasses[0]? true : false} value="1"/>
                            </div>
                            <div className="col-40 align-self-center">
                                <p>1 month</p>
                            </div>
                            <div className="col-30">
                                <p style={{ textAlign: "right" }}><b>¥100</b><br />per month</p>
                            </div>
                            <div className="col-15">
                            </div>
                        </div>
                    </div>
                    <div onClick={() => this.toggleSelectedPricing(1)} className={`pricing-list-item ${activeClasses[1]? "pricing-selected" : ""}`}>
                        <div className="row pricing-item-inner">
                            <div className="col-15 align-self-center">
                                <Radio name="demo-radio-inline" checked={activeClasses[1]? true : false} value="1"/>
                            </div>
                            <div className="col-40 align-self-center">
                                <p>3 months</p>
                            </div>
                            <div className="col-30">
                                <p style={{ textAlign: "right" }}><b>¥300</b><br />per month</p>
                            </div>
                            <div className="col-15">
                            </div>
                        </div>
                    </div>
                    <div onClick={() => this.toggleSelectedPricing(2)} className={`pricing-list-item ${activeClasses[2]? "pricing-selected" : ""}`}>
                        <div className="row pricing-item-inner">
                            <div className="col-15 align-self-center">
                                <Radio name="demo-radio-inline" checked={activeClasses[2]? true : false} value="1"/>
                            </div>
                            <div className="col-40 align-self-center">
                                <p>5 months</p>
                            </div>
                            <div className="col-30">
                                <p style={{ textAlign: "right" }}><b>¥500</b><br />per month</p>
                            </div>
                            <div className="col-15">
                            </div>
                        </div>
                    </div>
                    <div onClick={() => this.toggleSelectedPricing(3)} className={`pricing-list-item ${activeClasses[3]? "pricing-selected" : ""}`}>
                        <div className="row pricing-item-inner">
                            <div className="col-15 align-self-center">
                                <Radio name="demo-radio-inline" checked={activeClasses[3]? true : false} value="1"/>
                            </div>
                            <div className="col-40 align-self-center">
                                <p>7 months</p>
                            </div>
                            <div className="col-30">
                                <p style={{ textAlign: "right" }}><b>¥700</b><br />per month</p>
                            </div>
                            <div className="col-15">
                            </div>
                        </div>
                    </div>
                    <div onClick={() => this.toggleSelectedPricing(4)} className={`pricing-list-item pricing-last ${activeClasses[4]? "pricing-selected" : ""}`}>
                        <div className="row pricing-item-inner">
                            <div className="col-15 align-self-center">
                                <Radio name="demo-radio-inline" checked={activeClasses[4]? true : false} value="1"/>
                            </div>
                            <div className="col-40 align-self-center">
                                <p>9 months</p>
                            </div>
                            <div className="col-30">
                                <p style={{ textAlign: "right" }}><b>¥900</b><br />per month</p>
                            </div>
                            <div className="col-15">
                            </div>
                        </div>
                    </div>
                    <div style={{height: '10%', marginTop: 10, padding: 10 }}>
                        <Button className="general-btn" onClick={ this.goToPaymentPage } style={{color: '#fff'}} raised fill round>Subscribe and Start Selling</Button>
                    </div>
                </div>
            </Page>
        );
    }
}

export default LoadingPage;