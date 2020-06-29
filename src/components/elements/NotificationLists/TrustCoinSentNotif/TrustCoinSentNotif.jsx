import React, { Component } from "react";
import Moment from 'moment';
import "./TrustCoinSentNotif.scss";

class TrustCoinSentNotif extends Component {

    render() {
        if(typeof(this.props.item) !== "undefined") {
            var notifItem = this.props.item;
            var avatarURL = "image"

            avatarURL = notifItem.notification_user.avatar_url;
            if(avatarURL == "") {
                avatarURL = "images/avatar-placeholder.png";
            }

            let coinText, coinImg;
            if(notifItem.status == "gold") {
                coinText = <b>Gold Coin</b>;
                coinImg = <img src={`${process.env.PUBLIC_URL}/images/gold-coin.png`} />;
            } else if(notifItem.status == "silver") {
                coinText = <b>Silver Coin</b>;
                coinImg = <img src={`${process.env.PUBLIC_URL}/images/silver-coin.png`} />;
            }

            return (
                <React.Fragment>
                    <div className="content">
                        <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <a href={`/profile/${notifItem.notification_user._id}`}  className="col-10 notif-img-container" style={{backgroundImage: `url("${avatarURL}")`, width: "10%"}}></a>
                            <div className="col-90">
                                <div className="text">
                                    <h7><b>{notifItem.notification_user.first_name}</b> sent you {coinImg} {coinText}. Fancy!</h7>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider-space-content"></div>
                </React.Fragment>
            );
        } else {
            return '';
        }
    }

}

export default TrustCoinSentNotif;