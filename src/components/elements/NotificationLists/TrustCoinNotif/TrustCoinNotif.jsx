import React, { Component } from 'react';
import './TrustCoinNotif.scss';
import Moment from 'react-moment';
import ProductCardHorizontal from '../../ProductCardHorizontal';
import { Button, Sheet, PageContent, Block, BlockTitle } from "framework7-react";
import axios from 'axios';

class TrustCoinNotif extends Component {

    state = {
        status: this.props.item.status,
    }

    giveTrustCoin() {

    }

    render() {
        const calendarStrings = {
            lastDay : '[Yesterday at ] LT',
            sameDay : '[Today at ] LT',
            nextDay : '[Tomorrow at ] LT',
            lastWeek : '[last] dddd [at] LT',
            nextWeek : 'dddd [at] LT',
            sameElse : 'dddd, L [at] LT'
        };

        if(typeof(this.props.item) !== "undefined"){
            var notifItem = this.props.item;
            var avatarURL = "image"

            avatarURL = notifItem.notification_user.avatar_url;
            if(avatarURL == "") {
                avatarURL = "images/avatar-placeholder.png";
            }
            
            let trustCoinButton;
            if(this.state.status == "finished") {
                trustCoinButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                    <Button className="general-disabled-btn" style={{color: "#EF7132", marginTop: 5}} raised fill round>Tip has been sent. Fancy!</Button>
                </div>
            } else if(this.state.status == "pending") {
                trustCoinButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                    <div className="col-50">
                        <Button sheetOpen=".demo-sheet-swipe-to-close" className="general-btn" style={{color: "#fff", marginTop: 5}} raised fill round>Send Tip</Button>
                    </div>
                </div>
            }
            return (
                <React.Fragment>
                    <div className="content">
                        <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <div className="col-10 notif-img-container" style={{backgroundImage: `url("${avatarURL}")`, width: "10%"}}></div>
                            <div className="col-90">
                                <div className="text">
                                    <h7><b>{notifItem.notification_user.first_name}</b> has finished transaction with you</h7>
                                </div>
                            </div>
                        </div>
                        {trustCoinButton}
                    </div>
                    <div className="divider-space-content"></div>
                    <Sheet
                        className="demo-sheet-swipe-to-close"
                        style={{height: 'auto', '--f7-sheet-bg-color': '#fff'}}
                        swipeToClose
                        backdrop
                        >
                        <PageContent>
                            <Block>
                                <p style={{textAlign: "center"}}><h4>How is transaction experience with {notifItem.notification_user.first_name}?</h4></p>
                                <div style={{width: "100%"}}>
                                    <div className="row" style={{height: 300}}>
                                        <div className="col-50">
                                        </div>
                                        <div className="col-50">
                                        </div>
                                    </div>
                                </div>
                            </Block>
                        </PageContent>
                    </Sheet>
                </React.Fragment>
            );
        } else {
            return '';
        } 
    }

}

export default TrustCoinNotif;