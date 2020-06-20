import React, { Component } from 'react';
import { Block, BlockTitle, Button, Page, PageContent, Navbar, NavLeft, List, ListItem, NavRight, Subnavbar, Treeview, TreeviewItem, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import axios from "axios";

class EditCategoryListSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "",
            loadedChildren: [],
            categories: [],
            validateInput: 0,
        };
        this.populateCatTreeView = this.populateCatTreeView.bind(this);
        this.goToEditProduct = this.goToEditProduct.bind(this);
    }

    toggleSelectable(e, item) {
        var self = this;
        var $ = self.$$;
        if ($(e.target).is('.treeview-toggle')) return;
        self.setState({selectedItem: item});
    }
    
    componentWillMount() {
        if(localStorage.getItem("edit_selected_category")) {
            this.setState({ selectedItem: localStorage.getItem("edit_selected_category") })
        }
        
        axios
        .get(`https://go.2gaijin.com/get_categories`, {})
        .then(res => {
            this.setState({ categories: res.data.data.categories });
        });
    }

    componentDidMount() {
        if(!localStorage.getItem("edit_product_id")) {
            this.$f7.view.main.router.navigate("/");
        }
    }

    populateCatTreeView(category) {
        return category.map(item => {
            if (item.children.length == 0) {
                return <TreeviewItem 
                    selectable 
                    selected={this.state.selectedItem === item._id} 
                    label={item.name} 
                    onClick={(e) => this.toggleSelectable(e, item._id)} />;
            }
            if (item.children.length > 0) {
                return (
                    <TreeviewItem 
                    selectable 
                    selected={this.state.selectedItem === item._id} 
                    label={item.name} 
                    onClick={(e) => this.toggleSelectable(e, item._id)} >
                        {this.populateCatTreeView(item.children)}
                    </TreeviewItem>
                );
            }
        });
    }

    goToEditProduct() {
        if(this.state.selectedItem == "") {
            this.setState({ validateInput: 1 });
            return;
        } else {
            this.setState({ validateInput: 0 });
            this.$f7router.navigate("/edit-product-1");
            localStorage.setItem("edit_selected_category", this.state.selectedItem);
        }
    }

    render() {
        if(typeof(this.props.category) !== "undefined") {
            let selectedCategory = this.state.categories.find(category => category.name === this.props.category);
            
            let catTreeView;
            if(typeof(selectedCategory) !== "undefined" ) {
                let tmpCat = selectedCategory;
                    catTreeView = <TreeviewItem 
                    selectable
                    opened 
                    selected={this.state.selectedItem === tmpCat._id} 
                    label={tmpCat.name} 
                    onClick={(e) => this.toggleSelectable(e, tmpCat._id)} >
                    {this.populateCatTreeView(tmpCat.children)} 
                    </TreeviewItem>;
            }

            let validMsg;
            if(this.state.validateInput == 1) {
                validMsg = <p>You must choose one of the category</p>;
            } else {
                validMsg = <p></p>;
            }

            return (
                <Page name="edit-category-select" className="page page-edit-category-select">
                    <Navbar>
                        <NavLeft>
                            <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                        </NavLeft>
                        <NavTitle>Choose {this.props.category} Category</NavTitle>
                    </Navbar>
                    <Block strong className="no-padding-horizontal">
                        <Treeview searchbarEnable className="tree-list">
                            {catTreeView}
                        </Treeview>
                        <div style={{height: '10%', width: '100%', padding: 5, marginTop: 20}}>
                            {validMsg}
                            <Button className="general-btn" style={{color: '#fff'}} onClick={this.goToEditProduct} raised fill round>Choose Category</Button>
                        </div>
                    </Block>
                </Page>
            );
        } else {
            return '';
        }
    }

}

export default EditCategoryListSelect;