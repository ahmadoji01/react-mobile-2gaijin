import React, { Component } from 'react';
import axios from 'axios';
import AuthService from "../../../services/auth.service";
import "./ChattingRoom.scss";
import { Block, Col, PhotoBrowser, Preloader, Icon, Page, Messages, Messagebar, MessagebarAttachments, MessagebarSheet, Message, Navbar, Link, MessagebarAttachment, MessagebarSheetImage, MessagesTitle, NavTitle, NavLeft } from 'framework7-react';
import { getCroppedImg, resizeImg } from '../../../services/imageprocessing';
import Moment from 'react-moment';
import ChatRoomNavbar from "../../elements/ChatRoomNavbar";

class ChattingRoom extends Component {

    constructor(props) {
        super(props);
        this.maxWidth = 800;
        this.maxHeight = 600;
        this.state = {
            attachments: [],
            sheetVisible: false,
            typingMessage: null,
            totalMessages: 0,
            totalPhotos: 0,
            messagesData: [],
            ws: null,
            isLoading: false,
            chatLoading: false,
            images: [
                'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
                'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
                'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
                'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
                'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
                'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
            ],
            photos: [],
            chatPic: null,
            chatPicWidth: 0, chatPicHeight: 0,
            maxWidth: 600, maxHeight: 400,
            people: [],
            current_person: {},
            responseInProgress: false,
        }
        this.picInput = React.createRef();

        this.sendMsgWs = this.sendMsgWs.bind(this);
        this.populatePhotos = this.populatePhotos.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileRetrieved = this.onFileRetrieved.bind(this);
        this.openPhotoBrowser = this.openPhotoBrowser.bind(this);
    }

    render() {
        if(!AuthService.getCurrentUser()) {
            return;
        }

        let loading;
        if(this.state.isLoading) {
            loading = <Block style={{ backgroundColor: "#F2F7FF" }} className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        }

        let chatloading;
        if(this.state.chatLoading) {
            loading = <Block style={{ backgroundColor: "#F2F7FF" }} className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        }

        const loadingCSS = {
            height: "70px",
            margin: "200px"
        };

        const loadingTextCSS = { display: this.state.chatLoading ? "block" : "none" }; 
        
        var avatarURL = "images/avatar-placeholder.png";

        var myName = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");
        let personInfo, personName;
        if(typeof(this.state.people) !== "undefined") {
            var i = 0; var people = this.state.people;
            for(i < 0; i < people.length; i++) {
                if(people[i].name != myName) {
                    personName = this.state.people[i].name;
                    if(this.state.people[i].avatar_url != this.state.current_person.avatar_url) {
                        avatarURL = this.state.people[i].avatar_url;
                    }
                }
            }
        }

        let msgPlaceholder = "Type your message...";
        if(this.state.messagesData.length == 0) {
            msgPlaceholder = "Say hi..."
        }

        return (
            <Page>
                <div className="row sticky-container" style={{marginTop: 0, padding: 10}}>
                    <div className="col-5">
                        <Link href="/chatlobby"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </div>
                    <div className="col-30 chat-avatar-container" style={{backgroundImage: `url("${avatarURL}")`, padding: "25px", width: "25px"}}></div>
                    <div className="col-60">
                        <div className="row profile-banner-info" style={{ paddingBottom: 5 }}>
                            <h5 className="seller-name">{personName}</h5>
                        </div>
                    </div>
                    <div className="col-5"></div>
                </div>
        
                <Messagebar
                placeholder={msgPlaceholder}
                ref={(el) => {this.messagebarComponent = el}}
                attachmentsVisible={this.attachmentsVisible}
                sheetVisible={this.state.sheetVisible}
                >
                <input type="file" ref={ this.picInput } className="chat-img-input" onChange={this.onFileChange()} />
                <Link
                    iconIos="f7:camera_fill"
                    iconAurora="f7:camera_fill"
                    iconMd="material:camera_alt"
                    slot="inner-start"
                >
                </Link>
                <Link
                    iconIos="f7:arrow_up_circle_fill"
                    iconAurora="f7:arrow_up_circle_fill"
                    iconMd="material:send"
                    slot="inner-end"
                    onClick={this.sendMessage.bind(this)}
                ></Link>
                <MessagebarAttachments>
                    {this.state.attachments.map((image, index) => (
                    <MessagebarAttachment
                        key={index}
                        image={image}
                        onAttachmentDelete={() => this.deleteAttachment(image)}
                    ></MessagebarAttachment>
                    ))}
                </MessagebarAttachments>
                <MessagebarSheet>
                    {this.state.images.map((image, index) => (
                    <MessagebarSheetImage
                        key={index}
                        image={image}
                        checked={this.state.attachments.indexOf(image) >= 0}
                        onChange={this.handleAttachment.bind(this)}
                    ></MessagebarSheetImage>
                    ))}
                </MessagebarSheet>
                </Messagebar>
                
                <Messages style={{ backgroundColor: "#F2F7FF", paddingTop: "75px" }} scrollMessagesOnEdge ref={(el) => {this.messagesComponent = el}}>
                    {chatloading}
                    {this.state.messagesData.map((message, index) => (
                        <React.Fragment>
                            {this.isTimeShown(message, index)}
                            <Message
                            key={index}
                            type={message.type}
                            image={message.image}
                            name={message.name}
                            onClick={() => this.openPhotoBrowser(message)}
                            avatar={message.avatar_url}
                            first={this.isFirstMessage(message, index)}
                            last={this.isLastMessage(message, index)}
                            tail={this.isTailMessage(message, index)}
                            >
                            {message.message && (
                                <span slot="text" dangerouslySetInnerHTML={{__html: message.message}} />
                            )}
                            </Message>
                        </React.Fragment>
                    ))}
                    {this.state.typingMessage && (
                        <Message
                        type="received"
                        typing={true}
                        first={true}
                        last={true}
                        tail={true}
                        header={`${this.state.typingMessage.name} is typing`}
                        avatar={this.state.typingMessage.avatar_url}
                        ></Message>
                    )}
                </Messages>
                <PhotoBrowser
                    photos={this.state.photos}
                    activeIndex={this.state.totalPhotos}
                    ref={(el) => {this.photoBrowser = el}}
                />
                
                {loading}
            </Page>
        );
    }

    openPhotoBrowser(message) {
        if(message.image != "") {
            var activeIndex = this.state.totalMessages;
            if(typeof(message.photo_index) !== "undefined") {
                activeIndex = message.photo_index;
            }
            this.photoBrowser.open(activeIndex);
        }
    }

    populatePhotos(images) {
        var photos = new Array();
        images = images.map(function(image, i) { 
            var photo = { url: image["img_url"], caption: "" };
            photos.push(photo);
        });
        this.setState({ photos: photos });
    }

    getItems() {
        this.setState({ chatLoading: true });
        const msgsLength = this.state.messagesData.length;
        const totalMsgs = this.state.totalMessages;
        const lastItems = totalMsgs - msgsLength;
        let config = {
                headers: { 'Authorization': localStorage.getItem("access_token"), "Content-Type": "application/json" },
                params: {
                    room: this.props.roomID,
                    start: lastItems - 8,
                    limit: lastItems,
                }
        }
        axios
        .get(`https://go.2gaijin.com/chat_messages`, config)
        .then(res => {
            this.setState({ chatLoading: false });
            if(res.data.status == "Success") {
                this.setState({ messagesData: [...res.data.data.messages, ...this.state.messagesData] });
                this.messagesTop.scrollIntoView({ behavior: "smooth" });
            }
        });  
    }

    onFileChange = () => async e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            await readFile(file).then(
            res => {
                this.setState({
                    chatPic: res
                });
                this.onFileRetrieved();
            });
        }
    }

    onFileRetrieved = async () => {
        if(this.state.chatPic) {
            const img = new Image();

            img.src = this.state.chatPic;

            var imgWidth;
            var imgHeight;
            var resizer = 1.0;
            var maxWidth = this.state.maxWidth;
            var maxHeight = this.state.maxHeight;
            var ws = this.state.ws;

            var roomID = this.props.roomID;
            var userID = localStorage.getItem("user_id");

            var self = this;
            img.onload = async function() {
                imgWidth = img.naturalWidth;
                imgHeight = img.naturalHeight;

                if(imgWidth > maxWidth || imgHeight > maxHeight) {
                    if(imgWidth > imgHeight) {
                        resizer = maxWidth / imgWidth;
                    } else {
                        resizer = maxHeight / imgHeight;
                    }
                }

                self.setState({ isLoading: true });
                var picToUpload = await resizeImg(img.src, imgWidth * resizer, imgHeight * resizer);
                let parts = picToUpload.split(';');
                let imageData = parts[1].split(',')[1];
                var dataToSend = { "user_id": userID, "room_id": roomID, "img_data": imageData };
                let config = { headers: {'Authorization': localStorage.getItem("access_token"), "Content-Type": "application/json" }}
                axios
                .post(`https://go.2gaijin.com/insert_image_message`, dataToSend, config)
                .then(response => {
                    if(response.data.status == "Success") {
                        var roomMsg = response.data.data.room_message;
                        var sendToWs = roomMsg;
                        self.setState({ isLoading: false });

                        var photo = { url: roomMsg.image, caption: "" };
                        self.setState(prevState => ({
                            photos: [...self.state.photos, photo]
                        }));
                        self.setState({ totalPhotos: self.state.totalPhotos + 1 });
                        try {
                            ws.send(JSON.stringify(sendToWs));
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            };
        }
    }
    
    get attachmentsVisible() {
        const self = this;
        return self.state.attachments.length > 0;
    }

    get placeholder() {
        const self = this;
        return self.state.attachments.length > 0 ? 'Add comment or Send' : 'Message';
    }

    componentWillMount() {
        var user = AuthService.getCurrentUser();
        if(user) {
            AuthService.refreshToken().then(
            () => {
                let config = {
                    headers: {'Authorization': localStorage.getItem("access_token") },
                    params: {
                        room: this.props.roomID
                    }
                }
                
                axios
                .get(`https://go.2gaijin.com/chat_users`, config)
                .then(response => {
                    var usersData = response.data.data.users;
                    var usersTmp = [];
                    let currUser;
                    if(usersData) {
                        usersData.map( function(user, index) {  
                            user.name = user.first_name + " " + user.last_name;
                            if(user.avatar_url == "") {
                                user.avatar_url = "images/avatar-placeholder.png";
                            }
                            if(user._id == localStorage.getItem("user_id")) {
                                currUser = user;
                            }
                            usersTmp.push(user);
                        });
                        this.setState({ people: usersTmp }, () => {
                            axios
                            .get(`https://go.2gaijin.com/chat_messages`, config)
                            .then(response => {
                                var msgsData = response.data.data.messages;
                                var msgsTmp = [];
                                var currUserID = localStorage.getItem("user_id");
                                if(msgsData) {
                                    const people = this.state.people;
                                    var photos = new Array();
                                    var self = this;
                                    var photoIndex = 0; 
                                    msgsData.map( function(message, index) {
                                        var person = people.find(person => person._id === message.user_id); 
                                        if(person.avatar_url == "") {
                                            person.avatar_url = "images/avatar-placeholder.png";
                                        }
                                        if(message.user_id != currUserID){
                                            message.type = "received";
                                            //message.name = person.first_name + " " + person.last_name;
                                            //message.avatar_url = person.avatar_url;
                                        } else {
                                            message.type = "sent";
                                        }
                                        if(message.image != "") {
                                            message.photo_index = photoIndex;
                                            var photo = { url: message.image, caption: "" };
                                            photos.push(photo);
                                            photoIndex++;
                                        }
                                        msgsTmp.push(message);
                                    });
                                    this.setState({ totalPhotos: photoIndex });
                                    this.setState({ photos: photos });
                                    this.setState({ messagesData: msgsTmp });
                                    this.setState({ totalMessages: response.data.data.total_messages });
                                }
                            })
                        });
                        this.setState({ current_person: currUser });
                    }
                });
        
                return;
            });
        }
    }

    componentDidMount() {
        this.connect();
        const self = this;
        self.$f7ready(() => {
            self.messagebar = self.messagebarComponent.f7Messagebar;
            self.messages = self.messagesComponent.f7Messages;
        }); 
    }

    isTimeShown(message, index) {
        const self = this;
        const previousMessage = self.state.messagesData[index - 1];

        const calendarStrings = {
            lastDay : '[Yesterday at ] LT',
            sameDay : 'LT',
            nextDay : '[Tomorrow at ] LT',
            lastWeek : '[last] dddd [at] LT',
            nextWeek : 'dddd [at] LT',
            sameElse : 'dddd, L [at] LT'
        };
        if(!previousMessage) return <MessagesTitle><Moment calendar={calendarStrings}>{message.created_at}</Moment></MessagesTitle>;
        
        var d1 = new Date(message.created_at); var d2 = new Date(previousMessage.created_at);
        var diff = d1-d2;
        if (diff > 60e3 * 5) {
            return <MessagesTitle><Moment calendar={calendarStrings}>{message.created_at}</Moment></MessagesTitle>;
        }
        return "";
    }

    isFirstMessage(message, index) {
        const self = this;
        const previousMessage = self.state.messagesData[index - 1];
        if (message.isTitle) return false;
        if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
        return false;
    }

    isLastMessage(message, index) {
        const self = this;
        const nextMessage = self.state.messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
    }

    isTailMessage(message, index) {
        const self = this;
        const nextMessage = self.state.messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
    }

    deleteAttachment(image) {
        const self = this;
        const attachments = self.state.attachments;
        const index = attachments.indexOf(image);
        attachments.splice(index, 1);
        self.setState({ attachments });
    }

    handleAttachment(e) {
        const self = this;
        const attachments = self.state.attachments;
        const index = self.$$(e.target).parents('label.checkbox').index();
        const image = self.state.images[index];
        if (e.target.checked) {
            // Add to attachments
            attachments.unshift(image);
        } else {
            // Remove from attachments
            attachments.splice(attachments.indexOf(image), 1);
        }
        self.setState({ attachments });
    }

    sendMessage() {
        const self = this;
        const text = self.messagebar.getValue().replace(/\n/g, '<br>').trim();
        var messageToSend = {};
        if (text.trim().length) {
            messageToSend = {
                user_id: localStorage.getItem("user_id"),
                room_id: this.props.roomID,
                message: text,
            };
        } else {
            return;
        }

        self.setState({
            // Reset attachments
            attachments: [],
            // Hide sheet
            sheetVisible: false,
        });
        self.messagebar.clear();
        
        let config = { headers: {'Authorization': localStorage.getItem("access_token"), "Content-Type": "application/json" }}
        axios
        .post(`https://go.2gaijin.com/insert_message`, messageToSend, config)
        .then(response => {
            if(response.data.status == "Success") {
                var roomMsg = response.data.data.room_message;      
                self.sendMsgWs(JSON.stringify(roomMsg));
            }
        });
        

        // Focus area
        if (text.length) self.messagebar.focus();

        /*
        // Mock response
        if (self.state.responseInProgress) return;
        self.setState({
            responseInProgress: true,
        })
        setTimeout(() => {
            const answer = self.state.answers[Math.floor(Math.random() * self.state.answers.length)];
            const person = self.state.people[Math.floor(Math.random() * self.state.people.length)];
            self.setState({
            typingMessage: {
                name: person.name,
                avatar: person.avatar,
            },
            });
            setTimeout(() => {
            self.setState({
                messagesData: [...self.state.messagesData, {
                message: answer,
                type: 'received',
                name: person.name,
                avatar: person.avatar,
                }],
                typingMessage: null,
                responseInProgress: false,
            });
            }, 4000);
        }, 1000);*/
    }

    sendMsgWs = (msgToSend) => {
        const ws = this.state.ws;
        try {
            ws.send(msgToSend);
        } catch (error) {
            console.log(error);
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
            //console.log("connected websocket main component");

            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            /*console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );*/

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            var receivedData = JSON.parse(evt.data);
            if(localStorage.getItem("user_id") == receivedData.user_id) {
                receivedData.type = "sent";
                delete receivedData.name;
                delete receivedData.avatar_url;

                var dataToSend = receivedData;
                delete dataToSend.created_at;
            } else {
                receivedData.type = "received";
            }
            var dataToSend = { "_id": receivedData._id };
            let config = { headers: {'Authorization': localStorage.getItem("access_token"), "Content-Type": "application/json" }}
            axios.post(`https://go.2gaijin.com/add_message_reader`, dataToSend, config);
            this.setState(prevState => ({
                messagesData: [...this.state.messagesData, receivedData]
            }));
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
}

function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
}

export default ChattingRoom;