import React, { Component } from 'react';
import { Page, Navbar, NavLeft, List, ListInput, Tab, Tabs, Button, ListItem, TextEditor, Popup, Block, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import parse from 'html-react-parser';
import "./EditProductPage1.scss";
import axios from "axios";

class EditProductPage1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popupOpened: false,
            itemName: "",
            itemBrand: "",
            itemCondition: "",
            yearsOwned: "Less than a year",
            modelName: "",
            itemDescription: "",
            nameValid: 1,
        }
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onItemNameChange = this.onItemNameChange.bind(this);
        this.onItemBrandChange = this.onItemBrandChange.bind(this);
        this.onItemConditionChange = this.onItemConditionChange.bind(this);
        this.onYearsOwnedChange = this.onYearsOwnedChange.bind(this);
        this.onModelNameChange = this.onModelNameChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onItemNameChange(e) {
        this.setState({ itemName: e.target.value });
    }

    onItemBrandChange(e) {
        this.setState({ itemBrand: e.target.value });
    }

    onItemConditionChange(e) {
        this.setState({ itemCondition: e.target.value });
    }

    onYearsOwnedChange(e) {
        this.setState({ yearsOwned: e.target.value });
    }

    onModelNameChange(e) {
        this.setState({ modelName: e.target.value });
    }

    onEditorChange(e) {
        this.setState({ itemDescription: e });
    }

    componentWillMount() {
        if(localStorage.getItem("edit_product_id")) {
            var payload = {
                "_id": localStorage.getItem("edit_product_id")
            }

            axios.post(`https://go.2gaijin.com/get_product_info_edit`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
            }).then(response => {
                if(response.data["status"] == "Success") {
                    var jsonData = response.data;
                    localStorage.setItem("edit_item_name", jsonData.data.product.name);
                    localStorage.setItem("edit_item_brand", jsonData.data.product_detail.brand);
                    localStorage.setItem("edit_item_condition", jsonData.data.product_detail.condition);
                    localStorage.setItem("edit_years_owned", jsonData.data.product_detail.years_owned);
                    localStorage.setItem("edit_model_name", jsonData.data.product_detail.model_name);
                    localStorage.setItem("edit_item_description", jsonData.data.product.description);
                    localStorage.setItem("edit_price", jsonData.data.product.price);
                    localStorage.setItem("edit_latitude", jsonData.data.product.latitude);
                    localStorage.setItem("edit_longitude", jsonData.data.product.longitude);
                }
            }).then(() => {
                this.setState({ itemName: localStorage.getItem("edit_item_name") });
                this.setState({ itemBrand: localStorage.getItem("edit_item_brand") });
                this.setState({ itemCondition: localStorage.getItem("edit_item_condition") });
                this.setState({ yearsOwned: localStorage.getItem("edit_years_owned") });
                this.setState({ modelName: localStorage.getItem("edit_model_name") });
                this.setState({ itemDescription: localStorage.getItem("edit_item_description") });
            });
        } else {
            this.$f7router.navigate("/");
        }
    }

    componentDidMount() {
        if(!localStorage.getItem("edit_product_id")) {
            this.$f7.view.main.router.navigate("/");
        }
    }

    onButtonClick() {
        if(this.state.itemName != "") {
            localStorage.setItem("edit_item_name", this.state.itemName);
            localStorage.setItem("edit_item_brand", this.state.itemBrand);
            localStorage.setItem("edit_item_condition", this.state.itemCondition);
            localStorage.setItem("edit_years_owned", this.state.yearsOwned);
            localStorage.setItem("edit_model_name", this.state.modelName);
            localStorage.setItem("edit_item_description", this.state.itemDescription);
            this.$f7router.navigate("/edit-product-2");
        } else {
            this.setState({ nameValid: 0 });
        }
    }

    render() {

        return(
            <Page name="edit-product-1" className="page page-edit-product-1">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Tell us the detail of your item</NavTitle>
                </Navbar>
                <div className="container">
                    <List noHairlinesMd>
                        <ListInput
                            outline
                            onChange={this.onItemNameChange}
                            value={this.state.itemName}
                            ref={formName => (this.formName = formName)}
                            label="Item's Name"
                            type="text"
                            placeholder="Type item's name"
                            required
                            validate
                            onInputClear={() => this.setState({ itemName: "" })}
                            clearButton
                        />
                        <ListInput
                            outline
                            onChange={this.onItemBrandChange}
                            value={this.state.itemBrand}
                            label="Brand Name (optional)"
                            type="text"
                            placeholder="e.g. Panasonic"
                            onInputClear={() => this.setState({ itemBrand: "" })}
                            clearButton
                        />
                        <ListInput
                            outline
                            onChange={this.onItemConditionChange}
                            value={this.state.itemCondition}
                            label="Item's Conditions (optional)"
                            type="email"
                            placeholder="e.g. Still functions properly, 90% used"
                            onInputClear={() => this.setState({ itemCondition: "" })}
                            clearButton
                        />
                        <ListInput
                            outline
                            onChange={this.onYearsOwnedChange}
                            value={this.state.yearsOwned}
                            label="Years Owned"
                            type="select"
                            defaultValue="Less than a year"
                            placeholder="Please choose..."
                        >
                            <option value="Less than a year">Less than a year</option>
                            <option value="1 - 2 years">1 - 2 years</option>
                            <option value="2 - 4 years">2 - 4 years</option>
                            <option value="More than 5 years">More than 5 years</option>
                        </ListInput>
                        <ListInput
                            outline
                            onChange={this.onModelNameChange}
                            value={this.state.modelName}
                            label="Model Name (optional)"
                            type="text"
                            placeholder="e.g. NA-FA80H7-N"
                            onInputClear={() => this.setState({ modelName: "" })}
                            clearButton
                        />
                        <ListInput
                            outline
                            value={this.state.itemDescription}
                            label="Item's Description"
                            type="textarea"
                            resizable
                            placeholder="Fill your item's description"
                            onFocus={() => this.setState({ popupOpened : true })}
                            onInputClear={() => this.setState({ itemDescription: "" })}
                            clearButton
                        />
                    </List>
                    <div style={{padding: 15}}>
                        <Button className="general-btn" style={{color: '#fff'}} onClick={this.onButtonClick} raised fill round>Set your pricing</Button>
                    </div>
                </div>
                <Popup className="item-desc-popup" opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})}>
                    <Page>
                        <Navbar title="Item's Description">
                        <NavRight>
                            <Link popupClose>Close</Link>
                        </NavRight>
                        </Navbar>
                        <Block>
                            <TextEditor
                                value={this.state.itemDescription}
                                onTextEditorChange={this.onEditorChange}
                                placeholder="Your item's description goes here"
                                buttons={[
                                    ['bold', 'italic', 'underline', 'strikeThrough'],
                                    ['orderedList', 'unorderedList']
                                ]}
                            />
                        </Block>
                    </Page>
                </Popup>
            </Page>
        );
    }

}

export default EditProductPage1;