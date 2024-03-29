import React, { Component } from 'react';
import { Page, PageContent, Navbar, NavLeft, List, ListItem, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
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

class EditCategorySelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchterm: ""
        };
        this.onListClick = this.onListClick.bind(this);
    }
    
    onListClick(itemName) {
        this.$f7router.navigate("/edit-category-list-select/" + itemName);
    }

    componentDidMount() {
        if(!localStorage.getItem("edit_product_id")) {
            this.$f7.view.main.router.navigate("/");
        }
    }
    
    render() {
        return(
            <Page name="edit-category-select" className="page page-edit-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="/collections" ><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Choose your new category for the item</NavTitle>
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
            </Page>
        );
    }

}

export default EditCategorySelect;