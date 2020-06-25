import React, { Component } from "react";
import "./Collections.scss";
import AuthService from "../../../services/auth.service.js";
import { Col, Preloader, Sheet, PageContent, ListInput, Block, Button, Page, Navbar, NavLeft, NavRight, NavTitle, Subnavbar, Searchbar, Link, Icon, List, ListItem, Popover } from "framework7-react";
import axios from "axios";
import SoldOutIcon from "../../icons/SoldOutIcon.svg";

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            data: [],
            selectedId: "",
            selectedName: "",
            selectedPrice: 0,
            selectedIndex: 0,
            isPriceUpdated: false,
        }
        this.onListItemClick = this.onListItemClick.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onUpdatePriceClick = this.onUpdatePriceClick.bind(this);
        this.onEditProductClick = this.onEditProductClick.bind(this);
        this.onMarkAsSoldClick = this.onMarkAsSoldClick.bind(this);
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
            this.$f7router.navigate("/login/collections");
        }
    }

    onListItemClick(index, id, name, price) {
        this.setState({ selectedIndex: index });
        this.setState({ selectedId: id });
        this.setState({ selectedName: name });
        this.setState({ selectedPrice: price });
    }

    onPriceChange(e) {
        this.setState({ selectedPrice: parseInt(e.target.value) });
    }

    onUpdatePriceClick() {
        var payload = {
            "_id": this.state.selectedId,
            "price": parseInt(this.state.selectedPrice)
        }

        this.setState({ isLoading: true });
        axios.post(`https://go.2gaijin.com/edit_pricing`, payload, {
        headers: {
            "Authorization": localStorage.getItem("access_token")
        }
        }).then(response => {
            if(response.data["status"] == "Success") {
                this.setState({ isLoading: false });
                this.setState({ isPriceUpdated: true });
                var data = this.state.data;
                data[this.state.selectedIndex].price = parseInt(this.state.selectedPrice);
                this.setState({ data: data });
            } else {
                this.setState({ isLoading: false });
                this.setState({ isPriceUpdated: false });
            }
        });
    }

    onEditProductClick() {
        localStorage.setItem("edit_product_id", this.state.selectedId);
        this.$f7router.navigate("/edit-category-select");
    }

    onMarkAsSoldClick() {
        var payload = {
            "_id": this.state.selectedId
        }

        this.setState({ isLoading: true });
        axios.post(`https://go.2gaijin.com/mark_as_sold`, payload, {
        headers: {
            "Authorization": localStorage.getItem("access_token")
        }
        }).then(response => {
            if(response.data["status"] == "Success") {
                this.setState({ isLoading: false });
                var data = this.state.data;
                if(data[this.state.selectedIndex].availability == "sold") {
                    data[this.state.selectedIndex].availability = "available";
                    this.setState({ data: data });
                } else {
                    data[this.state.selectedIndex].availability = "sold";
                    this.setState({ data: data });
                }
            } else {
                this.setState({ isLoading: false });
            }
        });
    }

    render() {
        
        let itemLists;
        var items = this.state.data;
        items = items.map((item, i) => {
            let soldOut;
            if(item.availability == "sold") {
                soldOut = <img src={SoldOutIcon} style={{ height: 24 }} />
            }

            return <ListItem
                className="collection-item"
                href="#"
                onClick={() => this.onListItemClick(i, item._id, item.name, item.price)}
                title={item.name}
                subtitle={"¥" + item.price}
                popoverOpen=".popover-menu"
                footer={soldOut}
                >
                    <img slot="media" src={item.img_url} width="100" />
            </ListItem>
        });

        let updateValidation; 
        if(this.state.isPriceUpdated) {
            updateValidation = <p>Price has been updated</p>;
        }

        let loading;
        if(this.state.isLoading) {
            loading = <Col style={{ width: "100%" }}>
                <Preloader color="orange"></Preloader>
            </Col>;
        }

        let availabilityStatusText;
        var selectedIndex = this.state.selectedIndex;
        if(this.state.data.length > 0) {
            if(this.state.data[selectedIndex].availability == "sold") {
                availabilityStatusText = "Mark as Available";
            } else {
                availabilityStatusText = "Mark as Sold";
            }
        }

        return (
            <Page name="collections" className="page page-collections page-with-subnavbar hide-navbar-on-scroll">
                <Navbar id="navbar-collections" className="home-nav-large">
                    <Subnavbar inner={false}>
                        <Searchbar
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            placeholder="try Fridge, Table"
                        ></Searchbar>
                    </Subnavbar>
                    <NavLeft>
                        <Link href="/account"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Item Lists</NavTitle>
                </Navbar>
                <List mediaList className="search-list item-collections searchbar-found">
                    {items}
                </List>
                <Popover className="popover-menu">
                    <List>
                        <ListItem title={this.state.selectedName} />
                        <ListItem link={`/product/${this.state.selectedId}`} popoverClose title="See Product Details" />
                        <ListItem link="#" sheetOpen=".manage-pricing-sheet" popoverClose title="Manage Pricing" />
                        <ListItem link="#" onClick={this.onEditProductClick} popoverClose title="Edit" />
                        <ListItem link="#" onClick={this.onMarkAsSoldClick} popoverClose title={availabilityStatusText} />
                        <ListItem link="#" popoverClose title="Delete" />
                    </List>
                </Popover>
                <Sheet
                    className="manage-pricing-sheet"
                    style={{height: 'auto', '--f7-sheet-bg-color': '#fff'}}
                    swipeToClose
                    backdrop
                    onSheetClosed={ () => this.setState({ isPriceUpdated: false }) }
                    >
                    <PageContent>
                        <List>
                            <ListInput
                                outline
                                onChange={this.onPriceChange}
                                value={this.state.selectedPrice}
                                label="Price"
                                type="number"
                                required
                                validate
                            />
                        </List>
                        <div style={{ padding: 10 }}>
                            {updateValidation}
                            {loading}
                            <Button className="general-btn" style={{color: '#fff'}} disabled={this.state.isLoading} onClick={this.onUpdatePriceClick} raised fill round>Update Price</Button>
                        </div>
                    </PageContent>
                </Sheet>
            </Page>
        );
    }

}

export default Collections;