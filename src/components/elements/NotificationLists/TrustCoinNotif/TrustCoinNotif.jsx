import React, { Component } from 'react';
import './TrustCoinNotif.scss';
import Moment from 'react-moment';
import ProductCardHorizontal from '../../ProductCardHorizontal';
import { Button } from "framework7-react";
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
                        <Button className="general-btn" style={{color: "#fff", marginTop: 5}} onClick={() => this.giveTrustCoin()} raised fill round>Send Tip</Button>
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
                                    <h6>{notifItem.notification_user.first_name} has finished transaction with you</h6>
                                </div>
                            </div>
                        </div>
                        {trustCoinButton}
                    </div>
                    <div className="divider-space-content"></div>
                </React.Fragment>
            );
        } else {
            return '';
        } 
    }

}

export default TrustCoinNotif;