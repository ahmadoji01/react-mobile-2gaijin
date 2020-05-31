import React, { Component } from 'react';
import './AppointmentConfirmationNotif.scss';
import Moment from 'react-moment';


class AppointmentConfirmationNotif extends Component {

    render() {
        if(typeof(this.props.item) !== "undefined"){
            var notifItem = this.props.item;
            var avatarURL = "image"

            return(
                <React.Fragment>
                    <div className="content">
                        <img src="images/discount.png" alt="notification-image" />
                        <div className="text">
                            <h6>{notifItem.notification_user.first_name} sent you an appointment request</h6>
                            <p>on <Moment>{notifItem.appointment.meeting_time}</Moment> for this item:</p>
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

export default AppointmentConfirmationNotif;