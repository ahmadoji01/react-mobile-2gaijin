import React from "react";
import "./CategorySlider.scss";
import CategoryIcon from "../CategoryIcon/CategoryIcon";

const CategorySlider = () => (
    <div className="categories segments no-pd-b">
        <div className="container">
            <div className="section-title">
                <h3>Category
                    <a href="#" className="see-all-link">See All</a>
                </h3>
            </div>
            <div className="row">
                <div className="col-20">
                    <div className="content">
                        <a href="/search/apparels">
                            <CategoryIcon iconname="Apparels" iconcolor="light-red"/>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <CategoryIcon iconname="Books" iconcolor="yellow"/>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <CategoryIcon iconname="Electronics" iconcolor="purple"/>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <CategoryIcon iconname="Footwear"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <CategoryIcon iconname="Furnitures" iconcolor="green"/>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <CategoryIcon iconname="Kitchens" iconcolor="dark-purple"/>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <CategoryIcon iconname="Sports" iconcolor="dark-red"/>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <CategoryIcon iconname="Vehicles" iconcolor="grey"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <CategoryIcon iconname="White Appliances" iconcolor="purple"/>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
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

export default CategorySlider;