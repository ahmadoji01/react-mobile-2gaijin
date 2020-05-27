import React, { Component } from 'react';
import ChatLobbyBar from '../../elements/ChatLobbyBar';
import './ChatLobby.scss';
import { Icon, Link, Navbar, NavLeft, Page, NavTitle } from "framework7-react";
import axios from "axios";
import AuthService from "../../../services/auth.service";

class ChatLobby extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        var user = AuthService.getCurrentUser();
        
        if(!user) {
            this.$f7router.navigate("/login");
            return;
        }

        var payload = {}
        return axios
        .post("/chat_lobby", payload, { 
            headers: {
                'Authorization': localStorage.getItem("access_token"),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response);
            this.setState({data: response.data.data.chat_lobby});
        });
    }

    render() {
        var items = [];

        if(typeof(this.state.data) !== 'undefined') {
            items = this.state.data;
            items = items.map(function(item, i) {
                return <li key={i+1}><ChatLobbyBar item={item} /></li>
            });
        }

        return (
            <Page>
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>
                        Messages
                    </NavTitle>
                </Navbar>
                <div className="list media-list">
                    <ul>
                        {items}
                    </ul>
                </div>
            </Page>
        );
    }
}

export default ChatLobby;