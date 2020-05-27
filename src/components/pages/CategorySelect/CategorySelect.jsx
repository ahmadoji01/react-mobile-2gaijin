import React, { Component } from 'react';
import { Page, Navbar, NavLeft, List, ListItem, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import axios from "axios";

class CategorySelect extends Component {

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
        this.$f7router.navigate("/add-product/" + this.state.searchterm);
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
    
    onListClick(itemName) {
        this.$f7router.navigate("/add-product/" + itemName);
    }
    
    render() {
        return(
            <Page name="search-history" className="page page-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>What do you want to sell today?</NavTitle>
                    <Subnavbar inner={false}>
                        <Searchbar
                        placeholder="Select category of your items"
                        clearButton={true}
                        onChange={this.SearchBarChange}
                        onSubmit={this.SearchItems}
                        ref={(input) => { this.searchInput = input; }}
                        searchContainer=".search-list"
                        searchIn=".item-title"
                        ></Searchbar>
                    </Subnavbar>
                </Navbar>
                <List className="searchbar-not-found">
                    <ListItem title="Nothing found" />
                </List>
                <List className="search-list searchbar-found">
                    <ListItem title="Apparels" onClick={() => this.onListClick("Apparels")} />
                    <ListItem title="Books" onClick={() => this.onListClick("Books")} />
                    <ListItem title="Electronics" onClick={() => this.onListClick("Electronics")} />
                    <ListItem title="Footwear" onClick={() => this.onListClick("Footwear")} />
                    <ListItem title="Furnitures" onClick={() => this.onListClick("Furnitures")} />
                    <ListItem title="Kitchens" onClick={() => this.onListClick("Kitchens")} />
                    <ListItem title="Sports" onClick={() => this.onListClick("Sports")} />
                    <ListItem title="Vehicles" onClick={() => this.onListClick("Vehicles")} />
                    <ListItem title="White Appliances" onClick={() => this.onListClick("White Appliances")} />
                    <ListItem title="Miscellaneous" onClick={() => this.onListClick("Miscellaneous")} />
                </List>
            </Page>
        );
    }

}

export default CategorySelect;