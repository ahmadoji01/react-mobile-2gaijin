import React, { Component } from 'react';
import { Page, Popup, Navbar, NavLeft, Link, Icon, NavTitle } from 'framework7-react';
import axios from "axios";
import apparels from "../../illustrations/Apparels.png";
import books from "../../illustrations/Books.png";
import electronics from "../../illustrations/Electronics.png";
import footwear from "../../illustrations/Footwear.png";
import furnitures from "../../illustrations/Furnitures.png";
import kitchens from "../../illustrations/Kitchens.png";
import sports from "../../illustrations/Sports.png";
import vehicles from "../../illustrations/Vehicles.png";
import whiteapp from "../../illustrations/WhiteApp.png";
import misc from "../../illustrations/Misc.png";
import AuthService from "../../../services/auth.service.js";
import SubscriptionPage from "../SubscriptionPage";

class CategorySelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchterm: "",
            isSubsPageOpened: false,
            isError: false,
        };
        this.onListClick = this.onListClick.bind(this);
    }

    componentWillMount() {
        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
        }

        return axios
        .get(`https://go.2gaijin.com/get_subscription_status`, config)
        .then(response => {
            if(response.data.status == "Success") {
                var isSubscribed = response.data.data.is_subscribed;
                this.setState({ isSubsPageOpened: !isSubscribed });
            } else {
                this.setState({ isError: true });
            }
        });
    }

    componentWillUpdate() {
        if(this.state.isSubsPageOpened) {
            this.setState({ isSubsPageOpened: false });
        }
    }
    
    onListClick(itemName) {
        this.$f7router.navigate("/category-list-select/" + itemName);
    }
    
    render() {

        if(!AuthService.getCurrentUser()) {
            return "";
        }

        return(
            <Page name="category-select" className="page page-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="/"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>What do you want to sell today?</NavTitle>
                </Navbar>
                <div className="container" style={{ marginTop: 10 }}>
                    <h4>Categories for you</h4>
                    <div className="row" style={{ marginBottom: 5, paddingBottom: 0 }}>
                        <div className="col-50">
                            <img src={apparels} onClick={ () => this.onListClick("Apparels") } />
                        </div>
                        <div className="col-50">
                            <img src={books} onClick={ () => this.onListClick("Books") } />
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: 5, paddingBottom: 0 }}>
                        <div className="col-50">
                            <img src={electronics} onClick={ () => this.onListClick("Electronics") } />
                        </div>
                        <div className="col-50">
                            <img src={footwear} onClick={ () => this.onListClick("Footwear") } />
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: 5, paddingBottom: 0 }}>
                        <div className="col-50">
                            <img src={furnitures} onClick={ () => this.onListClick("Furnitures") } />
                        </div>
                        <div className="col-50">
                            <img src={kitchens} onClick={ () => this.onListClick("Kitchens") } />
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: 5, paddingBottom: 0 }}>
                        <div className="col-50">
                            <img src={sports} onClick={ () => this.onListClick("Sports") } />
                        </div>
                        <div className="col-50">
                            <img src={vehicles} onClick={ () => this.onListClick("Vehicles") } />
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: 5, paddingBottom: 0 }}>
                        <div className="col-50">
                            <img src={whiteapp} onClick={ () => this.onListClick("White Appliances") } />
                        </div>
                        <div className="col-50">
                            <img src={misc} onClick={ () => this.onListClick("Miscellaneous") } />
                        </div>
                    </div>
                </div>
                <Popup className="item-desc-popup" opened={this.state.isSubsPageOpened}>
                    <Navbar>
                        <NavLeft>
                            <Link href="/" popupClose><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                        </NavLeft>
                    </Navbar>
                    <SubscriptionPage />
                </Popup>
            </Page>
        );
    }

}

export default CategorySelect;