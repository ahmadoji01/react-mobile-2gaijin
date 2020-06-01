import React, { Component } from 'react';
import './AppointmentConfirmationNotif.scss';
import Moment from 'react-moment';
import ProductCardHorizontal from '../../ProductCardHorizontal';
import { Button } from "framework7-react";


class AppointmentConfirmationNotif extends Component {

    render() {
        if(typeof(this.props.item) !== "undefined"){
            var notifItem = this.props.item;
            var avatarURL = "image"

            avatarURL = notifItem.notification_user.avatar_url;
            if(avatarURL == "") {
                avatarURL = "images/avatar-placeholder.png";
            }
            
            let notifButton;
            if(notifItem.status == "accepted") {
                notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                    <div className="col-50">
                        <Button raised fill round>Go To Appointment</Button>
                    </div>
                    <div className="col-50">
                        <Button raised fill round>Accepted</Button>
                    </div>
                </div>
            } else if(notifItem.status == "rejected") {
                notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                   You have rejected this appointment
                </div>
            } else if(notifItem.status == "pending") {
                notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                    <div className="col-50">
                        <Button raised fill round>Accept</Button>
                    </div>
                    <div className="col-50">
                        <Button raised fill round>Reject</Button>
                    </div>
                </div>
            }

            console.log(notifItem.status);

            return(
                <React.Fragment>
                    <div className="content">
                        <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <div className="col-10 notif-img-container" style={{backgroundImage: `url("${avatarURL}")`}}></div>
                            <div className="col-90">
                                <div className="text">
                                    <h6>{notifItem.notification_user.first_name} sent you an appointment request</h6>
                                    <p>on <Moment>{notifItem.appointment.meeting_time}</Moment> for this item:</p>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{paddingBottom: 0, marginBottom: 10}}>
                            <ProductCardHorizontal item={notifItem.product} />
                        </div>
                        {notifButton}
                    </div>
                    <div className="divider-space-content"></div>
                </React.Fragment>
            );
        } else {
            return '';
        }
    }

}

export default AppointmentConfirmationNotif;