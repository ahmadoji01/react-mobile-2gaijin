import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navbar, NavLeft, NavTitle, NavRight, Link, Page, PageContent, Searchbar, Subnavbar, Block, NavTitleLarge } from 'framework7-react';
import { Badge } from 'antd';
import './Home.scss';
import HomeTab from "../../tabs/HomeTab";
import AuthService from "../../../services/auth.service";
import Toolbar from "../../elements/Toolbar";
import { ReactComponent as MessageIcon } from "../../icons/MessageIcon.svg";
import { ReactComponent as NotifIcon } from "../../icons/NotificationIcon.svg";

import axios from "axios";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshToken: false,
            notifRead: true,
            messageRead: true,
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
            AuthService.refreshToken().then(
            () => {
                let config = {
                    headers: {'Authorization': localStorage.getItem("access_token") },
                };
        
                axios
                .get(`https://go.2gaijin.com/check_notif_read`, config)
                .then(res => {
                    this.setState({ notifRead: res.data.data.notif_read });
                    this.setState({ messageRead: res.data.data.message_read });
                });  
            });
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

        let notifIcon, messageIcon;
        if(this.state.notifRead) {
            notifIcon = <NotifIcon size="24px" />;
        } else {
            notifIcon = <Badge dot><NotifIcon onClick={ () => this.setState({notifRead: true}) }  size="24px" /></Badge>;
        }

        if(this.state.messageRead) {
            messageIcon = <MessageIcon size="24px" />;
        } else {
            messageIcon = <Badge dot><MessageIcon onClick={ () => this.setState({messageRead: true}) }  size="24px" /></Badge>;
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
                        <Link href="/notification">{notifIcon}</Link>
                        <Link href="/chatlobby">{messageIcon}</Link>
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