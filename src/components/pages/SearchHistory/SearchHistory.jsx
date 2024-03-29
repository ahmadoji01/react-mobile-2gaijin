import React, { Component } from 'react';
import { Page, Navbar, NavLeft, List, ListItem, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import axios from "axios";

class SearchHistory extends Component {
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
        this.$f7router.navigate("/search/" + this.state.searchterm);
    }

    componentWillMount() {
        return axios
        .get(`https://go.2gaijin.com/search?q=` + this.props.searchTerm, {}, {})
        .then(response => {
            var fetchData = response.data.data.items;
            this.setState({data: fetchData});
        });
    }

    componentDidMount() {
        this.searchInput.toggle();
    }

    SearchBarChange(e) {
        this.setState({ searchterm: e.target.value });
    }
    
    onListClick(itemName) {
        this.$f7router.navigate("/search/" + itemName);
    }
    
    render() {
        return(
            <Page name="search-history" className="page page-search-history">
                <Navbar>
                    <NavLeft>
                        <Link href="/"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Search Items</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                        placeholder="try Fridge, Table"
                        clearButton={true}
                        onChange={this.SearchBarChange}
                        onSubmit={this.SearchItems}
                        ref={(input) => { this.searchInput = input; }}
                        searchContainer=".search-list"
                        searchIn=".item-title"
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>
                <List className="search-list searchbar-found">
                    <ListItem href="#" title="Books" onClick={() => this.onListClick("Books")} />
                    <ListItem href="#" title="Chair" onClick={() => this.onListClick("Chair")} />
                    <ListItem href="#" title="Desk" onClick={() => this.onListClick("Desk")} />
                    <ListItem href="#" title="Microwave" onClick={() => this.onListClick("Microwave")} />
                    <ListItem href="#" title="Refrigerator" onClick={() => this.onListClick("Refrigerator")} />
                    <ListItem href="#" title="Table" onClick={() => this.onListClick("Table")} />
                </List>
            </Page>
        );
    }
}

export default SearchHistory;