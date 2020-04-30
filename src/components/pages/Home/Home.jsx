import React, { Component } from "react";
import Navbar from '../../elements/Navbar';
import Sidebar from '../../elements/Sidebar';
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySection from "../../elements/ProductDisplaySection";
import CategorySlider from "../../elements/CategorySlider";
import Toolbar from "../../elements/Toolbar";
import './Home.scss';
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import ProductDisplayContainer from "../../elements/ProductDisplayContainer";
import ProductContainerInfinite from "../../elements/ProductContainerInfinite";
import HomeTab from "../../tabs/HomeTab";
import AppointmentTab from "../../tabs/AppointmentTab/AppointmentTab";

class Home extends Component {
    
    render() {  
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