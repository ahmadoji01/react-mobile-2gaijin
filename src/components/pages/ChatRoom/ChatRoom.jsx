import React, { Component } from "react";
import Navbar from '../../elements/Navbar';
import Sidebar from '../../elements/Sidebar';
import HomeBanners from "../../elements/HomeBanners";
import CategorySlider from "../../elements/CategorySlider";
import Toolbar from "../../elements/Toolbar";
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import ProductDisplayContainer from "../../elements/ProductDisplayContainer";
import ProductContainerInfinite from "../../elements/ProductContainerInfinite";
import { connect, sendMsg } from "../../../api";
import './ChatRoom.scss';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatHistory: []
        }
    }

    send(event) {
        if(event.keyCode === 13 && event.target.value !== "") {
            sendMsg(event.target.value);
            event.target.value = "";
        }
    }

    componentDidMount() {
        connect((msg) => {
            console.log("New Message")
            this.setState(prevState => ({
            chatHistory: [...this.state.chatHistory, msg]
            }))
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="App">
                <div className="page page-chatroom page-with-subnavbar">
                    <Toolbar />
                    <Navbar />
                    <div className="tabs">
                        <div id="tab-chatroom" className="tab tab-active tab-chatroom">
                            <div className="panel-backdrop"></div>
                            <Sidebar />
                            <CategorySlider />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatRoom;