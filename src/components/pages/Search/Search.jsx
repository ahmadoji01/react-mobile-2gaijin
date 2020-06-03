import React, { Component } from 'react';
import ProductContainerInfinite from '../../elements/ProductContainerInfinite';
import { Page, Navbar, NavLeft, Link, Icon, Subnavbar, Block, Segmented, Button, NavTitle, Searchbar } from 'framework7-react';
import axios from "axios";
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
const { TabPane } = Tabs;

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchterm: this.props.searchTerm,
            loading: false,
            start: 1,
            limit: 8
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
        return axios
        .get(`${process.env.REACT_APP_BASE_URL}/search?q=` + this.state.searchterm + "&start=1&limit=8", {}, {})
        .then(response => {
            var fetchData = response.data.data.items;
            this.setState({data: fetchData});
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

        const loadingCSS = {
            height: "70px",
            margin: "30px"
        };
    
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return(
            <Page name="search" className="page page-search page-with-subnavbar hide-navbar-on-scroll">
                <Navbar id="navbar-search">
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>
                        Search Results
                    </NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                        value={this.state.searchterm}
                        disableButtonText="Cancel"
                        placeholder="Search in items"
                        clearButton={true}
                        onChange={this.SearchBarChange}
                        onSubmit={this.SearchItems}
                        ref={(input) => { this.searchInput = input; }}
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>
                <div className="container">
                    <ProductContainerInfinite items={this.state.data} />
                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                    >
                        <span style={loadingTextCSS}>Loading...</span>
                    </div>
                </div>
            </Page>
        );
    }
}

export default Search;