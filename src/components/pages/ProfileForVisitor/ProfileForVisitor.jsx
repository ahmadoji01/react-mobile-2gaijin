import React, { Component } from "react";
import "./ProfileForVisitor.scss"
import { Page, Button, Link, Icon } from "framework7-react";
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { orange, red, blue } from '@material-ui/core/colors';
import ProductContainerInfinite from '../../elements/ProductContainerInfinite';

import GoldCoin from "../../illustrations/GoldCoin.svg";
import SilverCoin from "../../illustrations/SilverCoin.svg";

import axios from "axios";

const styles = {
    tabs: {
      background: '#fff',
      color: "orange",
    },
    slide: {
      minHeight: 100,
      color: '#fff',
    },
  };
class ProfileForVisitor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            collections: [],
            index: 0
        };
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
        this.handleChat = this.handleChat.bind(this);
    }

    componentWillMount() {
        let config = {
            params: {
              user_id: this.props.userID
            }
        }

        return axios
        .get(`https://go.2gaijin.com/profile_visitor`, config)
        .then(response => {
            this.setState({ userData: response.data.data.user_info });
            this.setState({ collections: response.data.data.collections });
        });
    }

    handleChat() {
        if(!localStorage.getItem("access_token")) {
            return;
        }

        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
            params: {
              receiverid: this.props.userID
            }
        }

        return axios
        .get(`https://go.2gaijin.com/initiate_chat`, config)
        .then(response => {
            if(response.data.status == "Success"){
                this.$f7router.navigate("/chatroom/" + response.data.data.room._id);
            } else {
                console.log(response);
            }
        });
    }

    render() {

        let profileName, goldCoins, silverCoins, profileBanner;
        var avatarURL = "images/avatar-placeholder.png";
        if(this.state.userData) {
            if(this.state.userData.avatar_url != "") {
                avatarURL = this.state.userData.avatar_url;
            }
            
            goldCoins = this.state.userData.gold_coin;
            silverCoins = this.state.userData.silver_coin;
            profileName = this.state.userData.first_name + " " + this.state.userData.last_name;
        }

        var chatBtnDisabled = false;
        if(localStorage.getItem("user_id") == this.state.userData._id) {
            chatBtnDisabled = true;
        }

        return(
            <Page>
                <div className="profile-visitor-container content-shadow">
                    <div className="row" style={{marginTop: 10, padding: 10}}>
                        <div className="col-5">
                            <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                        </div>
                        <div className="col-30 seller-img-container" style={{backgroundImage: `url("${avatarURL}")`}}></div>
                        <div className="col-65">
                            <div className="row profile-banner-info" style={{ paddingBottom: 5 }}>
                                <h5 className="seller-name">{profileName}</h5>
                            </div>
                            <div className="row profile-banner-info" style={{ paddingBottom: 3, marginBottom: 5 }}>
                                <img src={GoldCoin} /><p>{goldCoins} Gold(s)</p> 
                                <img src={SilverCoin} /><p>{silverCoins} Silver(s)</p>
                            </div>
                            <div className="row profile-banner-info" style={{ marginBottom: 5 }}>
                                <div style={{ width: "100%" }}>
                                    <Button href="#" disabled={chatBtnDisabled} onClick={this.handleChat} raised fill className="appointment-button" style={{  width: "75%", fontWeight: 700, color: "white" }}>Chat with Owner</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{margin: 0, padding: 0}} id="page-content-with-product-card">
                        <div className="sticky-div">
                            <Tabs value={this.state.index} variant="fullWidth" onChange={this.handleTabChange} style={styles.tabs}>
                                <Tab label="Collections" />
                                <Tab label="Description" />
                            </Tabs>
                        </div>
                        <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                        <div style={Object.assign({}, styles.slide, styles.slide1)}>
                            <ProductContainerInfinite items={this.state.collections} />
                        </div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>
                            <div className="container" style={{marginTop: 5}}>
                                <h5>Short Bio</h5>
                                <h6>{this.state.userData.short_bio}</h6>
                            </div>
                        </div>
                        </SwipeableViews>
                    </div>
                </div>
            </Page>
        );
    }

    handleTabChange = (event, value) => {
        this.setState({
            index: value
        });
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    observeScroll() {
        console.log(window.pageYOffset);
    }
}

export default ProfileForVisitor;