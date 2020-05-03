import React, { Component } from "react";
import Navbar from '../../elements/Navbar';
import Toolbar from "../../elements/Toolbar";
import './Home.scss';
import HomeTab from "../../tabs/HomeTab";
import AppointmentTab from "../../tabs/AppointmentTab/AppointmentTab";
import AuthService from "../../../services/auth.service";

class Home extends Component {
    
    render() {
        console.log(AuthService.getCurrentUser())  
        return (
            <div className="App">
                <div className="page page-home page-with-subnavbar">
                    <Toolbar />
                    <Navbar />
                    <div className="tabs">
                        <div id="tab-home" className="tab tab-active tab-home">
                            <HomeTab />
                        </div>
                        <div id="tab-appointment" className="tab tab-appointment">
                            <AppointmentTab />
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}
 
export default Home;