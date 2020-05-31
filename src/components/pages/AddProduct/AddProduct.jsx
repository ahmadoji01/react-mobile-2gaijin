import React, { Component } from 'react';
import { Page, Navbar, NavLeft, List, ListInput, Tab, Tabs, Button, ListItem, TextEditor, Popup, Block, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import parse from 'html-react-parser';
class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popupOpened: false,
            itemDescription: ""
        }
        this.onEditorChange = this.onEditorChange.bind(this);
    }

    onEditorChange(e) {
        this.setState({ itemDescription: e });
    }

    render() {
        return(
            <Page name="search-history" className="page page-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Tell us the detail of your item</NavTitle>
                </Navbar>
                <Tabs animated>
                    <Tab id="add-product-tab-1" className="page-content" tabActive>
                        <List noHairlinesMd>
                            <ListInput
                                outline
                                label="Item's Name"
                                floatingLabel
                                type="text"
                                placeholder="Type item's name"
                                clearButton
                            >
                                <Icon icon="demo-list-icon" slot="media" />
                            </ListInput>
                            <ListInput
                                outline
                                label="Brand Name"
                                floatingLabel
                                type="text"
                                placeholder="What is the brand name of this item?"
                                clearButton
                            >
                                <Icon icon="demo-list-icon" slot="media" />
                            </ListInput>
                            <ListInput
                                outline
                                label="Item's Conditions"
                                floatingLabel
                                type="email"
                                placeholder="e.g. Still functions properly, 90% used"
                                clearButton
                            >
                                <Icon icon="demo-list-icon" slot="media" />
                            </ListInput>
                            <ListInput
                                label="Years Owned"
                                type="select"
                                defaultValue="Less than a year"
                                placeholder="Please choose..."
                            >
                                <Icon icon="demo-list-icon" slot="media"/>
                                <option value="Less than a year">Less than a year</option>
                                <option value="1 - 2 years">1 - 2 years</option>
                                <option value="2 - 4 years">2 - 4 years</option>
                                <option value="More than 5 years">More than 5 years</option>
                            </ListInput>
                            <ListInput
                                outline
                                label="Model Name"
                                floatingLabel
                                type="text"
                                placeholder="e.g. NA-FA80H7-N"
                                clearButton
                            >
                                <Icon icon="demo-list-icon" slot="media" />
                            </ListInput>
                            <ListInput
                                outline
                                value={this.state.itemDescription}
                                label="Item's Description"
                                floatingLabel
                                type="textarea"
                                resizable
                                placeholder="Fill your item's description"
                                onFocus={() => this.setState({ popupOpened : true })}
                                clearButton
                            >
                                <Icon icon="demo-list-icon" slot="media" />
                            </ListInput>
                        </List>
                        <Link tabLink="#add-product-tab-2"><Button raised fill round>Set your pricing</Button></Link>

                        <Popup className="item-desc-popup" opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})}>
                            <Page>
                                <Navbar title="Item's Description">
                                <NavRight>
                                    <Link popupClose>Close</Link>
                                </NavRight>
                                </Navbar>
                                <Block>
                                    <TextEditor
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
                    </Tab>
                    <Tab id="add-product-tab-2" className="page-content">
                        <List noHairlinesMd>
                            <ListInput
                                outline
                                label="Price"
                                floatingLabel
                                type="text"
                                placeholder="Type item's name"
                                clearButton
                            >
                                <Icon icon="demo-list-icon" slot="media" />
                            </ListInput>
                            <ListInput
                                outline
                                label="Where is this item located?"
                                floatingLabel
                                type="text"
                                placeholder="Choose location"
                                clearButton
                            >
                                <Icon icon="demo-list-icon" slot="media" />
                            </ListInput>
                        </List>
                    </Tab>
                    <Tab id="tab-3" className="page-content">
                        <Block>
                            <p>Tab 3 content</p>
                            ...
                        </Block>
                    </Tab>
                </Tabs>
                

            </Page>
        );
    }

}

export default AddProduct;