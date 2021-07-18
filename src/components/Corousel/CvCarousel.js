import React, {Component} from 'react';
import Slider from "../SliderGL/Slider";
import SlideImages from "../../data/image/SlideImages";


class CvCarousel extends Component {
    render() {
        const {images} = this.props;
        return (
            <div className={"p-0 mt-0 mb-0 ml-auto mr-auto"} style={{width:1000, height:421}}>
                <Slider images={images} callback={this.props.callback} effect={this.props.effect}/>
            </div>
        );
    }
}

export default CvCarousel;
