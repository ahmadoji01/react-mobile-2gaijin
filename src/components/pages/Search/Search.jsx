import React, { Component } from 'react';
import ProductContainerInfinite from '../../elements/ProductContainerInfinite';
import { Page, Navbar, Subnavbar, Tabs, Tab, Block, Segmented, Button, NavTitle, Searchbar } from 'framework7-react';
import axios from "axios";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchterm: ""
        };
        this.SearchBarChange = this.SearchBarChange.bind(this);
        this.SearchItems = this.SearchItems.bind(this);
    }

    async SearchItems() {
        const response = await axios
        .get("/search?q=" + this.state.searchterm, {}, {});
        var fetchData = response.data.data.items;
        this.setState({ data: fetchData });
    }

    componentWillMount() {
        return axios
        .get("/search?q=" + this.props.searchTerm, {}, {})
        .then(response => {
            var fetchData = response.data.data.items;
            this.setState({data: fetchData});
        });
    }

    SearchBarChange(e) {
        this.setState({ searchterm: e.target.value });
    }
    
    render() {
        return(
            <Page name="search" className="page page-search page-with-subnavbar">
                <Navbar>
                    <Searchbar
                    disableButtonText="Cancel"
                    placeholder="Search in items"
                    clearButton={true}
                    onChange={this.SearchBarChange}
                    onSubmit={this.SearchItems}
                    ref={(input) => { this.searchInput = input; }}
                    ></Searchbar>
                    <Subnavbar>
                        <Segmented raised>
                            <Button tabLink="#tab1" tabLinkActive>Relevancy</Button>
                            <Button tabLink="#tab2">Nearby</Button>
                        </Segmented>
                    </Subnavbar>
                </Navbar>
                <Tabs>
                    <Tab id="tab1" tabActive className="page-content" style={{paddingTop: 0}}>
                        <ProductContainerInfinite items={this.state.data} />
                    </Tab>
                    <Tab id="tab2" className="page-content" style={{paddingTop: 0}}>
                        <ProductContainerInfinite items={this.state.data} />
                    </Tab>
                </Tabs>
            </Page>
        );
    }
}

export default Search;