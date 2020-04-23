import React from "react";
import "./CategorySlider.scss";

const CategorySlider = () => (
    <div class="categories segments no-pd-b">
        <div class="container">
            <div class="section-title">
                <h3>Categories</h3>
            </div>
            <div class="row">
                <div class="col-20">
                    <div class="content">
                        <a href="/categories-details/">
                            <div class="icon">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <span>Phone</span>
                        </a>
                    </div>
                </div>
                <div class="col-20">
                    <div class="content">
                        <a href="/categories-details/">
                            <div class="icon">
                                <i class="fas fa-tshirt"></i>
                            </div>
                            <span>T-Shirt</span>
                        </a>
                    </div>
                </div>
                <div class="col-20">
                    <div class="content">
                        <a href="/categories-details/">
                            <div class="icon">
                                <i class="fas fa-basketball-ball"></i>
                            </div>
                            <span>Sports</span>
                        </a>
                    </div>
                </div>
                <div class="col-20">
                    <div class="content">
                        <a href="/categories-details/">
                            <div class="icon">
                                <i class="fas fa-tools"></i>
                            </div>
                            <span>Tools</span>
                        </a>
                    </div>
                </div>
                <div class="col-20">
                    <div class="content all-categories-link">
                        <a href="/all-categories/">
                            <div class="icon">
                                <i class="fas fa-angle-right"></i>
                            </div>
                            <span>See All</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
); 

export default CategorySlider;