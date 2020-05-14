import React, { Component } from "react";
//import Navbar from '../../elements/Navbar';
//import Toolbar from "../../elements/Toolbar";
import { Icon, Navbar, Toolbar, NavLeft, NavTitle, NavRight, Link, Page, PageContent, Searchbar, Subnavbar, Block } from 'framework7-react';
import './Home.scss';
import HomeTab from "../../tabs/HomeTab";
import AppointmentTab from "../../tabs/AppointmentTab/AppointmentTab";
import AccountTab from "../../tabs/AccountTab/AccountTab";
import AuthService from "../../../services/auth.service";
import WishlistTab from "../../tabs/WishlistTab/WishlistTab";
import Cookies from 'js-cookie';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if(document.getElementById("navbar-home")) {
            document.getElementById("navbar-home").style.display = "block";
        }
    }

    render() {
        return (
            <Page name="home" className="page page-home page-with-subnavbar">
                <Navbar title="My App" backLink="Back" large titleLarge="Large Title"></Navbar>
                <Toolbar id="toolbar-home" tabbar labels position='bottom'>
                    <Link tabLink="#tab-home" tabLinkActive text="Home" iconIos="f7:envelope_fill" iconAurora="f7:envelope_fill" iconMd="material:email"></Link>
                    <Link tabLink="#tab-appointment" text="Appointment" iconIos="f7:calendar_fill" iconAurora="f7:calendar_fill" iconMd="material:today"></Link>
                    <Link tabLink="#tab-start-sell" text="Start Selling" iconIos="f7:cloud_upload_fill" iconAurora="f7:cloud_upload_fill" iconMd="material:file_upload"></Link>
                    <Link tabLink="#tab-wishlist" text="Wishlist" iconIos="f7:heart_fill" iconAurora="f7:heart_fill" iconMd="material:today"></Link>
                    <Link tabLink="#tab-account" text="Account" iconIos="f7:person_fill" iconAurora="f7:person_fill" iconMd="material:file_upload"></Link>
                </Toolbar>
                <div className="tabs" style={{marginTop: 100}}>
                    <div id="tab-home" className="tab tab-active tab-home">
                        <HomeTab />
                    </div>
                    <div id="tab-appointment" className="tab tab-appointment">
                        <AppointmentTab />
                    </div>
                    <div id="tab-wishlist" className="tab tab-wishlist">
                        <WishlistTab />
                    </div>
                    <div id="tab-account" className="tab tab-account">
                        <AccountTab />
                    </div>
                </div>
            </Page>
        );    
    }
}
 
export default Home;