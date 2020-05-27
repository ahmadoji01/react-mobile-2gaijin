import React, { Component } from "react";
import Form from "react-validation/build/form";
import Toolbar from "../../elements/Toolbar";
import './ChatRoom.scss';
import { Icon, Link, Navbar, NavLeft, Page, NavTitle } from "framework7-react";
import axios from "axios";
import AuthService from "../../../services/auth.service";
import ChatBubbleSender from "../../elements/ChatBubbleSender";
import ChatBubbleReceiver from "../../elements/ChatBubbleReceiver";

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatHistory: [],
            ws: null,
            msg: "",
            data: "",
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
    }

    send(event) {
        if(event.keyCode === 13 && event.target.value !== "") {
            this.sendMessage();
            event.target.value = "";
        }
    }

    timeout = 250; // Initial timeout duration as a class variable

    

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

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            var receivedData = JSON.parse(evt.data);
            let config = { headers: {'Authorization': localStorage.getItem("access_token"), "Content-Type": "application/json" }}
            axios
            .post("/insert_message", receivedData, config)
            .then(response => {
                if(response.data.status == "Success") {
                    this.setState(prevState => ({
                        chatHistory: [...this.state.chatHistory, receivedData]
                    }));
                }
            });
        }

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

    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    componentWillMount() {
        this.connect();
        
        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
            params: {
              room: this.props.roomID
            }
        }          

        return axios
        .get("/chat_messages", config)
        .then(response => {
            if(response.data.data.messages) {
                this.setState({chatHistory: response.data.data.messages})
            }
        });
    }

    onChangeMessage(e) {
        this.setState({
            msg: e.target.value
        });
    }

    handleKeyPress(e) {
        if(e.key === 'Enter'){
            if(this.msginput.value != "") {
                var date = new Date();
                var dataToSend = JSON.stringify({ user_id: localStorage.getItem("user_id"), room_id: this.props.roomID, message: this.state.msg });
                this.setState({data: dataToSend}, () => {
                    this.sendMessage();
                });
                this.msginput.value = "";
                if(e.preventDefault) e.preventDefault();
                return false;
            }
            this.msginput.value = "";
        }
    }

    submitMessage() {
        if(this.msginput.value != "") {
            var date = new Date();
            var dataToSend = JSON.stringify({ user_id: localStorage.getItem("user_id"), room_id: this.props.roomID, message: this.state.msg });
            this.setState({data: dataToSend}, () => {
                this.sendMessage();
            });
            this.msginput.value = "";    
        }
        this.msginput.value = "";
    }

    sendMessage = () =>{
        
        const ws = this.state.ws;

        try {
            ws.send(this.state.data);
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        let items;
        if(typeof(this.state.chatHistory) !== 'undefined') {
            items = this.state.chatHistory;
            items = items.map(function(msg, i) {
                if(msg.user_id == localStorage.getItem("user_id")){
                    return <ChatBubbleSender msg={msg} key={i+1} />
                } else {
                    return <ChatBubbleReceiver msg={msg} key={i+1} />
                }
            });
        }

        return (
            <div className="page page-chat-room">
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
                            <Form className="list"
                                onKeyPress={this.handleKeyPress}
                                >
                                <textarea id="message-input" ref={c => {this.msginput = c;}} onChange={this.onChangeMessage} className="resizable" placeholder="Message"></textarea>
                            </Form>
                        </div><a className="link send-link" href="#" onClick={this.submitMessage}>Send</a>
                    </div>
                </div>
                <div className="page-content">
                    <div className="messages messages-init" ref={c => {this.msglists = c;}}>
                        <div className="messages-title"><b>Sunday, Feb 9,</b> 12:58</div>
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatRoom;