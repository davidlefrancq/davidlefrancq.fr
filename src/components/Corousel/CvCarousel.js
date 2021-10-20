import React, {Component} from 'react';
import Slider from "../SliderGL/Slider";

class CvCarousel extends Component {
    render() {
        const {images, displayBtn} = this.props;
        return (
            <div className={"p-0 mt-0 mb-0 ml-auto mr-auto"} style={{width:"100%", height:350}}>
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
