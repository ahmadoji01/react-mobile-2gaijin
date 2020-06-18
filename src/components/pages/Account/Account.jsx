import React, { Fragment, Component } from 'react';
import { Page } from 'framework7-react';
import Toolbar from "../../elements/Toolbar";
import AuthService from '../../../services/auth.service';
import GoldCoin from "../../illustrations/GoldCoin.svg";
import SilverCoin from "../../illustrations/SilverCoin.svg";
import { Button, Popup, Navbar, NavLeft, NavRight, Link, NavTitle, List, ListInput, ListItem, BlockTitle, Col, Preloader, Block, TextEditor } from "framework7-react";
import axios from "axios";

import { getCroppedImg, resizeImg } from '../../../services/imageprocessing';
import Cropper from 'react-easy-crop';

import CollectionIcon from "../../icons/CollectionIcon.svg";
import HelpCenterIcon from "../../icons/HelpCenterIcon.svg";

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            data: [],
            popupOpened: false,
            bioPopupOpened: false,
            avatarURL: "",
            shortBio: "", 
            imageSrc: null,
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 1,
            croppedAreaPixels: null,
            croppedImage: null,
            isCropping: false,
            firstName: "",
            lastName: "",
            phoneNumber: "",
            isProfileUpdated: false,
            isLoading: false,
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
        this.onBirthdayChange = this.onBirthdayChange.bind(this);
        this.showResult = this.showResult.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onSignOutButtonClick = this.onSignOutButtonClick.bind(this);
        this.onUpdateProfileButtonClick = this.onUpdateProfileButtonClick.bind(this);
    }

    handleLogin() {
        var user = AuthService.getCurrentUser();

        if(user) {
            AuthService.logout().then(
            () => {
                this.$f7.view.main.router.navigate("/");
                this.setState({isLoggedIn: false});
            });
        } else {
            this.$f7.view.main.router.navigate("/login");
        }
    }

    onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            await readFile(file).then(
            res => {
                this.setState({
                    imageSrc: res,
                    crop: { x: 0, y: 0 },
                    zoom: 1,
                    isCropping: true,
                    popupOpened: true,
                })
            });
        }
    }

    onEditorChange(e) {
        this.setState({ shortBio: e });
    }

    onCropChange = crop => {
        this.setState({ crop })
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        this.setState({ croppedAreaPixels: croppedAreaPixels });
    }

    onZoomChange = zoom => {
        this.setState({ zoom })
    }

    onFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
    }

    onLastNameChange(e) {
        this.setState({ lastName: e.target.value });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    onPhoneNumberChange(e) {
        this.setState({ phoneNumber: e.target.value });
    }

    onBirthdayChange(e) {
        this.setState({ birthday: e.target.value });
    }

    showResult = async () => {
        const croppedImage = await getCroppedImg(
            this.state.imageSrc,
            this.state.croppedAreaPixels
        )

        this.setState({
            croppedImage,
            isCropping: false,
        });

        var img = await resizeImg(croppedImage, 800, 800);
        let parts = img.split(';');
        let imageData = parts[1].split(',')[1];

        axios.post(`https://go.2gaijin.com/upload_avatar`, {"avatar": imageData}, {
        headers: {
            "Authorization": localStorage.getItem("access_token")
        }
        }).then(response => {
            this.setState({ popupOpened: false });
            if(response.data["status"] == "Success") {
                var jsonData = response.data.data;
                this.setState({ avatarURL: jsonData.avatar_url });
            }
        });
    }

    componentWillMount() {
        var user = AuthService.getCurrentUser();

        if(user) {
            this.setState({isLoggedIn: true});
            axios.post(`https://go.2gaijin.com/profile`, {}, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
            }).then(response => {
                if(response.data["status"] == "Success") {
                    var jsonData = response.data.data;
                    var dob = new Date(jsonData.profile.date_of_birth);
                    
                    var date = (dob.getMonth() + 1) + "/" + dob.getDate() + "/" + dob.getFullYear();
                    this.setState({ data: jsonData });
                    this.setState({ avatarURL: jsonData.profile.avatar_url });
                    this.setState({ firstName: jsonData.profile.first_name });
                    this.setState({ lastName: jsonData.profile.last_name });
                    this.setState({ email: jsonData.profile.email });
                    this.setState({ phoneNumber: jsonData.profile.phone });
                    this.setState({ birthday: date });
                    this.setState({ shortBio: jsonData.profile.short_bio });
                }
            });
        } else {
            this.setState({isLoggedIn: false});
            this.$f7router.navigate("/login");
        }
    }

    componentDidMount() {
        var calendarDateTime = this.$f7.calendar.create({
            inputEl: '#date-time-input',
            timePicker: false
        });
    }
    
    onButtonClick() {
        this.$f7router.navigate("/category-select");
    }

    onUpdateProfileButtonClick() {
        var calendarPicker = document.getElementById("date-time-input");
        var meetingTime = new Date(calendarPicker.value).getTime();

        var payload = {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "phone": this.state.phoneNumber,
            "email": this.state.email,
            "short_bio": this.state.shortBio,
            "date_of_birth": meetingTime
        }
        this.setState({ isLoading: true });
        
        return axios.post(`https://go.2gaijin.com/update_profile`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token"),
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                var dob = new Date(response.data.data.date_of_birth);
                    
                var date = (dob.getMonth() + 1) + "/" + dob.getDate() + "/" + dob.getFullYear();
                this.setState({ isLoading: false });
                this.setState({ isProfileUpdated: true });
                this.setState({ birthday: date })
            } else {
                this.setState({ isLoading: false });
                this.setState({ isProfileUpdated: false });
            }
        });
    }

    onSignOutButtonClick() {
        AuthService.logout().then(() => {
            this.$f7router.navigate("/");
        });
    }

    render() {

        let updateValidation; 
        if(this.state.isProfileUpdated) {
            updateValidation = <p>Profile has been updated</p>;
        }

        let loading;
        if(this.state.isLoading) {
            loading = <Col style={{ width: "100%" }}>
                <Preloader color="orange"></Preloader>
            </Col>;
        }

        let profileName, avatarURL, goldCoins, silverCoins, profileBanner;
        if(this.state.data.profile) {
            avatarURL = this.state.data.profile.avatar_url;
            goldCoins = this.state.data.profile.gold_coin;
            silverCoins = this.state.data.profile.silver_coin;
            profileName = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");

            profileBanner = <div className="profile-container content-shadow">
                <div className="row" style={{marginTop: 10, padding: 10}}>
                    <div className="col-30 seller-img-container" style={{backgroundImage: `url("${this.state.avatarURL}")`}}>
                        <input type="file" className="img-input" onChange={this.onFileChange} />
                    </div>
                    <div className="col-70">
                        <div className="row" style={{marginBottom: 0}}>
                            <h5 className="seller-name">{profileName}</h5>
                        </div>
                        <div className="row trust-coin-container">
                            <img src={GoldCoin} />{goldCoins} Gold(s) 
                            <img src={SilverCoin} />{silverCoins} Silver(s)
                        </div>
                    </div>
                </div>
            </div>;
        }

        return(
            <Page name="account" className="page page-account page-without-navbar" >
                <Toolbar activeTab={3} />
                <Popup className="item-desc-popup" opened={this.state.popupOpened}>
                    <Page>
                        <Navbar>
                            <NavLeft>
                                <Link onClick={() => this.setState({ popupOpened: false })}>Cancel</Link>
                            </NavLeft>
                            <NavTitle>Crop Your Avatar</NavTitle>
                            <NavRight>
                                <Link onClick={this.showResult}>Confirm</Link>
                            </NavRight>
                        </Navbar>
                        <Fragment>
                            <div className="crop-container">
                                <Cropper
                                    image={this.state.imageSrc}
                                    crop={this.state.crop}
                                    zoom={this.state.zoom}
                                    aspect={this.state.aspect}
                                    onCropChange={this.onCropChange}
                                    onCropComplete={this.onCropComplete}
                                    onZoomChange={this.onZoomChange}
                                />
                            </div>
                        </Fragment>
                    </Page>
                </Popup>
                <div className="account-buyer segments" style={{marginBottom: 100}}>
                    <div className="container">
                        {profileBanner}
                        <BlockTitle>Collections</BlockTitle>
                        <List>
                            <div style={{ padding: 10 }}>
                                <Button className="general-btn" style={{color: '#fff'}} onClick={this.onButtonClick} raised fill round>+ Add New Product</Button>
                            </div>
                            <ListItem href="/collections" title="Your Collections" footer="View and manage all collections">
                                <img src={CollectionIcon} slot="media" />
                            </ListItem>
                            <ListItem title="Help Center" footer="Don't know where to start? We can help">
                                <img src={HelpCenterIcon} slot="media" />
                            </ListItem>
                        </List>
                        <BlockTitle>Profile Settings</BlockTitle>
                        <List>
                            <ListInput
                                outline
                                onChange={this.onFirstNameChange}
                                value={this.state.firstName}
                                ref={formName => (this.formName = formName)}
                                label="First Name"
                                type="text"
                                required
                                validate
                                onInputClear={() => this.setState({ firstName: "" })}
                            />
                            <ListInput
                                outline
                                onChange={this.onLastNameChange}
                                value={this.state.lastName}
                                label="Last Name"
                                type="text"
                                onInputClear={() => this.setState({ lastName: "" })}
                            />
                            <ListInput
                                outline
                                onChange={this.onEmailChange}
                                value={this.state.email}
                                label="Email Address"
                                type="email"
                                onInputClear={() => this.setState({ email: "" })}
                            />
                            <ListInput
                                outline
                                onChange={this.onPhoneNumberChange}
                                value={this.state.phoneNumber}
                                label="Phone Number"
                                type="text"
                                onInputClear={() => this.setState({ phoneNumber: "" })}
                            />
                            <li>
                                <div className="item-content item-input item-input-outline">
                                    <div className="item-inner">
                                        <div class="item-title item-label">Birthday</div>
                                        <div className="item-input-wrap">
                                            <input type="text" value={this.state.birthday} placeholder="Select date and time" readOnly id="date-time-input"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <ListInput
                                outline
                                value={this.state.shortBio}
                                label="Short Bio"
                                type="textarea"
                                resizable
                                onFocus={() => this.setState({ bioPopupOpened : true })}
                            />
                            <div style={{ padding: 10 }}>
                                {updateValidation}
                                {loading}
                                <Button className="general-btn" style={{color: '#fff'}} disabled={this.state.isLoading} onClick={this.onUpdateProfileButtonClick} raised fill round>Update Profile Info</Button>
                            </div> 
                        </List>
                        <BlockTitle>Profile Action</BlockTitle>
                        <div style={{ padding: 10 }}>
                            <Button className="general-reject-btn" style={{color: '#fff'}} onClick={this.onSignOutButtonClick} raised fill round>Sign Out</Button>
                        </div>
                    </div>
                    <Popup className="item-desc-popup" opened={this.state.bioPopupOpened} onPopupClosed={() => this.setState({bioPopupOpened : false})}>
                        <Page>
                            <Navbar title="Item's Description">
                            <NavRight>
                                <Link popupClose>Close</Link>
                            </NavRight>
                            </Navbar>
                            <Block>
                                <TextEditor
                                    value={this.state.shortBio}
                                    onTextEditorChange={this.onEditorChange}
                                    placeholder="Describe yourself here"
                                    buttons={[
                                        ['bold', 'italic', 'underline', 'strikeThrough'],
                                        ['orderedList', 'unorderedList']
                                    ]}
                                />
                            </Block>
                        </Page>
                    </Popup>
                </div>
            </Page>
        );
    }
}

function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
}

export default Account;