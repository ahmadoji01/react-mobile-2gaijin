import React, { Component } from "react";
import AuthService from "../../../services/auth.service.js";
import { Page, Navbar, NavLeft, NavRight, NavTitle, Subnavbar, Searchbar, Link, Icon, List, ListItem, Popover } from "framework7-react";
import axios from "axios";

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            data: []
        }
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
                    var items = jsonData.posted_items;
                    this.setState({ data: items });
                }
            });
        } else {
            this.setState({isLoggedIn: false});
            this.$f7router.navigate("/login");
        }
    }

    render() {
        
        let itemLists;
        var items = this.state.data;
        items = items.map(function(item, i) {
            return <ListItem
                href="#"
                title={item.name}
                subtitle={item.price}
                popoverOpen=".popover-menu"
                >
                    <img slot="media" src={item.img_url} width="100" />
            </ListItem>
        });

        return (
            <Page name="collections" className="page page-collections page-with-subnavbar hide-navbar-on-scroll">
                <Navbar id="navbar-home" className="home-nav-large">
                    <Subnavbar inner={false}>
                        <Searchbar
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            placeholder="try Fridge, Table"
                        ></Searchbar>
                    </Subnavbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Item Lists</NavTitle>
                </Navbar>
                <List mediaList className="search-list searchbar-found">
                    {items}
                </List>
                <Popover className="popover-menu">
                    <List>
                        <ListItem link="#" popoverClose title="Edit" />
                        <ListItem link="#" popoverClose title="Delete" />
                        <ListItem link="#" popoverClose title="Mark as Sold" />
                    </List>
                </Popover>
            </Page>
        );
    }

}

export default Collections;