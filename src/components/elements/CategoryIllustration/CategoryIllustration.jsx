import React, { Component } from "react";
import Apparels from "./assets/Apparels.jpg";

class CategoryIllustration extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    render() {
        return (
            <div className="cat-illust-content">
                <img src={Apparels} />
            </div>
        );
    }

}

export default CategoryIllustration;