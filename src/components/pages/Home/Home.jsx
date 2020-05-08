import React, { Component } from "react";
//import Navbar from '../../elements/Navbar';
//import Toolbar from "../../elements/Toolbar";
import { Navbar, Toolbar, NavLeft, NavTitle, NavRight, Link, Page, PageContent, Searchbar, Subnavbar, Block } from 'framework7-react';
import './Home.scss';
import HomeTab from "../../tabs/HomeTab";
import AppointmentTab from "../../tabs/AppointmentTab/AppointmentTab";
import AuthService from "../../../services/auth.service";
import WishlistTab from "../../tabs/WishlistTab/WishlistTab";
import Cookies from 'js-cookie';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        document.getElementById("navbar-home").style.display = "block";
    }

    render() {
        return (
            <Page name="home" className="page page-home page-with-subnavbar">
                <Navbar id="navbar-home" transparent>
                    <a href="#" className="panel-open" data-panel="left">
                        <i id="bar-icon" className="fas fa-bars"></i>
                    </a>
                    <Searchbar searchContainer=".search-list" placeholder="What are you looking for?" searchIn=".item-title" disableButton={!this.$theme.aurora}></Searchbar>
                    <NavRight>
                        <Link icon="icon-bars" panelOpen="right"></Link>
                    </NavRight>
                </Navbar>
                <Toolbar tabbar labels position='bottom'>
                    <Link tabLink="#tab-home" tabLinkActive text="Home" iconIos="f7:envelope_fill" iconAurora="f7:envelope_fill" iconMd="material:email"></Link>
                    <Link tabLink="#tab-appointment" text="Appointment" iconIos="f7:calendar_fill" iconAurora="f7:calendar_fill" iconMd="material:today"></Link>
                    <Link tabLink="#tab-start-sell" text="Start Selling" iconIos="f7:cloud_upload_fill" iconAurora="f7:cloud_upload_fill" iconMd="material:file_upload"></Link>
                    <Link tabLink="#tab-wishlist" text="Wishlist" iconIos="f7:calendar_fill" iconAurora="f7:calendar_fill" iconMd="material:today"></Link>
                    <Link tabLink="#tab-account" text="Account" iconIos="f7:cloud_upload_fill" iconAurora="f7:cloud_upload_fill" iconMd="material:file_upload"></Link>
                </Toolbar>
                <div className="tabs">
                    <div id="tab-home" className="tab tab-active tab-home">
                        <HomeTab />
                    </div>
                    <div id="tab-appointment" className="tab tab-appointment">
                        <AppointmentTab />
                    </div>
                    <div id="tab-wishlist" className="tab tab-wishlist">
                        <WishlistTab />
                    </div>
                </div>
            </Page>
        );    
    }
}
 
export default Home;