import React, { Component } from "react";
import './Notification.scss';
import { Icon, Link, Page, Navbar, NavLeft, NavTitle } from 'framework7-react';
import axios from 'axios';
import AppointmentConfirmationNotif from "../../elements/NotificationLists/AppointmentConfirmationNotif/AppointmentConfirmationNotif";

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
        .get("/get_notifications", config)
        .then(response => {
            this.setState({ notifications: response.data.data.notifications });
            this.setState({isLoading: false});
        });
    }

    render() {
        
        let notifItems;
        if(this.state.notifications.length >= 1) {
            notifItems = this.state.notifications.map(function(notifItem, i) {
                return <div key={i+1}><AppointmentConfirmationNotif item={notifItem} /></div>
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
                        <div className="title-time">
                            <span>TODAY</span>
                        </div>
                        {notifItems}
                    </div>
                </div>
            </Page>
        );
    }

}

export default Notification;