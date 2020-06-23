import React, {Component} from "react";
import "./CategorySlider.scss";
import CategoryIcon from "../CategoryIcon/CategoryIcon";

class CategorySlider extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: false
        }
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    handleCollapse() {
        var container = document.getElementById("cat-container");
        var rows = container.getElementsByClassName("row");
        if(!this.state.isCollapsed) {
            var i = 0;
            for(i = 0; i < rows.length; i++) {
                if(i != 0) {
                    rows[i].style.display="";
                }
            }
            this.collTrigger.text = "Collapse It"
            this.setState({isCollapsed: true});
        } else {
            var i = 0;
            for(i = 0; i < rows.length; i++) {
                if(i != 0) {
                    rows[i].style.display="none";
                }
            }
            this.collTrigger.text = "View All"
            this.setState({isCollapsed: false});
        }
    }

    render() {
        return(
            <div className="categories segments no-pd-b">
                <div id="cat-container" className="container">
                    <div className="section-title">
                        <h3>Category
                            <a href="#" onClick={this.handleCollapse} ref={c => {this.collTrigger = c}} className="see-all-link">View All</a>
                        </h3>
                    </div>
                    <div className="row">
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Apparels">
                                    <CategoryIcon iconname="Apparels" iconcolor="light-red"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Books">
                                    <CategoryIcon iconname="Books" iconcolor="yellow"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Electronics">
                                    <CategoryIcon iconname="Electronics" iconcolor="purple"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Footwear">
                                    <CategoryIcon iconname="Footwear"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{display: 'none'}}>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Furnitures">
                                    <CategoryIcon iconname="Furnitures" iconcolor="green"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Kitchens">
                                    <CategoryIcon iconname="Kitchens" iconcolor="dark-purple"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Sports">
                                    <CategoryIcon iconname="Sports" iconcolor="dark-red"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Vehicles">
                                    <CategoryIcon iconname="Vehicles" iconcolor="grey"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{display: 'none'}}>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /White Appliances">
                                    <CategoryIcon iconname="White Appliances" iconcolor="purple"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                <a href="/search/ /Miscellaneous">
                                    <CategoryIcon iconname="Miscellaneous" iconcolor="dark-purple"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                
                            </div>
                        </div>
                        <div className="col-20">
                            <div className="content">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}; 

export default CategorySlider;