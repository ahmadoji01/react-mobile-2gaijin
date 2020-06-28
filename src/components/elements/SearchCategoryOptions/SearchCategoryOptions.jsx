import React, { Component } from "react";
import "./SearchCategoryOptions.scss";
import axios from "axios";
import { TreeviewItem } from "framework7-react";

class SearchCategoryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        this.populateCatTreeView = this.populateCatTreeView.bind(this);
    }

    componentWillMount() {
        if(localStorage.getItem("selected_category")) {
            this.setState({ selectedItem: localStorage.getItem("selected_category") })
        }
        
        axios
        .get(`https://go.2gaijin.com/get_categories`, {})
        .then(res => {
            this.setState({ categories: res.data.data.categories });
        });
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

    render() {
        return (
            <>
                <option value="">Any</option>
                <option value="Apparels">Apparels</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Footwear">Footwear</option>
                <option value="Furnitures">Furnitures</option>
                <option value="Kitchens">Kitchens</option>
                <option value="Sports">Sports</option>
                <option value="Vehicles">Vehicles</option>
                <option value="White Appliances">White Appliances</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </>
        );
    }
}

export default SearchCategoryOptions;