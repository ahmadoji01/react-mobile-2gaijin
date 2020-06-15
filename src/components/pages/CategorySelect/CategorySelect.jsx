import React, { Component } from 'react';
import { Page, PageContent, Navbar, NavLeft, List, ListItem, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import axios from "axios";
import { ReactComponent as ApparelsIllustration } from "../../illustrations/ApparelsIllustration.svg";
import { ReactComponent as BooksIllustration } from "../../illustrations/BooksIllustration.svg";
import { ReactComponent as ElectronicsIllustration } from "../../illustrations/ElectronicsIllustration.svg";
import { ReactComponent as FootwearIllustration } from "../../illustrations/FootwearIllustration.svg";
import { ReactComponent as FurnituresIllustration } from "../../illustrations/FurnituresIllustration.svg";
import { ReactComponent as KitchensIllustration } from "../../illustrations/KitchensIllustration.svg";
import { ReactComponent as MiscellaneousIllustration } from "../../illustrations/MiscellaneousIllustration.svg";
import { ReactComponent as SportsIllustration } from "../../illustrations/SportsIllustration.svg";
import { ReactComponent as VehiclesIllustration } from "../../illustrations/VehiclesIllustration.svg";
import { ReactComponent as WhiteAppliancesIllustration } from "../../illustrations/WhiteAppliancesIllustration.svg";

class CategorySelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchterm: ""
        };
        this.SearchBarChange = this.SearchBarChange.bind(this);
        this.SearchItems = this.SearchItems.bind(this);
        this.onListClick = this.onListClick.bind(this);
    }

    async SearchItems() {
        this.$f7router.navigate("/add-product/" + this.state.searchterm);
    }

    componentWillMount() {
        return axios
        .get(`https://go.2gaijin.com/search?q=` + this.props.searchTerm, {}, {})
        .then(response => {
            var fetchData = response.data.data.items;
            this.setState({data: fetchData});
        });
    }

    SearchBarChange(e) {
        this.setState({ searchterm: e.target.value });
    }
    
    onListClick(itemName) {
        this.$f7router.navigate("/category-list-select/" + itemName);
    }
    
    render() {
        return(
            <Page name="category-select" className="page page-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>What do you want to sell today?</NavTitle>
                </Navbar>
                <div className="container" style={{ marginTop: 10 }}>
                    <h4>Categories for you</h4>
                    <div className="row" style={{ marginBottom: 0, paddingBottom: 0 }}>
                        <div className="col-50">
                            <ApparelsIllustration onClick={ () => this.onListClick("Apparels") } />
                        </div>
                        <div className="col-50">
                            <BooksIllustration onClick={ () => this.onListClick("Books") } />
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: 0, paddingBottom: 0 }}>
                        <div className="col-50">
                            <ElectronicsIllustration onClick={ () => this.onListClick("Electronics") } />
                        </div>
                        <div className="col-50">
                            <FootwearIllustration onClick={ () => this.onListClick("Footwear") } />
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: 0, paddingBottom: 0 }}>
                        <div className="col-50">
                            <FurnituresIllustration onClick={ () => this.onListClick("Furnitures") } />
                        </div>
                        <div className="col-50">
                            <KitchensIllustration onClick={ () => this.onListClick("Kitchens") } />
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: 0, paddingBottom: 0 }}>
                        <div className="col-50">
                            <SportsIllustration onClick={ () => this.onListClick("Sports") } />
                        </div>
                        <div className="col-50">
                            <VehiclesIllustration onClick={ () => this.onListClick("Vehicles") } />
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: 0, paddingBottom: 0 }}>
                        <div className="col-50">
                            <WhiteAppliancesIllustration onClick={ () => this.onListClick("White Appliances") } />
                        </div>
                        <div className="col-50">
                            <MiscellaneousIllustration onClick={ () => this.onListClick("Miscellaneous") } />
                        </div>
                    </div>
                </div>
            </Page>
        );
    }

}

export default CategorySelect;