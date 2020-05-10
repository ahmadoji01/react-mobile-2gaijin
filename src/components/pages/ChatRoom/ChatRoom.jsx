import React, { Component } from "react";
import Toolbar from "../../elements/Toolbar";
import './ChatRoom.scss';
import { Icon, Link, Navbar, NavLeft, Page, NavTitle } from "framework7-react";

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatHistory: [],
            ws: null,
            msg: "",
        }
    }

    send(event) {
        if(event.keyCode === 13 && event.target.value !== "") {
            this.sendMessage();
            event.target.value = "";
        }
    }

    timeout = 250; // Initial timeout duration as a class variable

    sendMessage = () =>{
        const {websocket} = this.props // websocket instance passed as props to the child component.

        try {
            websocket.send(this.state.msg) //send data to the server
        } catch (error) {
            console.log(error) // catch error
        }
    }

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    connect = () => {
        var ws = new WebSocket("wss://go.2gaijin.com/ws?room=" + this.props.roomID);
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    componentDidMount() {
        this.connect();
        document.getElementById("navbar-home").style.display = "none";
    }

    render() {
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
                <div className="toolbar messagebar">
                    <div className="toolbar-inner">
                        <div className="messagebar-area">
                            <textarea className="resizable" placeholder="Message"></textarea>
                        </div><a className="link send-link" href="#">Send</a>
                    </div>
                </div>
                <div className="messages messages-init">
                    <div className="messages-title"><b>Sunday, Feb 9,</b> 12:58</div>
                    <div className="message message-sent">
                        <div className="message-content">
                            <div className="message-bubble">
                                <div className="message-text">Hi, Kate</div>
                                <div className="message-footer">2 Mei 17:35</div>
                            </div>
                        </div>
                    </div>
                    <div className="message message-sent">
                        <div className="message-content">
                            <div className="message-bubble">
                                <div className="message-text">How are you?</div>
                            </div>
                            <div className="message-footer">2 Mei 17:38</div>
                        </div>
                    </div>
                    <div className="message message-received">
                        <div className="message-avatar" style={{backgroundImage: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg" }}></div>
                        <div className="message-content">
                            <div className="message-name">Kate</div>
                            <div className="message-bubble">
                                <div className="message-text">Hi, I am good!</div>
                            </div>
                            <div className="message-footer">2 Mei 18:00</div>
                        </div>
                    </div>
                    <div className="message message-sent">
                        <div className="message-content">
                            <div className="message-bubble">
                                <div className="message-text">Hey, look, cutest kitten ever!</div>
                            </div>
                        </div>
                    </div>
                    <div className="message message-sent">
                        <div className="message-content">
                            <div className="message-bubble">
                                <div className="message-image"><img src="https://cdn.framework7.io/placeholder/cats-200x260-4.jpg" style={{ width: 200, height: 260 }} /></div>
                            </div>
                            <div className="message-footer">2 Mei 18:03</div>
                        </div>
                    </div>
                    <div className="message message-received">
                        <div className="message-avatar" style={{backgroundImage: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg" }}></div>
                        <div className="message-content">
                            <div className="message-name">Kate</div>
                            <div className="message-bubble">
                                <div className="message-text">Nice!</div>
                            </div>
                            <div className="message-footer">2 Mei 18:05</div>
                        </div>
                    </div>
                    <div className="message message-received">
                        <div className="message-avatar" style={{backgroundImage: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg" }}></div>
                        <div className="message-content">
                            <div className="message-name">Kate</div>
                            <div className="message-bubble">
                                <div className="message-text">Like it very much!</div>
                            </div>
                            <div className="message-footer">2 Mei 18:08</div>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default ChatRoom;