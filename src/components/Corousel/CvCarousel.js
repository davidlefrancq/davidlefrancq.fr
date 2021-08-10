import React, {Component} from 'react';
import Slider from "../SliderGL/Slider";
import SlideImages from "../../data/image/SlideImages";


class CvCarousel extends Component {
    render() {
        const {images, displayBtn} = this.props;
        return (
            <div className={"p-0 mt-0 mb-0 ml-auto mr-auto"} style={{width:"100%", height:421}}>
                <Slider
                    images={images}
                    callback={this.props.callback}
                    effect={this.props.effect}
                    displayBtn={displayBtn}
                />
            </div>
        );
    }
}

export default CvCarousel;
