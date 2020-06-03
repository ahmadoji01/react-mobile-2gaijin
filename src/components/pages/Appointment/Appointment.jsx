import React, { Component } from 'react';
import ProductContainerInfinite from '../../elements/ProductContainerInfinite';
import { Page, Navbar, NavLeft, Link, Icon, Subnavbar, Block, Segmented, Button, NavTitle, Searchbar } from 'framework7-react';
import axios from "axios";
import Toolbar from "../../elements/Toolbar";
import AppointmentBar from '../../elements/AppointmentBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import AppointmentContainer from '../../elements/AppointmentContainer/AppointmentContainer';
import { blue } from '@material-ui/core/colors';

const styles = {
  tabs: {
    background: '#fff',
    color: blue,
  },
  slide: {
    padding: 15,
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
            searchterm: this.props.searchTerm,
            loading: false,
            start: 1,
            limit: 8,
            index: 0,
        };
        this.SearchBarChange = this.SearchBarChange.bind(this);
        this.SearchItems = this.SearchItems.bind(this);
    }

    async SearchItems() {
        const response = await axios
        .get(`${process.env.REACT_APP_BASE_URL}/search?q=` + this.state.searchterm, {}, {});
        var fetchData = response.data.data.items;
        this.setState({ data: fetchData });
    }

    componentWillMount() {
        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
            params: {
              room: this.props.roomID
            }
        }          

        axios
        .get(`${process.env.REACT_APP_BASE_URL}/get_seller_appointments`, config)
        .then(response => {
            if(response.data.data) {
                this.setState({data: response.data.data.appointments})
            }
        });

        axios
        .get(`${process.env.REACT_APP_BASE_URL}/get_buyer_appointments`, config)
        .then(response => {
            if(response.data.data) {
                this.setState({data2: response.data.data.appointments})
            }
        });
    }

    componentDidMount() {
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
            `${process.env.REACT_APP_BASE_URL}/search?q=` + this.state.searchterm + "&start=" + start + "&limit=" + limit
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

        const { index } = this.state;
        const loadingCSS = {
            height: "70px",
            margin: "30px"
        };
    
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return(
            <Page name="appointment" className="page page-appointment hide-navbar-on-scroll">
                <Navbar id="navbar-search">
                    <NavLeft>
                        <Link href="#" className="link back" animate={false}><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>
                        Appointments
                    </NavTitle>
                </Navbar>
                <Toolbar activeTab={2} />
                <Tabs value={this.state.index} variant="fullWidth" onChange={this.handleChange} style={styles.tabs}>
                    <Tab label="Seller" />
                    <Tab label="Buyer" />
                </Tabs>
                <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                    <div style={Object.assign({}, styles.slide, styles.slide1)}>
                        <AppointmentContainer items={this.state.data} />
                        <div
                        ref={loadingRef => (this.loadingRef = loadingRef)}
                        style={loadingCSS}>
                            <span style={loadingTextCSS}>Loading...</span>
                        </div>
                    </div>
                    <div style={Object.assign({}, styles.slide, styles.slide2)}>
                        <AppointmentContainer items={this.state.data2} />
                        <div
                        ref={loadingRef2 => (this.loadingRef2 = loadingRef2)}
                        style={loadingCSS}>
                            <span style={loadingTextCSS}>Loading...</span>
                        </div>
                    </div>
                </SwipeableViews>
            </Page>
        );
    }
}

export default Appointment;