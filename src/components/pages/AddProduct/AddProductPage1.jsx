import React, { Component } from 'react';
import { Page, Navbar, NavLeft, List, ListInput, Button, TextEditor, Popup, Block, NavRight, Link, Icon, NavTitle } from 'framework7-react';
import "./AddProductPage1.scss";

class AddProductPage1 extends Component {

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
        if(localStorage.getItem("item_name")) {
            this.setState({ itemName: localStorage.getItem("item_name") });
            this.setState({ itemBrand: localStorage.getItem("item_brand") });
            this.setState({ itemCondition: localStorage.getItem("item_condition") });
            this.setState({ yearsOwned: localStorage.getItem("years_owned") });
            this.setState({ modelName: localStorage.getItem("model_name") });
            this.setState({ itemDescription: localStorage.getItem("item_description") });
        }
    }

    onButtonClick() {
        if(this.state.itemName != "") {
            localStorage.setItem("item_name", this.state.itemName);
            localStorage.setItem("item_brand", this.state.itemBrand);
            localStorage.setItem("item_condition", this.state.itemCondition);
            localStorage.setItem("years_owned", this.state.yearsOwned);
            localStorage.setItem("model_name", this.state.modelName);
            localStorage.setItem("item_description", this.state.itemDescription);
            this.$f7router.navigate("/add-product-2");
        } else {
            this.setState({ nameValid: 0 });
        }
    }

    render() {

        return(
            <Page name="search-history" className="page page-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
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
                            label="Item's Description"
                            type="textarea"
                            resizable
                            placeholder="Fill your item's description >"
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
                            <Link popupClose>Confirm</Link>
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

export default AddProductPage1;