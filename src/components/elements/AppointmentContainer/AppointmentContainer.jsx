import React, { Component } from 'react';
import AppointmentBar from "../AppointmentBar/AppointmentBar";

class AppointmentContainer extends Component {


    render() {
        if(typeof(this.props.items) !== "undefined") {
            
            var items = this.props.items;
            items = items.map(function(item, i) {
                return <div key={i+1}><AppointmentBar /></div>
            });
            
            return(
                <div className="transaction segments">
                    <div className="container">
                        {items}
                    </div>
                </div>
            );
        } else {
            return '';
        }
        
    }

}

export default AppointmentContainer;