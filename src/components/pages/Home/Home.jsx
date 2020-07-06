import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navbar, NavLeft, NavTitle, NavRight, Link, Page, PageContent, Searchbar, Subnavbar, Block, NavTitleLarge } from 'framework7-react';
import Badge from '@material-ui/core/Badge';
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
    }

    searchClick() {
        this.searchInput.disable();
        this.$f7router.navigate('/search_history');
    }

    componentDidMount() {
        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
        };
        
        axios
        .get(`https://go.2gaijin.com/check_notif_read`, config)
        .then(res => {
            if(res.data){
                this.setState({ notifRead: res.data.data.notif_read });
                this.setState({ messageRead: res.data.data.message_read });
            }
        });  
    }

    render() {

        let notifLink, chatLink;
        if(!AuthService.getCurrentUser()) {
            notifLink = "/sign-in/notification";
            chatLink = "/sign-in/chatlobby";
        } else {
            notifLink = "/notification";
            chatLink = "/chatlobby";
        }

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
                    <NavLeft>
                        {title}
                    </NavLeft>
                    <NavRight>
                        <Link href={notifLink}>
                            <Badge color="secondary" variant="dot" invisible={this.state.notifRead}><NotifIcon onClick={ () => this.setState({notifRead: true}) }  size="24px" /></Badge>
                        </Link>
                        <Link href={chatLink}>
                            <Badge color="secondary" variant="dot" invisible={this.state.messageRead}><MessageIcon onClick={ () => this.setState({messageRead: true}) }  size="24px" /></Badge>
                        </Link>
                    </NavRight>
                </Navbar>
                <PageContent id="page-content-with-product-card">
                    <Toolbar activeTab={1} />
                    <HomeTab />
                </PageContent>
            </Page>
        );    
    }
}

const mapStateToProps = state => ({
    isRefreshing: state.isRefreshing
});

export default connect(mapStateToProps)(Home);