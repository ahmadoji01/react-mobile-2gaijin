import React, { Component } from 'react';
import Moment from 'react-moment';

class ChatLobbyBar extends Component {
    
    render() {
        if(typeof(this.props.item) !== 'undefined') {
            var item = this.props.item;
            return(
                <a href={`/chatroom/${item["_id"]}`} className="item-content">
                    <div className="item-inner">
                        <div className="item-title-row">
                            <div className="item-title">{item.name}</div>
                            <div className="item-after"><Moment fromNow ago>{item.last_active}</Moment></div>
                        </div>
                        <div className="item-subtitle">
                            <div className="item-title-row">
                                <div className="item-subtitle">{item.last_message}</div>
                                <div className="item-after"><span className="badge color-orange">3</span></div>
                            </div>
                        </div>
                    </div>
                </a>
            );
        } else {
            return '';
        }
    }

}

export default ChatLobbyBar;