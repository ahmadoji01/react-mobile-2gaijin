import React, { Component } from 'react';
import ProductContainerInfinite from '../../elements/ProductContainerInfinite';
import { Page, PageContent, Navbar, Preloader, Block, NavTitle } from 'framework7-react';
import axios from "axios";
import Toolbar from "../../elements/Toolbar";
import AppointmentBar from '../../elements/AppointmentBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import AppointmentContainer from '../../elements/AppointmentContainer/AppointmentContainer';
import "./Appointment.scss";
import EmptyPage from "../EmptyPage";
import AuthService from '../../../services/auth.service';

const styles = {
  tabs: {
    background: '#fff',
    color: "orange",
  },
  slide: {
    minHeight: 100,
    color: '#fff',
  },
};

class Appointment extends Component {

    handleChange = (event, value) => {
        this.setState({
            index: value,
        });
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
            pending: [],
            pending2: [],
            finished: [],
            finished2: [],
            accepted: [],
            accepted2: [],
            searchterm: this.props.searchTerm,
            loading: false,
            isLoading1: false,
            isLoading2: false,
            start: 1,
            limit: 8,
            index: 0,
        };
        this.SearchBarChange = this.SearchBarChange.bind(this);
        this.SearchItems = this.SearchItems.bind(this);
        this.loadAppointments = this.loadAppointments.bind(this);
    }

    async SearchItems() {
        const response = await axios
        .get(`https://go.2gaijin.com/search?q=` + this.state.searchterm, {}, {});
        var fetchData = response.data.data.items;
        this.setState({ data: fetchData });
    }

    loadAppointments() {
        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
            params: {
              room: this.props.roomID
            }
        } 
        
        axios
        .get(`https://go.2gaijin.com/get_seller_appointments`, config)
        .then(response => {
            if(response.data.data) {
                var appointmentData = response.data.data.appointments;
                var pending = appointmentData.filter(appointment => appointment.status === "pending");
                var finished = appointmentData.filter(appointment => appointment.status === "finished");
                var accepted = appointmentData.filter(appointment => appointment.status === "accepted");
                this.setState({data: response.data.data.appointments});
                this.setState({ pending: pending });
                this.setState({ finished: finished });
                this.setState({ accepted: accepted });
                this.setState({ isLoading1: false });
            }
        });
        
        axios
        .get(`https://go.2gaijin.com/get_buyer_appointments`, config)
        .then(response => {
            if(response.data.data) {
                var appointmentData = response.data.data.appointments;
                var pending = appointmentData.filter(appointment => appointment.status === "pending");
                var finished = appointmentData.filter(appointment => appointment.status === "finished");
                var accepted = appointmentData.filter(appointment => appointment.status === "accepted");
                this.setState({data2: response.data.data.appointments});
                this.setState({ pending2: pending });
                this.setState({ finished2: finished });
                this.setState({ accepted2: accepted });
                this.setState({ isLoading2: false });
            }
        });
    }

    refreshingToken() {
        var user = AuthService.getCurrentUser();
        if(user) {
            AuthService.refreshToken();
        }
    }

    componentWillMount() {
        var user = AuthService.getCurrentUser();

        if(!user) {
            this.$f7router.navigate("/login/appointment");
            return;
        }

        var self = this;
        this.setState({ isLoading1: true });
        this.setState({ isLoading2: true });
        AuthService.refreshToken().then(() => {
            self.loadAppointments();
        });
    }

    
    componentWillUnmount() {
        clearInterval(this.intervalID);
        this.setState({ data: [],
            data2: [],
            pending: [],
            pending2: [],
            finished: [],
            finished2: [],
            accepted: [],
            accepted2: [] });
    }

    componentDidMount() {
        if(!AuthService.getCurrentUser()) {
            return "";
        }
        this.intervalID = setInterval(this.refreshingToken, 600000);
        
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        
        this.observer = new IntersectionObserver(
        this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    getItems(start, limit) {
        this.setState({ loading: true });
        axios
            .get(
            `https://go.2gaijin.com/search?q=` + this.state.searchterm + "&start=" + start + "&limit=" + limit
            )
            .then(res => {
            this.setState({ data: [...this.state.data, ...res.data.data.items] });
            this.setState({ loading: false });
            });
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const lastItems = this.state.data.length;
            this.getItems(lastItems + 1, lastItems + 8);
            //this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    SearchBarChange(e) {
        this.setState({ searchterm: e.target.value });
    }

    render() {
        if(!AuthService.getCurrentUser()) {
            return "";
        }
        
        const { index } = this.state;
        const loadingCSS = {
            height: "70px",
            margin: "30px"
        };
    
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        let sellerContainer, sellerContainer2, sellerContainer3, buyerContainer, buyerContainer2, buyerContainer3;
        if(this.state.pending.length > 0) {
            sellerContainer = <React.Fragment><h6 className="appointment-title">Pending Your Approval</h6>
            <AppointmentContainer items={this.state.pending} type="seller" /></React.Fragment>;
        }
        if(this.state.accepted.length > 0) {
            sellerContainer2 = <React.Fragment><h6 className="appointment-title">Accepted Appointments</h6>
            <AppointmentContainer items={this.state.accepted} type="seller" /></React.Fragment>;
        } 
        if(this.state.finished.length > 0) {
            sellerContainer3 = <React.Fragment><h6 className="appointment-title">Completed Appointments</h6>
            <AppointmentContainer items={this.state.finished} type="seller" /></React.Fragment>;
        }
        
        if(this.state.accepted2.length > 0) {
            buyerContainer = <React.Fragment><h6 className="appointment-title">Accepted Appointments</h6>
            <AppointmentContainer items={this.state.accepted2} type="buyer" /></React.Fragment>;
        } 
        if(this.state.pending2.length > 0) {
            buyerContainer2 = <React.Fragment><h6 className="appointment-title">Pending Seller's Approval</h6>
            <AppointmentContainer items={this.state.pending2} type="buyer" /></React.Fragment>;
        }
        if(this.state.finished2.length > 0) {
            buyerContainer3 = <React.Fragment><h6 className="appointment-title">Completed Appointments</h6>
            <AppointmentContainer items={this.state.finished2} type="buyer" /></React.Fragment>;
        }

        let loading1; let emptyPage1;
        if(this.state.isLoading1) {
            loading1 = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        } else {
            if(this.state.data.length == 0) {
                emptyPage1 = <EmptyPage title="You have no appointment as seller" explanation="Any orders made by buyers of your item will go here" />
            }
        }

        let loading2; let emptyPage2;
        if(this.state.isLoading2) {
            loading2 = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        } else {
            if(this.state.data2.length == 0) {
                emptyPage2 = <EmptyPage title="You have no appointment as buyer" explanation="Browse items posted by our community and you can make appointment with seller" />
            }
        }

        return(
            <Page name="appointment" className="page page-appointment">
                <Toolbar activeTab={2} />
                <PageContent>
                    <Navbar id="navbar-search">
                        <NavTitle>
                            Transactions
                        </NavTitle>
                    </Navbar>
                    <div className="sticky-div" style={{top: 0}}>
                        <Tabs value={this.state.index} variant="fullWidth" onChange={this.handleChange} style={styles.tabs}>
                            <Tab label="Seller" />
                            <Tab label="Buyer" />
                        </Tabs>
                    </div>
                    <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                        <div style={Object.assign({}, styles.slide, styles.slide1)}>
                            {emptyPage1}
                            {sellerContainer}
                            {sellerContainer2}
                            {sellerContainer3}
                            <div
                            ref={loadingRef => (this.loadingRef = loadingRef)}
                            style={loadingCSS}>
                                {loading1}
                            </div>
                        </div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>
                            {emptyPage2}
                            {buyerContainer}
                            {buyerContainer2}
                            {buyerContainer3}
                            <div
                            ref={loadingRef2 => (this.loadingRef2 = loadingRef2)}
                            style={loadingCSS}>
                                {loading2}
                            </div>
                        </div>
                    </SwipeableViews>
                </PageContent>
            </Page>
        );
    }
}

export default Appointment;