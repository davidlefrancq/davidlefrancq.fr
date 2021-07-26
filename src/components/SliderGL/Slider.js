import React, {Component} from 'react';
import "./slider.css";
import SlideGL from "./SlideGL";
import {FaBackward, FaForward} from "react-icons/all";

/**
 * @property {SLIDEGL_EFFECT_CIRCLE || SLIDEGL_EFFECT_SQUARE} effect
 */
class Slider extends Component {

    slideShow;
    refSlide;
    refCanvas;
    refBtnPrevent;
    refBtnNext;


    constructor(props) {
        super(props);
        this.refSlide = React.createRef();
        this.refCanvas = React.createRef();
        this.refBtnPrevent = React.createRef();
        this.refBtnNext = React.createRef();
    }

    componentDidMount() {
        // window.addEventListener("load", () => {
            const slide = this.refSlide.current;
            const canvas = this.refCanvas.current;
            const prevent = this.refBtnPrevent.current;
            const next = this.refBtnNext.current;
            this.slideShow = new SlideGL(slide, canvas, prevent, next, this.props.effect, this.props.callback);
        // });
    }

    renderImage(image, index) {
        return (
            <img key={index} src={image} alt={""}/>
        );
    }

    renderImages() {
        return this.props.images.map((image, index) => {
            return this.renderImage(image, index);
        });
    }

    render() {

        let btnAnimation = "";
        if(!this.props.displayBtn){
            btnAnimation = "animated";
        }

        return (
            <div className={"slider-scene"}>
                <div ref={this.refSlide}
                     className={"slideshow"}
                >

                    {this.renderImages()}
                    <button ref={this.refBtnPrevent} className={`btn-slide ${btnAnimation}`}>
                        <FaBackward className={"icon-slide"} size={32}/>
                    </button>
                    <button ref={this.refBtnNext} className={`btn-slide ${btnAnimation}`} >
                        <FaForward className={"icon-slide"} size={32}/>
                    </button>
                </div>
                <div ref={this.refCanvas} className={"canvas"}></div>
            </div>
        );
    }
}

export default Slider;
