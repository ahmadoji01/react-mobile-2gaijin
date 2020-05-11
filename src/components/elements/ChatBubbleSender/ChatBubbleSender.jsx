import React, { Component } from 'react';
import './ChatBubbleSender.scss';
import Moment from 'react-moment';
import parse from 'html-react-parser';

class ChatBubbleSender extends Component {
    
    validateURL(checkURL) {
        var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(checkURL)) {
            return true;
        } 
        return false;
    }
    
    render() {
        if(typeof(this.props.msg) !== 'undefined') {
            if(!this.validateURL(this.props.msg)) {
                return(
                    <div className="message message-sent">
                        <div className="message-content">
                            <div className="message-bubble">
                                <div className="message-text">{parse(this.props.msg.message)}</div>
                                <div className="message-footer"><Moment fromNow ago>{this.props.msg.created_at}</Moment></div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div className="message message-sent">
                        <div className="message-content">
                            <div className="message-bubble">
                                <div className="message-image"><img src="https://cdn.framework7.io/placeholder/cats-200x260-4.jpg" style={{ width: 200, height: 260 }} /></div>
                            </div>
                            <div className="message-footer">2 Mei 18:03</div>
                        </div>
                    </div>
                );
            }
        } else {
            return '';
        }
    }
}

export default ChatBubbleSender;