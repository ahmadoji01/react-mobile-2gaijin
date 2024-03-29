import React, { Component } from 'react';
import './AppointmentConfirmationNotif.scss';
import Moment from 'react-moment';
import ProductCardHorizontal from '../../ProductCardHorizontal';
import { Button, Link } from "framework7-react";
import axios from 'axios';


class AppointmentConfirmationNotif extends Component {
    
    state = {
        status: this.props.item.status,
    }

    constructor(props) {
        super(props);
        this.acceptAppointment = this.acceptAppointment.bind(this);
    }

    acceptAppointment(appointmentID) {
        var payload = {
            "_id": appointmentID,
            "status": "accepted",
        }

        return axios.post(`https://go.2gaijin.com/confirm_appointment`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                var jsonData = response.data.data;
                this.setState({ status: "accepted" });
            }
        });
    }

    rejectAppointment(appointmentID) {
        var payload = {
            "_id": appointmentID,
            "status": "rejected",
        }

        return axios.post(`https://go.2gaijin.com/confirm_appointment`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                var jsonData = response.data.data;
                this.setState({ status: "rejected" });
            }
        });
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
            var meetingTime = notifItem.appointment.meeting_time;
            var avatarURL = "image"

            avatarURL = notifItem.notification_user.avatar_url;
            if(avatarURL == "") {
                avatarURL = "images/avatar-placeholder.png";
            }
            
            let notifButton;
            if(this.state.status == "accepted") {
                notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                    <div className="col-50">
                        <Button className="general-btn" style={{color: "#fff", marginTop: 5}} href="/see-appointment" color="orange" raised fill round>Go To Appointment</Button>
                    </div>
                    <div className="col-50">
                        <Button className="general-disabled-btn" style={{color: "#EF7132", marginTop: 5}} color="orange" raised fill round>Accepted</Button>
                    </div>
                </div>
            } else if(this.state.status == "rejected") {
                notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                   <Button className="general-disabled-btn" style={{color: "#EF7132", marginTop: 5}} color="orange" raised fill round>This Appointment is Rejected</Button>
                </div>
            } else if(this.state.status == "pending") {
                notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                    <div className="col-50">
                        <Button className="general-btn" style={{color: "#fff", marginTop: 5}} onClick={() => this.acceptAppointment(notifItem.appointment_id)} color="orange" raised fill round>Accept</Button>
                    </div>
                    <div className="col-50">
                        <Button className="general-reject-btn" style={{color: "#fff", marginTop: 5}} onClick={() => this.rejectAppointment(notifItem.appointment_id)} color="orange" raised fill round>Reject</Button>
                    </div>
                </div>
            }

            let notifTitle;
            if(this.props.confirmation) {
                if(notifItem.status == "rejected") {
                    notifTitle = <h7><b>{notifItem.notification_user.first_name}</b> rejected your <b>Appointment Request</b> on <b><Moment calendar={calendarStrings}>{notifItem.appointment.meeting_time}</Moment></b> for this item:</h7>;
                } else if(notifItem.status == "accepted") {
                    notifTitle = <h7><b>{notifItem.notification_user.first_name}</b> accepted your <b>Appointment Request</b> on <b><Moment calendar={calendarStrings}>{notifItem.appointment.meeting_time}</Moment></b> for this item:</h7>;
                }
            } else {
                notifTitle = <React.Fragment><h7>{notifItem.notification_user.first_name} sent you an appointment request</h7>
                <p className="notif-appointment-note">Appointment can be rescheduled after accepted</p>
                </React.Fragment>
            }

            return(
                <React.Fragment>
                    <div className="content">
                        <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <a href={`/profile/${notifItem.notification_user._id}`} className="col-10 notif-img-container" style={{backgroundImage: `url("${avatarURL}")`, width: "10%"}}></a>
                            <div className="col-90">
                                <div className="text">
                                    {notifTitle}
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{paddingBottom: 0, marginBottom: 10}}>
                            <ProductCardHorizontal item={notifItem.product} meeting_time={meetingTime} />
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