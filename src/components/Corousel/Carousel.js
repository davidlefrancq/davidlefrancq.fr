import React, {Component, Fragment} from 'react';
import "./Carousel.css";
import {TiArrowBackOutline, TiArrowForwardOutline} from "react-icons/ti";

class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // target: 0,
            direction: "left",
            cssClassCenter: "center", // center, centerFromLeft, centerFromRight
            style: {
                titleAnimation: "",
                imageAnimation: "",
            },
            sfx:{
                mouseEnter: {
                    audio: new Audio("/sfx/mouse-enter.mp3"),
                    play: false,
                },
                mouseLeave: {
                    audio: new Audio("/sfx/mouse-leave.mp3"),
                    play: false,
                },
                mouseClick: {
                    audio: new Audio("/sfx/mouse-click-02.mp3"),
                    play: false,
                },
            },
        };
    }

    componentDidMount() {
        const state = {...this.state};
        const {mouseEnter, mouseLeave, mouseClick} = state.sfx;

        mouseEnter.audio.addEventListener('ended',()=>{
            state.sfx.mouseEnter.play = false;
            this.setState(state);
        });

        mouseLeave.audio.addEventListener('ended',()=>{
            state.sfx.mouseLeave.play = false;
            this.setState(state);
        });

        mouseClick.audio.addEventListener('ended',()=>{
            state.sfx.mouseClick.play = false;
            this.setState(state);
        });
    }

    componentWillUnmount() {
        const {mouseEnter, mouseLeave, mouseClick} = this.state.sfx;

        mouseEnter.audio.addEventListener('ended',()=>{
            const state = {...this.state};
            state.sfx.mouseEnter.play = false;
            this.setState(state);
        });

        mouseLeave.audio.addEventListener('ended',()=>{
            const state = {...this.state};
            state.sfx.mouseLeave.play = false;
            this.setState(state);
        });

        mouseClick.audio.addEventListener('ended',()=>{
            const state = {...this.state};
            state.sfx.mouseClick.play = false;
            this.setState(state);
        });
    }

    togglePlayMouseEnter = () => {
        const state = {...this.state};
        const {sfx} = state;
        const {mouseEnter} = sfx;

        if(mouseEnter.play){
            mouseEnter.audio.pause();
            state.sfx.mouseEnter.play = false;
            this.setState(state);
        }else{
            mouseEnter.audio.play();
            state.sfx.mouseEnter.play = true;
            this.setState(state);
        }
    }

    togglePlayMouseLeave = () => {
        const state = {...this.state};
        const {sfx} = state;
        const {mouseLeave} = sfx;

        if(mouseLeave.play){
            mouseLeave.audio.pause();
            state.sfx.mouseLeave.play = false;
            this.setState(state);
        }else{
            mouseLeave.audio.play();
            state.sfx.mouseLeave.play = true;
            this.setState(state);
        }
    }

    togglePlayMouseClick = () => {
        const state = {...this.state};
        const {sfx} = state;
        const {mouseClick} = sfx;

        if(mouseClick.play){
            mouseClick.audio.pause();
            state.sfx.mouseClick.play = false;
            this.setState(state);
        }else{
            mouseClick.audio.play();
            state.sfx.mouseClick.play = true;
            this.setState(state);
        }
    }

    handlePrevent = () => {
        const newState = {...this.state};
        const {target} = this.props;
        let newTarget = this.props.target;

        if (target > 0) {
            newTarget = eval(target) - 1;
            newState.direction = "left";
            newState.cssClassCenter = "centerFromRight";
        }

        if (newTarget != target) {
            this.setState(newState);
            this.props.updateTarget(newTarget);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const oldTarget = eval(prevProps.target);
        const newTarget = eval(this.props.target);

        if (newTarget !== oldTarget) {

            const newState = {...this.state};

            if (newTarget > oldTarget) {
                newState.direction = "right";
                newState.cssClassCenter = "centerFromRight";
            } else if (newTarget < oldTarget) {
                newState.direction = "left";
                newState.cssClassCenter = "centerFromLeft";
            }

            this.setState(newState);
        }

    }

    handleNext = () => {
        const newState = {...this.state};
        const nItems = Object.keys(this.props.items).length;
        const {target} = this.props;
        let newTarget = this.props.target;

        if (target < nItems - 1) {
            newTarget = eval(target) + 1;
            newState.direction = "right";
            newState.cssClassCenter = "centerFromLeft";
        }
        this.setState(newState);
        if (newTarget != this.props.target) {
            this.props.updateTarget(newTarget);
        }
    }

    handleSelectItem = (e) => {

        const key = eval(e.target.name);

        const target = this.props.target;
        let newTarget = this.props.target;
        const newState = {...this.state};

        if (key > target) {
            newTarget = key;
            newState.direction = "right";
            newState.cssClassCenter = "centerFromRight";
        } else if (key < target) {
            newTarget = key;
            newState.direction = "left";
            newState.cssClassCenter = "centerFromLeft";
        }

        if (key !== target) {
            this.setState(newState);
            this.props.updateTarget(newTarget);
        }
    }

    firstCharUppercase = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    itemMouseEnter = () => {
        this.togglePlayMouseEnter();

        const state = {...this.state};
        state.style.titleAnimation = "title-enter";
        state.style.imageAnimation = "carousel-item-image-enter";
        this.setState(state);
    }

    itemMouseLeave = () => {
        // this.togglePlayMouseLeave();

        const state = {...this.state};
        state.style.titleAnimation = "title-leave";
        state.style.imageAnimation = "carousel-item-image-leave";
        this.setState(state);
    }

    itemOnClick = (e) => {
        e.preventDefault();
        this.togglePlayMouseClick();

        const key = e.target.getAttribute('name');
        const {items} = this.props;
        if(items[key] != undefined){
            items[key].onClick();
        }
    }

    renderItems() {

        const {cssClassCenter, direction, style} = this.state;
        const {titleAnimation, imageAnimation} = style;
        const {items, target} = this.props;
        if (items != undefined && items != null) {

            const itemsKeys = Object.keys(items);
            return itemsKeys.map((key) => {

                let cssClassCenterRender = cssClassCenter;

                if (eval(target) === (eval(key) - 1) && direction === "left") {
                    cssClassCenterRender = "left";
                } else if (eval(target) === (eval(key) + 1) && direction === "right") {
                    cssClassCenterRender = "right";
                } else if (eval(target) !== eval(key)) {
                    cssClassCenterRender = "d-none";
                }

                const item = items[key];

                return (
                    <div
                        key={key}
                        name={key}
                        className={`cursorPointer ${cssClassCenterRender} carousel-item-image ${imageAnimation}`}
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                        onMouseEnter={this.itemMouseEnter}
                        onMouseLeave={this.itemMouseLeave}
                        onClick={this.itemOnClick}
                    >
                        <div
                            className={`title text-center p-2 ${titleAnimation}`}
                            onClick={item.onClick}
                        >
                            {this.firstCharUppercase(item.title)}
                            <div>
                                {this.renderDate(item.dateStart)}
                                {this.renderDate(item.dateEnd)}
                            </div>
                            <div>
                                {this.renderDescription(item.description)}
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    renderDate(date) {
        if (date instanceof Date) {
            return (
                <span className={"badge badge-secondary ml-2 mr-2"}>
                    {date.getFullYear()}
                </span>
            );
        }
    }

    renderDescription(description) {
        if (description) {
            return (
                <div>
                    {description}
                </div>
            );
        }
    }

    renderAllButtonItem() {
        const {items, target} = this.props;
        if (items != undefined && items != null) {

            const itemsKeys = Object.keys(items);

            return itemsKeys.map((key) => {
                let targeted = "";
                if (eval(target) === eval(key)) {
                    targeted = "targeted";
                }
                return (
                    <button
                        key={key}
                        className={`btn btn-dark rounded-circle mt-2 ml-1 mr-1 pt-2 pb-2 pl-2 pr-2 ${targeted}`}
                        name={key}
                        onClick={this.handleSelectItem}
                    >
                        {""}
                    </button>
                );
            });
        }
    }

    renderCarousel() {
        if (this.props.items.length > 0) {
            return (
                <div className={"carousel"}>

                    {this.renderItems()}

                    <div className={"item-buttons p-0"}>
                        <div className={"clearfix m-0 p-0"}>

                            <button
                                className={"btn btn-dark rounded-circle float-left mt-2 mb-2 ml-2 pt-0 pb-0 pl-1 pr-1"}
                                onClick={this.handlePrevent}>
                                <TiArrowBackOutline style={{
                                    marginTop: "-10px"
                                }}/>
                            </button>

                            {this.renderAllButtonItem()}

                            <button
                                className={"btn btn-dark rounded-circle float-right mt-2 mb-2 mr-2 pt-0 pb-0 pl-1 pr-1"}
                                onClick={this.handleNext}>
                                <TiArrowForwardOutline style={{
                                    marginTop: "-10px"
                                }}/>
                            </button>

                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className={"container-fluid"}>
                {this.renderCarousel()}
            </div>
        );
    }
}

export default Carousel;