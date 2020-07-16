import React, { Fragment, Component } from 'react';
import { Page } from 'framework7-react';
import Toolbar from "../../elements/Toolbar";
import AuthService from '../../../services/auth.service';
import GoldCoin from "../../illustrations/GoldCoin.svg";
import SilverCoin from "../../illustrations/SilverCoin.svg";
import { ReactComponent as PeaceOutline } from "../../icons/PeaceOutline.svg";
import { Button, Popup, Navbar, NavLeft, NavRight, Link, NavTitle, List, ListInput, ListItem, BlockTitle, Preloader, Block, TextEditor } from "framework7-react";
import axios from "axios";

import { getCroppedImg, resizeImg } from '../../../services/imageprocessing';
import Cropper from 'react-easy-crop';

import CollectionIcon from "../../icons/CollectionIcon.svg";
import HelpCenterIcon from "../../icons/HelpCenterIcon.svg";
import Error from "../Error";
import LoadingPage from "../LoadingPage";
import SubscriptionPage from "../SubscriptionPage";
import Moment from "react-moment";

import "./Account.scss";

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
            isPaymentUpdated: false,
            isLoading: false,
            isEmailConfirmLoading: false,
            confirmEmailStatus: "",
            isPhoneConfirmLoading: false,
            isSubsPageOpened: false,
            isLoadingPageOpen: false,
            confirmPhoneStatus: "",
            paypal: "",
            wechat: "",
            bankNumber: "",
            bankAccountName: "",
            bankName: "",
            cod: false,
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
        this.proposeEmailConfirmation = this.proposeEmailConfirmation.bind(this);
        this.proposePhoneConfirmation = this.proposePhoneConfirmation.bind(this);
        this.createCalendar = this.createCalendar.bind(this);
        this.loadProfile = this.loadProfile.bind(this);

        this.onUpdatePaymentMethodClick = this.onUpdatePaymentMethodClick.bind(this);
        this.onPayPalChange = this.onPayPalChange.bind(this);
        this.onBankAccountNameChange = this.onBankAccountNameChange.bind(this);
        this.onBankAccountNumberChange = this.onBankAccountNumberChange.bind(this);
        this.onBankNameChange = this.onBankNameChange.bind(this);
        this.onWeChatChange = this.onWeChatChange.bind(this);
        this.onCODChange = this.onCODChange.bind(this); 
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

    onPayPalChange(e) {
        this.setState({ paypal: e.target.value });
    }

    onBankAccountNameChange(e) {
        this.setState({ bankAccountName: e.target.value });
    }

    onBankAccountNumberChange(e) {
        this.setState({ bankNumber: e.target.value });
    }

    onBankNameChange(e) {
        this.setState({ bankName: e.target.value });
    }

    onWeChatChange(e) {
        this.setState({ wechat: e.target.value });
    }

    onCODChange(e) {
        this.setState({ cod: e.target.checked });
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

    refreshingToken() {
        var user = AuthService.getCurrentUser();
        if(user) {
            AuthService.refreshToken();
        }
    }

    loadProfile() {
        axios.post(`https://go.2gaijin.com/get_profile_info`, {}, {
        headers: {
            "Authorization": localStorage.getItem("access_token")
        }
        }).then(response => {
            this.setState({ isLoadingPageOpen: false });
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
                if(dob.getMonth()) {
                    this.setState({ birthday: date }, this.createCalendar);
                } else {
                    this.createCalendar();
                }
                this.setState({ shortBio: jsonData.profile.short_bio });

                this.setState({ paypal: jsonData.payment_method.paypal });
                this.setState({ wechat: jsonData.payment_method.wechat });
                this.setState({ bankNumber: jsonData.payment_method.bank_account_number });
                this.setState({ bankAccountName: jsonData.payment_method.bank_account_name });
                this.setState({ bankName: jsonData.payment_method.bank_name });
                this.setState({ cod: jsonData.payment_method.cod });
            }
        });
    }
      
    componentWillMount() {
        if(!AuthService.getCurrentUser()) {
            this.setState({isLoggedIn: false});
        }

        var self = this;

        this.setState({ isLoadingPageOpen: true });
        AuthService.refreshToken().then(() => {
            self.loadProfile();
        });
    }

    createCalendar() {
        var date = new Date();
        if(typeof(this.state.birthday) !== "undefined") {
            date = new Date(this.state.birthday);
            var calendarDateTime = this.$f7.calendar.create({
                inputEl: '#date-time-input',
                timePicker: false,
                footer: true,
                value: [date]
            });
        } else {
            var calendarDateTime = this.$f7.calendar.create({
                inputEl: '#date-time-input',
                timePicker: false,
                footer: true
            });
        }
    }
    
    onButtonClick() {
        this.$f7router.navigate("/category-select");
    }

    onUpdateProfileButtonClick() {
        var calendarPicker = document.getElementById("date-time-input");
        var birthday = new Date(calendarPicker.value).getTime();

        var payload = {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "phone": this.state.phoneNumber,
            "email": this.state.email,
            "short_bio": this.state.shortBio,
            "date_of_birth": birthday
        }
        this.setState({ isLoading: true });
        
        return axios.post(`https://go.2gaijin.com/update_profile`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token"),
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                var jsonData = response.data.data;
                var dob = new Date(response.data.data.date_of_birth);
                    
                var date = (dob.getMonth() + 1) + "/" + dob.getDate() + "/" + dob.getFullYear();
                localStorage.setItem("first_name", jsonData.first_name);
                localStorage.setItem("last_name", jsonData.last_name);
                localStorage.setItem("email", jsonData.email);
                this.setState({ isLoading: false });
                this.setState({ isProfileUpdated: true });
                this.setState({ birthday: date });
            } else {
                this.setState({ isLoading: false });
                this.setState({ isProfileUpdated: false });
            }
        });
    }

    onUpdatePaymentMethodClick() {
        var payload = {
            "paypal": this.state.paypal,
            "wechat": this.state.wechat,
            "bank_account_number": this.state.bankNumber,
            "bank_account_name": this.state.bankAccountName,
            "bank_name": this.state.bankName,
            "cod": this.state.cod,
        }
        this.setState({ isLoading2: true });
        
        return axios.post(`https://go.2gaijin.com/update_payment_method`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token"),
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response.data.message);
            if(response.data["status"] == "Success") {
                this.setState({ isLoading2: false });
                this.setState({ isPaymentUpdated: true });
            } else {
                this.setState({ isLoading2: false });
                this.setState({ isPaymentUpdated: false });
            }
        });
    }

    redirectToHome() {
        window.location.href = "/";
    }

    onSignOutButtonClick() {
        AuthService.logout().then(() => {
            this.redirectToHome();
        });
    }

    proposeEmailConfirmation() {
        var payload = {
            "email": localStorage.getItem("email"),
            "confirm_source": "mobile_web_app"
        }
        
        this.setState({ isEmailConfirmLoading: true });
        this.setState({ confirmEmailStatus: "" });
        return axios.post(`https://go.2gaijin.com/confirm_identity`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                this.setState({ isEmailConfirmLoading: false });
                this.setState({ confirmEmailStatus: "success" });
            } else {
                this.setState({ isEmailConfirmLoading: false });
                this.setState({ confirmEmailStatus: "error" });
            }
        });
    }

    proposePhoneConfirmation() {
        var payload = {
            "phone": this.state.phoneNumber,
            "confirm_source": "mobile_web_app"
        }
        
        this.setState({ isPhoneConfirmLoading: true });
        this.setState({ confirmPhoneStatus: "" });
        return axios.post(`https://go.2gaijin.com/confirm_identity`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                this.setState({ isPhoneConfirmLoading: false });
                this.setState({ confirmPhoneStatus: "success" });
            } else {
                this.setState({ isPhoneConfirmLoading: false });
                this.setState({ confirmPhoneStatus: "error" });
            }
        });
    }

    componentWillUpdate() {
        if(this.state.isSubsPageOpened) {
            this.setState({ isSubsPageOpened: false });
        }
    }

    render() {

        var loadingPopupOpened = false;
        if(!this.state.data.profile) {
            loadingPopupOpened = true;
        }

        if(!AuthService.getCurrentUser()) {
            return <Error type="unauthorized" />;
        }
        
        let updateValidation; 
        if(this.state.isProfileUpdated) {
            updateValidation = <p>Profile has been updated</p>;
        }

        let loading;
        if(this.state.isLoading) {
            loading = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        }

        let updateValidation2; 
        if(this.state.isPaymentUpdated) {
            updateValidation2 = <p>Payment method has been updated</p>;
        }

        let loading2;
        if(this.state.isLoading2) {
            loading2 = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        }

        let subsExpiry, profileName, avatarURL, subscribeBanner, goldCoins, silverCoins, profileBanner, emailConfirmation, phoneConfirmation, isSubscribed;
        if(this.state.data.profile) {
            avatarURL = this.state.data.profile.avatar_url;
            goldCoins = this.state.data.profile.gold_coin;
            silverCoins = this.state.data.profile.silver_coin;
            profileName = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");
            isSubscribed = this.state.data.profile.is_subscribed;

            profileBanner = <div className="profile-container content-shadow" style={{ marginTop: -25 }}>
                <div className="row" style={{marginTop: 10, padding: 20}}>
                    <div className="col-30 seller-img-container" style={{backgroundImage: `url("${this.state.avatarURL}")`}}>
                        <input type="file" className="img-input" onChange={this.onFileChange} />
                    </div>
                    <div className="col-70">
                        <div className="row" style={{marginBottom: 0, paddingBottom: 0 }}>
                            <h5 className="seller-name">{profileName}</h5>
                        </div>
                        <div className="row trust-coin-container" style={{ marginBottom: 10, paddingBottom: 0 }}>
                            <img src={GoldCoin} /><b>{goldCoins} Gold(s)</b> 
                            <img src={SilverCoin} /><b>{silverCoins} Silver(s)</b>
                        </div>
                        <div className="row profile-banner-info" style={{ marginBottom: 5, paddingBottom: 10 }}>
                            <div style={{ width: "100%" }}>
                                <Button href={`/profile/${this.state.data.profile._id}`} raised fill className="sold-out-button" style={{  width: "100%", fontWeight: 700, color: "black" }}>Preview My Profile</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;

            let okOrPreloadEmail;
            if(this.state.isEmailConfirmLoading) {
                okOrPreloadEmail = <Preloader color="orange"></Preloader>;
            } else {
                okOrPreloadEmail = <h6 style={{color: "#EF7132"}}>OK</h6>;
            }
            let confirmEmailStatus;
            if(this.state.confirmEmailStatus == "success") {
                confirmEmailStatus = <h6 style={{color: "#EF7132"}}>Confirmation sent to your email!</h6>
            } else if(this.state.confirmEmailStatus == "error") {
                confirmEmailStatus = <h6 style={{color: "#EF7132"}}>Something went wrong. Try again</h6>
            }

            let okOrPreloadPhone;
            if(this.state.isPhoneConfirmLoading) {
                okOrPreloadPhone = <Preloader color="orange"></Preloader>;
            } else {
                okOrPreloadPhone = <h6 style={{color: "#EF7132"}}>OK</h6>;
            }
            let confirmPhoneStatus;
            if(this.state.confirmPhoneStatus == "success") {
                confirmPhoneStatus = <h6 style={{color: "#EF7132"}}>Confirmation sent to your phone!</h6>
            } else if(this.state.confirmPhoneStatus == "error") {
                confirmPhoneStatus = <h6 style={{color: "#EF7132"}}>Something went wrong. Try again</h6>
            }

            if(!this.state.data.profile.email_confirmed) {
                emailConfirmation = <div onClick={this.proposeEmailConfirmation} style={{ marginTop: 20, marginBottom: 0, padding: 15, borderRadius: 8, backgroundColor: "#EF713235", color: "#EF7132" }}>
                    <div className="row" style={{ paddingTop: 0, marginBottom: 0, paddingBottom: 0 }}>
                        <div className="col-85">
                            <h6 style={{color: "#EF7132"}}>To start selling, confirm your email</h6>
                        </div>
                        <div className="col-15">
                            {okOrPreloadEmail}
                        </div>
                        {confirmEmailStatus}
                    </div>
                </div>;
            }

            if(!this.state.data.profile.phone_confirmed) {
                phoneConfirmation = <div onClick={this.proposePhoneConfirmation} style={{ marginTop: 20, marginBottom: 0, padding: 15, borderRadius: 8, backgroundColor: "#EF713235", color: "#EF7132" }}>
                    <div className="row" style={{ paddingTop: 0, marginBottom: 0, paddingBottom: 0 }}>
                        <div className="col-85">
                            <h6 style={{color: "#EF7132"}}>Confirm your phone</h6>
                        </div>
                        <div className="col-15">
                            {okOrPreloadPhone}
                        </div>
                        {confirmPhoneStatus}
                    </div>
                </div>
            }

            if(!isSubscribed) {
                subscribeBanner = <><div onClick={ () => this.setState({ isSubsPageOpened: true }) } style={{ marginTop: 20, marginBottom: 0, padding: 15, borderRadius: 8, backgroundColor: "#EF7132", color: "#EF7132" }}>
                    <div className="row" style={{ paddingTop: 0, marginBottom: 0, paddingBottom: 0 }}>
                        <div className="col-20">
                            <div className="start-selling-btn-banner">
                                <PeaceOutline className="start-selling-icon" />
                            </div>
                        </div>
                        <div className="col-80" style={{ marginTop: 10 }}>
                            <h6 style={{color: "#FFFFFF"}}>Become 2Gaijin Member</h6>
                            <h6 style={{color: "#FFFFFF", opacity: 0.6}}>and start selling your items today</h6>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ paddingTop: 0, marginBottom: 0, paddingBottom: 0 }}>
                    <div className="col-100">
                        <p style={{ fontSize: 10 }}>* Your items still present even after your subscription has ended</p>
                    </div>
                </div>
                </>
            } else {
                subsExpiry = this.state.data.profile.subs_expiry_date;
                subscribeBanner = <div className="row" style={{ paddingBottom: 0, marginBottom: 0 }}>
                    <div className="col-100">
                        <Button className="general-btn" style={{color: '#fff'}} onClick={this.onButtonClick} raised fill round>+ Add New Product</Button>
                    </div>
                    <div className="col-100">
                        <p style={{ fontSize: 14 }}>Subscribed until <Moment format="YYYY-MM-DD">{subsExpiry}</Moment></p>
                    </div>
                </div>
            }
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
                    {profileBanner}
                    <div className="container">
                        {emailConfirmation}
                        {phoneConfirmation}
                        <BlockTitle>Collections</BlockTitle>
                        <List>
                            {subscribeBanner}
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
                                            <input type="text" value={this.state.birthday} onChange={this.onBirthdayChange} placeholder="Select your date of birth" readOnly id="date-time-input"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <ListInput
                                outline
                                label="Short Bio"
                                type="textarea"
                                placeholder="Describe yourself here >"
                                resizable
                                onFocus={() => this.setState({ bioPopupOpened : true })}
                            />
                            <div style={{ padding: 10 }}>
                                {updateValidation}
                                {loading}
                                <Button className="general-btn" style={{color: '#fff'}} disabled={this.state.isLoading} onClick={this.onUpdateProfileButtonClick} raised fill round>Update Profile Info</Button>
                            </div> 
                        </List>
                        <BlockTitle>Available Payment Method</BlockTitle>
                        <List>
                            <ListInput
                                outline
                                onChange={this.onPayPalChange}
                                value={this.state.paypal}
                                ref={formName => (this.formName = formName)}
                                label="PayPal"
                                type="text"
                                placeholder="Enter your PayPal Account Link"
                                required
                                validate
                            />
                            <ListInput
                                outline
                                onChange={this.onWeChatChange}
                                value={this.state.wechat}
                                ref={formName => (this.formName = formName)}
                                label="WeChat"
                                type="text"
                                placeholder="Enter your WeChat Account ID"
                                required
                                validate
                            />
                            <ListInput
                                outline
                                onChange={this.onBankAccountNumberChange}
                                value={this.state.bankNumber}
                                placeholder="Enter your Account Number"
                                label="Bank Account Number"
                                type="email"
                            />
                            <ListInput
                                outline
                                onChange={this.onBankAccountNameChange}
                                value={this.state.bankAccountName}
                                placeholder="Enter your Bank Account Name"
                                label="Bank Account Holder's Name"
                                type="text"
                            />
                            <ListInput
                                outline
                                onChange={this.onBankNameChange}
                                value={this.state.bankName}
                                placeholder="Enter the Bank Name You are Registered"
                                label="Bank Name"
                                type="text"
                            />
                            <ListItem checkbox title="Accept Cash on Delivery" onChange={this.onCODChange} checked={this.state.cod}></ListItem>
                            <div style={{ padding: 10 }}>
                                {updateValidation2}
                                {loading2}
                                <Button className="general-btn" style={{color: '#fff'}} disabled={this.state.isLoading2} onClick={this.onUpdatePaymentMethodClick} raised fill round>Update Payment Method</Button>
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
                    <Popup className="item-desc-popup" opened={this.state.isLoadingPageOpen}>
                        <LoadingPage />
                    </Popup>
                    <Popup className="item-desc-popup" opened={this.state.isSubsPageOpened}>
                        <Navbar>
                            <NavRight>
                                <Link popupClose onClick={ () => this.setState({ isSubsPageOpened: false }) }>X</Link>
                            </NavRight>
                        </Navbar>
                        <SubscriptionPage />
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