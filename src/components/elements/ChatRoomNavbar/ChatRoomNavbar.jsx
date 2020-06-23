import React, { Component } from "react";

class ChatRoomNavbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="navbar navbar-chat-room">
                <div className="navbar-bg"></div>
                <div className="navbar-inner">
                    <div className="left">
                        <a className="link back">
                        <i className="icon icon-back"></i>
                        <span className="if-not-md">Back</span>
                        </a>
                    </div>
                    <div className="title">Fixed Navbar</div>
                </div>
            </div>
        );
    }
}

export default ChatRoomNavbar;