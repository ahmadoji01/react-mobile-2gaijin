import React, { Component } from 'react';
import Moment from 'react-moment';

class ChatLobbyBar extends Component {
    
    render() {
        if(typeof(this.props.item) !== 'undefined') {
            var item = this.props.item;
            var iconURL = item.icon_url;
            if(iconURL == "") {
                iconURL = "images/avatar-placeholder.png";
            }

            let newMsgBadge;
            if(!item.is_read) {
                newMsgBadge = <div className="item-after"><span className="badge color-orange"></span></div>
            }

            return(
                <a href={`/chatroom/${item["_id"]}`} className="item-content">
                    <div className="item-inner">
                        <div className="row" style={{paddingBottom: 0, marginBottom: 0}}>
                            <div className="col-15 notif-img-container" style={{backgroundImage: `url("${iconURL}")`, width: '10%'}}></div>       
                            <div className="col-85">
                                <div className="item-title-row">
                                    <div className="item-title">{item.name}</div>
                                    <div className="item-after"><Moment fromNow ago>{item.last_active}</Moment></div>
                                </div>
                                <div className="item-subtitle">
                                    <div className="item-title-row">
                                        <div className="item-subtitle">{item.last_message}</div>
                                        {newMsgBadge}
                                    </div>
                                </div>
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