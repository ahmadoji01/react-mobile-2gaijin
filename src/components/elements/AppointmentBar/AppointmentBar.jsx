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
        this.state = { currLat: 0.0, currLng: 0.0 };
        this.findCoordinates = this.findCoordinates.bind(this);
        this.finishAppointment = this.finishAppointment.bind(this);
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const location = JSON.stringify(position);
            this.setState({ currLat: position.coords.latitude, currLng: position.coords.longitude });
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
                this.setState({ status: "rejected" });
            }
        });
    }
    
    render() {
        if(typeof(this.props.item) !== "undefined"){
            if(this.props.item.status != "rejected") {
                var item = this.props.item;
                var avatarURL = "image"

                avatarURL = item.appointment_user.avatar_url;
                if(avatarURL == "") {
                    avatarURL = "images/avatar-placeholder.png";
                }
                
                let notifButton;
                if(item.status == "accepted") {
                    notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                        <div className="col-50">
                            <Button raised fill round>Reschedule</Button>
                        </div>
                        <div className="col-50">
                            <Button onClick={() => this.finishAppointment(item._id)} raised fill round>Finish Transaction</Button>
                        </div>
                    </div>
                } else if(item.status == "rejected") {
                    notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                    You have rejected this appointment
                    </div>
                } else if(item.status == "pending") {
                    notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                        <div className="col-50">
                            <Button raised fill round>Accept</Button>
                        </div>
                        <div className="col-50">
                            <Button raised fill round>Reject</Button>
                        </div>
                    </div>
                } else if(item.status == "finished") {
                    notifButton = <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                        <div className="col-50">
                            <Button raised fill round>Accept</Button>
                        </div>
                        <div className="col-50">
                            <Button raised fill round>Reject</Button>
                        </div>
                    </div>
                }

                return(
                    <React.Fragment>
                        <div className="content">
                            <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                                <div className="col-10 notif-img-container" style={{backgroundImage: `url("${avatarURL}")`}}></div>
                                <div className="col-90">
                                    <div className="text">
                                        <h6>{item.appointment_user.first_name}</h6>
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