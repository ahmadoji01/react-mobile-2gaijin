import React, { Component } from "react";
import Sidebar from '../../elements/Sidebar';
import CategorySlider from "../../elements/CategorySlider";
import Toolbar from "../../elements/Toolbar";
import { connect, sendMsg } from "../../../api";
import './ChatRoom.scss';
import { Icon, Link, Navbar, NavLeft, Page, NavTitle } from "framework7-react";

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
        document.getElementById("navbar-home").style.display = "none";
    }

    render() {
        return (
            <Page>
                <Navbar>
                    <NavLeft>
                        <Link href="/" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>
                        Messages
                    </NavTitle>
                </Navbar>
                <div class="list media-list">
                    <ul>
                        <li>
                            <a href="/chat-personal/" class="item-content">
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">Galang Prasetyo</div>
                                        <div class="item-after">17:14</div>
                                    </div>
                                    <div class="item-subtitle">
                                        <div class="item-title-row">
                                            <div class="item-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                                            <div class="item-after"><span class="badge color-orange">3</span></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/chat-personal/" class="item-content">
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">Alan Suryajana</div>
                                        <div class="item-after">Yesterday at 20:00</div>
                                    </div>
                                    <div class="item-subtitle">
                                        <div class="item-title-row">
                                            <div class="item-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                                            <div class="item-after"><span class="badge color-orange">1</span></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/chat-personal/" class="item-content">
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">Test Name</div>
                                        <div class="item-after">1 Mei 18:31</div>
                                    </div>
                                    <div class="item-subtitle">
                                        <div class="item-title-row">
                                            <div class="item-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
                                            <div class="item-after"></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </Page>
        );
    }
}

export default ChatRoom;