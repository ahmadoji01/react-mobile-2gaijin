import React, { Component } from "react";
import { connect } from 'react-redux';
import { Icon, Navbar, NavLeft, NavTitle, NavRight, Link, Page, PageContent, Searchbar, Subnavbar, Block, NavTitleLarge } from 'framework7-react';
import './Home.scss';
import HomeTab from "../../tabs/HomeTab";
import AppointmentTab from "../../tabs/AppointmentTab/AppointmentTab";
import AccountTab from "../../tabs/AccountTab/AccountTab";
import AuthService from "../../../services/auth.service";
import WishlistTab from "../../tabs/WishlistTab/WishlistTab";
import Toolbar from "../../elements/Toolbar";

import { Tabs } from 'antd';

const { TabPane } = Tabs;

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshToken: false,
        }
        this.searchClick = this.searchClick.bind(this);
        this.refreshingToken = this.refreshingToken.bind(this);
    }

    componentDidMount() {
        this.props.dispatch({ type: "SetRefresh" });
        if(!this.props.isRefreshing) {
            this.refreshingToken();
            const refreshingToken = setInterval(this.refreshingToken, 720000);
        }
        this.setState({ refreshToken: true });
    }

    refreshingToken() {
        var user = AuthService.getCurrentUser();
        if(user) {
            AuthService.refreshToken();
        }
    }

    searchClick() {
        this.searchInput.disable();
        this.$f7router.navigate('/search_history');
    }

    render() {

        var firstName = "";

        if(localStorage.getItem("first_name")) {
            var res = localStorage.getItem("first_name").split(" ");
            firstName = res[0];
        }

        let title;
        if(firstName != "") {
            title = <p className="nav-title-large">What stuff can we<br/> <b>help you find, {firstName}?</b></p>
        } else {
            title = <p className="nav-title-large">What stuff can we<br/> <b>help you find?</b></p>
        }

        return (
            <Page name="home" className="page page-home page-with-subnavbar hide-navbar-on-scroll">
                <Navbar id="navbar-home" className="home-nav-large">
                    <Subnavbar inner={false}>
                        <Searchbar
                        placeholder="try Fridge, Table"
                        clearButton={true}
                        ref={(input) => { this.searchInput = input; }}
                        onSearchbarEnable={this.searchClick}
                        ></Searchbar>
                    </Subnavbar>
                    <NavLeft style={{marginTop: 15}}>
                        {title}
                    </NavLeft>
                    <NavRight>
                        <Link href="/notification"><Icon color="#8DA2CB" f7="bell_fill" size="24px"></Icon></Link>
                        <Link href="/chatlobby"><Icon color="#8DA2CB" f7="envelope_fill" size="24px"></Icon></Link>
                    </NavRight>
                </Navbar>
                <Toolbar activeTab={1} />
                <HomeTab />
            </Page>
        );    
    }
}

const mapStateToProps = state => ({
    isRefreshing: state.isRefreshing
});

export default connect(mapStateToProps)(Home);