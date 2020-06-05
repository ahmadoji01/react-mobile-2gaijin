import React, { Component } from "react";
import './Notification.scss';
import { Icon, Link, Page, Navbar, NavLeft, NavTitle } from 'framework7-react';
import axios from 'axios';
import AppointmentConfirmationNotif from "../../elements/NotificationLists/AppointmentConfirmationNotif/AppointmentConfirmationNotif";
import TrustCoinNotif from "../../elements/NotificationLists/TrustCoinNotif/TrustCoinNotif";
import Moment from 'react-moment';
import moment from 'moment';

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            isLoading: false
        }
    }

    componentWillMount() {
        let config = {
            headers: { 
                "Authorization": localStorage.getItem("access_token")
            },
            params: {
              
            }
        }  
  
        this.setState({isLoading: true});
        return axios
        .get(`https://go.2gaijin.com/get_notifications`, config)
        .then(response => {
            if(response.data.data){
                this.setState({ notifications: response.data.data.notifications });
            }
            this.setState({isLoading: false});
        });
    }

    render() {
        const calendarStrings = {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : '[last] dddd',
            nextWeek : 'dddd',
            sameElse : 'L'
        };

        let notifItems;
        var comparedTime = moment();
        if(this.state.notifications.length >= 1) {
            notifItems = this.state.notifications.map(function(notifItem, i) {
                let notifType;
                if(notifItem.type == "order_incoming") {
                    notifType = <div key={i+1}><AppointmentConfirmationNotif item={notifItem} confirmation={false} /></div>;
                } else if(notifItem.type == "appointment_confirmation") {
                    notifType = <div key={i+1}><AppointmentConfirmationNotif item={notifItem} confirmation={true} /></div>;
                } else if(notifItem.type == "give_trust_coin") {
                    notifType = <div key={i+1}><TrustCoinNotif item={notifItem} /></div>
                }
                
                if( i == 0 || !comparedTime.isSame(notifItem.created_at, 'day') ) {
                    comparedTime = moment(notifItem.created_at);
                    return <React.Fragment>
                        <div className="title-time">
                            <span><Moment calendar={calendarStrings}>{notifItem.created_at}</Moment></span>
                        </div>
                        {notifType}
                    </React.Fragment>;
                }
                return(notifType);
            });
        }

        return (
            <Page>
                <Navbar>
                    <NavLeft>
                        <Link href="/" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Notification</NavTitle>
                </Navbar>
                <div className="notifi segments">
                    <div className="container">
                        {notifItems}
                    </div>
                </div>
            </Page>
        );
    }

}

export default Notification;