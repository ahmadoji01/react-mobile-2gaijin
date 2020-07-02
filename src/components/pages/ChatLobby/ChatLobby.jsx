import React, { Component } from 'react';
import ChatLobbyBar from '../../elements/ChatLobbyBar';
import './ChatLobby.scss';
import { Block, Preloader, Icon, Link, Navbar, NavLeft, Page, NavTitle } from "framework7-react";
import axios from "axios";
import AuthService from "../../../services/auth.service";
import EmptyPage from "../EmptyPage";

class ChatLobby extends Component {

    state = {
        data: [],
        isLoading: false
    }

    componentDidMount() {
        var payload = {}

        this.setState({ isLoading: true });
        return axios
        .post(`https://go.2gaijin.com/chat_lobby`, payload, { 
            headers: {
                'Authorization': localStorage.getItem("access_token"),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            this.setState({ isLoading: false });
            if(response.data.data){
                this.setState({data: response.data.data.chat_lobby});
            }
        });
    }

    render() {
        if(!AuthService.getCurrentUser()) {
            return;
        }

        var items = [];

        if(typeof(this.state.data) !== 'undefined') {
            items = this.state.data;
            items = items.map(function(item, i) {
                return <li key={i+1}><ChatLobbyBar item={item} /></li>
            });
        }

        let loading; let emptyPage;
        if(this.state.isLoading) {
            loading = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        } else {
            if(this.state.data.length == 0) {
                emptyPage = <EmptyPage title="You have no message" explanation="Any interactions with members of our community will go here" />
            }
        }

        return (
            <Page name="chat-lobby" className="page-chat-lobby">
                <Navbar>
                    <NavLeft>
                        <Link href="/"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>
                        Messages
                    </NavTitle>
                </Navbar>
                {loading}
                {emptyPage}
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