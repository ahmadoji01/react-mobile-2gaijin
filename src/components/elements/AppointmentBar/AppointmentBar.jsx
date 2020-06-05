import React, { Component } from 'react';
import './AppointmentBar.scss';
import { geolocated } from 'react-geolocated';
import { Button } from "framework7-react";
import ProductCardHorizontal from '../ProductCardHorizontal';
import Moment from 'react-moment';
import axios from 'axios';

class AppointmentBar extends Component {
    

    constructor(props) {
        super(props);
        this.state = { currLat: 0.0, currLng: 0.0, status: this.props.item.status };
        this.findCoordinates = this.findCoordinates.bind(this);
        this.finishAppointment = this.finishAppointment.bind(this);
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const location = JSON.stringify(position);
            this.setState({ currLat: position.coords.latitude, currLng: position.coords.longitude });
        });
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

    finishAppointment(id) {
        var payload = {
            "_id": id,
        }

        return axios.post(`https://go.2gaijin.com/finish_appointment`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                var jsonData = response.data.data;
                this.setState({ status: "finished" });
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
            if(this.props.item.status != "rejected") {
                var item = this.props.item;
                var avatarURL = "image"

                avatarURL = item.appointment_user.avatar_url;
                if(avatarURL == "") {
                    avatarURL = "images/avatar-placeholder.png";
                }
                
                let notifButton;
                if(this.props.type == "seller") {
                    if(this.state.status == "accepted") {
                        notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <div className="col-50">
                                <Button className="general-washout-btn" style={{color: "#000", marginTop: 5}} raised fill round>Reschedule</Button>
                            </div>
                            <div className="col-50">
                                <Button className="general-btn" style={{color: "#fff", marginTop: 5}} onClick={() => this.finishAppointment(item._id)} raised fill round>Finish Transaction</Button>
                            </div>
                        </div>
                    } else if(this.state.status == "rejected") {
                        notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <Button className="general-disabled-btn" style={{color: "#EF7132", marginTop: 5}} color="orange" raised fill round>This Appointment is Rejected</Button>
                        </div>
                    } else if(this.state.status == "pending") {
                        notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <div className="col-50">
                                <Button className="general-btn" style={{color: "#fff", marginTop: 5}} onClick={() => this.acceptAppointment(item._id)} color="orange" raised fill round>Accept</Button>
                            </div>
                            <div className="col-50">
                                <Button className="general-reject-btn" style={{color: "#fff", marginTop: 5}} onClick={() => this.rejectAppointment(item._id)} color="orange" raised fill round>Reject</Button>
                            </div>
                        </div>
                    } else if(this.state.status == "finished") {
                        notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <Button className="general-disabled-btn" style={{color: "#EF7132", marginTop: 5}} raised fill round>Appointment has finished</Button>
                        </div>
                    }
                } else if(this.props.type == "buyer") {
                    if(this.state.status == "accepted") {
                        notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <div className="col-50">
                                <Button className="general-washout-btn" style={{color: "#000", marginTop: 5}} raised fill round>Chat with Seller</Button>
                            </div>
                        </div>
                    } else if(this.state.status == "rejected") {
                        notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <Button className="general-disabled-btn" style={{color: "#EF7132", marginTop: 5}} color="orange" raised fill round>This Appointment is Rejected</Button>
                        </div>
                    } else if(this.state.status == "pending") {
                        notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <div className="col-50">
                                <Button className="general-washout-btn" style={{color: "#000", marginTop: 5}} raised fill round>Chat with Seller</Button>
                            </div>
                            <div className="col-50">
                                <Button className="general-disabled-btn" style={{color: "#EF7132", marginTop: 5}} raised fill round>In Review...</Button>
                            </div>
                        </div>
                    } else if(this.state.status == "finished") {
                        notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <Button className="general-disabled-btn" style={{color: "#EF7132", marginTop: 5}} raised fill round>Appointment has finished</Button>
                        </div>
                    }
                }

                return(
                    <React.Fragment>
                        <div className="content">
                            <div className="row" style={{paddingBottom: 0, marginBottom: 10}}>
                                <div className="col-10 notif-img-container" style={{backgroundImage: `url("${avatarURL}")`, width: '10%'}}></div>
                                <div className="col-90">
                                    <div className="text">
                                        <h6>{item.appointment_user.first_name}</h6>
                                        <h7 style={{color: "black"}}><Moment calendar={calendarStrings}>{item.meeting_time}</Moment></h7>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: 0, paddingBottom: 0, marginBottom: 0}}>
                                <ProductCardHorizontal item={item.product_detail} />
                            </div>
                            {notifButton}
                        </div>
                        <div className="divider-space-content"></div>
                    </React.Fragment>
                );
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(AppointmentBar);