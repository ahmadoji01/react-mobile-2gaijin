import React, { Component } from 'react';
import ProductContainerInfinite from '../../elements/ProductContainerInfinite';
import { BlockTitle, Range, Page, Navbar, NavLeft, Link, List, ListItem, Icon, Subnavbar, Fab, Block, Popup, NavTitle, NavRight, Searchbar } from 'framework7-react';
import axios from "axios";
import 'antd/dist/antd.css';
import "./Search.scss";
import { ReactComponent as FilterIcon } from "../../icons/FilterIcon.svg";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchterm: this.props.searchTerm,
            loading: false,
            start: 1,
            limit: 8,
            category: "",
            sortby: "relevance",
            status: "",
            priceMin: 0,
            priceMax: 75000,
            popupOpened: false,
            totalItems: 0,
            searchTitle: this.props.searchTerm,
        };
        this.SearchBarChange = this.SearchBarChange.bind(this);
        this.SearchItems = this.SearchItems.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.changeSearchFilter = this.changeSearchFilter.bind(this);
    }

    async SearchItems() {
        const response = await axios
        .get(`https://go.2gaijin.com/search?q=` + this.state.searchterm, {}, {});
        var fetchData = response.data.data.items;
        this.setState({ data: fetchData });
        this.setState({totalItems: response.data.data.total_items});
        this.setState({searchTitle: this.state.searchterm});
    }

    componentWillMount() {
        var searchTerm = this.state.searchterm;
        if(searchTerm == " ") {
            searchTerm = "";
        }
        this.setState({ searchterm: searchTerm });

        var categorySearch = "";
        if(typeof(this.props.category) !== "undefined") {
            categorySearch = this.props.category;
        }
        this.setState({ category: categorySearch });

        var status = "";
        if(typeof(this.props.category) !== "undefined") {
            status = "available";
        }
        this.setState({ status: status });

        return axios
        .get(`https://go.2gaijin.com/search?q=` + 
        searchTerm +
        "&category=" + categorySearch +
        "&status=" + status + 
        "&start=1&limit=8", {}, {})
        .then(response => {
            var fetchData = response.data.data.items;
            this.setState({data: fetchData});
            this.setState({totalItems: response.data.data.total_items});
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
        
        var pricemax = 99999999999;
        if(this.state.priceMax < 50000) {
            pricemax = this.state.priceMax;
        }
        axios
            .get(
            `https://go.2gaijin.com/search?q=` + this.state.searchterm 
            + "&start=" + start 
            + "&limit=" + limit
            + "&status=" + this.state.status 
            + "&sortby=" + this.state.sortby
            + "&category=" + this.state.category
            + "&pricemin=" + this.state.priceMin
            + "&pricemax=" + pricemax
            )
            .then(res => {
                this.setState({ data: [...this.state.data, ...res.data.data.items] });
                this.setState({ loading: false });
                this.setState({totalItems: res.data.data.total_items});
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

    onCategoryChange(e) {
        this.setState({ category: e.target.value });
    }

    onSortChange(e) {
        this.setState({ sortby: e.target.value });
    }

    onPriceChange(values) {
        this.setState({
            priceMin: values[0],
            priceMax: values[1],
        });
    }

    onStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    SearchBarChange(e) {
        this.setState({ searchterm: e.target.value });
    }

    changeSearchFilter() {
        var pricemax = 99999999999;
        if(this.state.priceMax < 50000) {
            pricemax = this.state.priceMax;
        }
        
        return axios
        .get(`https://go.2gaijin.com/search?q=` + 
        this.state.searchterm + 
        "&start=1&limit=8"
        + "&status=" + this.state.status 
        + "&sortby=" + this.state.sortby
        + "&category=" + this.state.category
        + "&pricemin=" + this.state.priceMin
        + "&pricemax=" + pricemax, {}, {})
        .then(response => {
            var fetchData = response.data.data.items;
            this.setState({data: fetchData});
            this.setState({popupOpened: false});
            this.setState({totalItems: response.data.data.total_items});
        });
    }

    render() {

        const loadingCSS = {
            height: "70px",
            margin: "30px"
        };
    
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        let stringPriceMax = "¥" + this.state.priceMax;
        if(this.state.priceMax >= 50000) {
            stringPriceMax = "No Limit";
        }

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
                    <h4 style={{marginTop: 10, marginBottom: 0}}>Showing results of <b>"{this.state.searchTitle}"</b> - <b>{this.state.totalItems} item(s)</b></h4>
                    <ProductContainerInfinite items={this.state.data} />
                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                    >
                        <span style={loadingTextCSS}>Loading...</span>
                    </div>
                </div>
                <Fab position="center-bottom" onClick={() => this.setState({popupOpened: true})} className="fab-filter" slot="fixed" text="Filter" color="orange">
                    <FilterIcon style={{ marginLeft: 20 }}/>
                </Fab>

                <Popup className="demo-popup" opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})}>
                    <Page>
                        <Navbar title="Filter Your Search">
                        <NavRight>
                            <Link popupClose>Cancel</Link>
                        </NavRight>
                        </Navbar>
                        <Block>
                            <BlockTitle className="display-flex block-title-text justify-content-space-between">Price Filter 
                                <span>¥{this.state.priceMin} - {stringPriceMax}</span>
                            </BlockTitle>
                            <Range
                                min={0}
                                max={50000}
                                step={100}
                                value={[this.state.priceMin, this.state.priceMax]}
                                label={true}
                                dual={true}
                                color="green"
                                onRangeChange={this.onPriceChange.bind(this)}
                            ></Range>
                            <h4 style={{marginTop: 10}}>Sort By</h4>
                            <List>
                                <ListItem
                                    title="Selected Sort Mode"
                                    smartSelect
                                    smartSelectParams={{openIn: 'sheet'}}
                                >
                                    <select onChange={this.onSortChange.bind(this)} name="sort-mode" defaultValue="relevance">
                                        <option value="relevance">Relevance</option>
                                        <option value="highestprice">Price: Highest to Lowest</option>
                                        <option value="lowestprice">Price: Lowest to Highest</option>
                                        <option value="newest">Date Posted: Newest to Oldest</option>
                                        <option value="oldest">Date Posted: Oldest to Newest</option>
                                    </select>
                                </ListItem>
                            </List>
                            <h4 style={{marginTop: 10}}>Category</h4>
                            <List>
                                <ListItem
                                    title="Selected Category"
                                    smartSelect
                                    smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search category'}}
                                >
                                    <select onChange={this.onCategoryChange.bind(this)} name="category" defaultValue={this.state.category}>
                                        <option value="">Any</option>
                                        <option value="Apparels">Apparels</option>
                                        <option value="Books">Books</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Footwear">Footwear</option>
                                        <option value="Furnitures">Furnitures</option>
                                        <option value="Kitchens">Kitchens</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Vehicles">Vehicles</option>
                                        <option value="White Appliances">White Appliances</option>
                                        <option value="Miscellaneous">Miscellaneous</option>
                                    </select>
                                </ListItem>
                            </List>
                            <h4 style={{marginTop: 10}}>Item's Status</h4>
                            <List>
                                <ListItem
                                    title="Selected Status"
                                    smartSelect
                                    smartSelectParams={{openIn: 'sheet'}}
                                >
                                    <select onChange={this.onStatusChange.bind(this)} name="sort-mode" defaultValue={this.state.status}>
                                        <option value="">Any</option>
                                        <option value="available">Available</option>
                                        <option value="sold">Sold Out</option>
                                    </select>
                                </ListItem>
                            </List>
                        </Block>
                        <Fab position="center-bottom" onClick={this.changeSearchFilter} className="fab-filter" slot="fixed" text="Filter Now" color="orange">
                            <FilterIcon style={{ marginLeft: 20 }}/>
                        </Fab>
                    </Page>
                </Popup>
            </Page>
        );
    }
}

export default Search;