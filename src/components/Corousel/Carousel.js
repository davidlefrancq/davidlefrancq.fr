import React, {Component, Fragment} from 'react';
import "./carousel.css";
import {TiArrowBackOutline, TiArrowForwardOutline} from "react-icons/ti";

class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            direction: null,
            lastTarget: null,
            style: {
                titleAnimation: "",
                imageAnimation: "",
                itemButtons: "item-buttons",
            },
            sfx: {
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

        mouseEnter.audio.addEventListener('ended', () => {
            state.sfx.mouseEnter.play = false;
            this.setState(state);
        });

        mouseLeave.audio.addEventListener('ended', () => {
            state.sfx.mouseLeave.play = false;
            this.setState(state);
        });

        mouseClick.audio.addEventListener('ended', () => {
            state.sfx.mouseClick.play = false;
            this.setState(state);
        });
    }

    componentWillUnmount() {
        const {mouseEnter, mouseLeave, mouseClick} = this.state.sfx;

        mouseEnter.audio.addEventListener('ended', () => {
            const state = {...this.state};
            state.sfx.mouseEnter.play = false;
            this.setState(state);
        });

        mouseLeave.audio.addEventListener('ended', () => {
            const state = {...this.state};
            state.sfx.mouseLeave.play = false;
            this.setState(state);
        });

        mouseClick.audio.addEventListener('ended', () => {
            const state = {...this.state};
            state.sfx.mouseClick.play = false;
            this.setState(state);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


        // let displayedChanged = false;
        // let resetItemButtons = false;
        //
        // if (prevProps.displayed == null) {
        //     if (this.props.displayed != null) {
        //         displayedChanged = true;
        //         resetItemButtons = true;
        //     }
        // }
        //
        // if (prevProps.displayed != null) {
        //
        //     if (this.props.displayed == null) {
        //         displayedChanged = true;
        //         resetItemButtons = true;
        //     }
        //
        //     if (prevProps.displayed.dateEnd != null) {
        //         if (this.props.displayed != null) {
        //             if (this.props.displayed.dateEnd != null) {
        //                 if (prevProps.displayed.dateEnd != this.props.displayed.dateEnd) {
        //
        //                     console.log(prevProps.displayed.dateEnd);
        //                     console.log(this.props.displayed.dateEnd);
        //                     console.log([prevProps.target,this.props.target]);
        //
        //                     displayedChanged = true;
        //                     if(prevProps.target == this.props.target){
        //                         resetItemButtons = true;
        //                     }
        //                 }
        //             }
        //         }else{
        //             resetItemButtons = true;
        //         }
        //     }
        // }
        //
        //
        // if (displayedChanged) {
        //     if (resetItemButtons) {
        //         this.itemButtonsUnselected();
        //     } else {
        //         this.itemButtonsSelected();
        //     }
        // }

        // console.log(["props", prevProps, this.props]);
        // console.log(["state", prevState, this.state]);
        // console.log(["snapshot",snapshot]);


        const oldTarget = eval(prevProps.target);
        const newTarget = eval(this.props.target);

        if (newTarget !== oldTarget) {
            if (newTarget > oldTarget) {
                this.setRightDirection();
            } else if (newTarget < oldTarget) {
                this.setLeftDirection();
            }
        }

    }

    togglePlayMouseEnter = () => {
        const state = {...this.state};
        const {sfx} = state;
        const {mouseEnter} = sfx;

        if (mouseEnter.play) {
            mouseEnter.audio.pause();
            state.sfx.mouseEnter.play = false;
            this.setState(state);
        } else {
            mouseEnter.audio.play();
            state.sfx.mouseEnter.play = true;
            this.setState(state);
        }
    }

    togglePlayMouseLeave = () => {
        const state = {...this.state};
        const {sfx} = state;
        const {mouseLeave} = sfx;

        if (mouseLeave.play) {
            mouseLeave.audio.pause();
            state.sfx.mouseLeave.play = false;
            this.setState(state);
        } else {
            mouseLeave.audio.play();
            state.sfx.mouseLeave.play = true;
            this.setState(state);
        }
    }

    togglePlayMouseClick = () => {
        const state = {...this.state};
        const {sfx} = state;
        const {mouseClick} = sfx;

        if (mouseClick.play) {
            mouseClick.audio.pause();
            state.sfx.mouseClick.play = false;
            this.setState(state);
        } else {
            mouseClick.audio.play();
            state.sfx.mouseClick.play = true;
            this.setState(state);
        }
    }

    handlePrevent = () => {
        const state = {...this.state};
        const {target} = this.props;
        let newTarget = this.props.target;

        if (target > 0) {
            newTarget = eval(target) - 1;
            this.setLeftDirection();
        }

        if (eval(newTarget) != eval(target)) {
            state.lastTarget = target;
            this.setState(state);
            // this.itemButtonsSelected();
            this.props.updateTarget(newTarget);
        }
    }

    handleNext = () => {
        const state = {...this.state};
        const nItems = Object.keys(this.props.items).length;
        const target = eval(this.props.target);
        let newTarget = eval(this.props.target);

        if (target < nItems - 1) {
            newTarget = target + 1;
            this.setRightDirection();
        }

        if (newTarget != target) {
            state.lastTarget = target;
            this.setState(state);
            // this.itemButtonsSelected();
            this.props.updateTarget(newTarget);
        }
    }

    handleSelectItem = (e) => {

        const key = eval(e.target.name);

        const target = eval(this.props.target);
        let newTarget = eval(this.props.target);
        const state = {...this.state};

        if (key > target) {
            newTarget = key;
            this.setRightDirection();
        } else if (key < target) {
            newTarget = key;
            this.setLeftDirection();
        }

        if (key !== target) {
            state.lastTarget = target;
            this.setState(state);
            this.props.updateTarget(newTarget);
        }
    }

    setLeftDirection() {
        const state = {...this.state};
        state.direction = "left";
        state.style.itemButtons = "item-buttons-selected"
        this.setState(state);
    }

    setRightDirection() {
        const state = {...this.state};
        state.direction = "right";
        state.style.itemButtons = "item-buttons-selected"
        this.setState(state);
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
        if (items[key] != undefined && items[key] != null) {
            items[key].onClick();
        }
    }

    itemButtonsSelected() {
        const state = {...this.state};
        if(state.style.itemButtons != "item-buttons-selected"){
            state.style.itemButtons = "item-buttons-selected";
            this.setState(state);
        }
    }

    itemButtonsUnselected() {
        const state = {...this.state};
        if(state.style.itemButtons != "item-buttons"){
            state.style.itemButtons = "item-buttons";
            this.setState(state);
        }
    }

    renderItems() {

        const {direction, style} = this.state;
        const {titleAnimation, imageAnimation} = style;
        const {items, target} = this.props;

        const itemsKeys = Object.keys(items);
        if (itemsKeys.length > 0) {
            return itemsKeys.map((key) => {
                if (key == target) {
                    const item = items[key];

                    let cssClassItem = this.getCssClassItem(target, key);
                    let itemImageCss = this.getItemImageCss(item);

                    let imageBackground = `url(default-background.jpg)`;
                    if (item.image != null) {
                        imageBackground = `url(${item.image})`;
                    }

                    return (
                        <div
                            key={key}
                            name={key}
                            className={`cursorPointer ${cssClassItem} ${itemImageCss} ${imageAnimation}`}
                            style={{
                                backgroundImage: imageBackground,
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
                }
            });
        }
    }

    getCssClassItem(target, key) {

        const {direction} = this.state;
        let css = "hidden"

        if (direction === "left") {
            css = "rightToCenter";
            this.resetDirection();
        } else if (direction === "right") {
            css = "leftToCenter";
            this.resetDirection();
        } else if (eval(target) === eval(key)) {
            css = "center";
        } else {
            this.itemButtonsUnselected();
        }

        return css;
    }

    resetDirection() {
        setTimeout(() => {
            const state = {...this.state}
            state.direction = null;
            this.setState(state);
        }, 200);
    }


    getItemImageCss(item) {
        let itemImageCss = "carousel-item-image";
        const itemDisplayed = this.props.displayed;
        if (itemDisplayed != undefined && itemDisplayed != null) {
            const title1 = '' + item.title;
            const title2 = '' + itemDisplayed.title;
            if (title1.localeCompare(title2, 'fr', {sensitivity: 'variant'}) == 0) {
                itemImageCss = "carousel-item-image-selected";
                this.itemButtonsSelected();
            }
        }

        if(itemImageCss == "carousel-item-image"){
            this.itemButtonsUnselected();
        }

        return itemImageCss;
    }

    renderDate(date) {
        if (date instanceof Date) {
            return (
                <span className={"badgeTitle"}>
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

    getBackgroundImageLastItem() {
        const {lastTarget} = this.state;
        let backgroundImage = "";

        if (lastTarget != null) {
            const item = this.props.items[lastTarget];
            backgroundImage = item.image;
        }

        return backgroundImage;
    }

    renderCarousel() {
        const {length} = this.props.items;
        if (length > 0) {
            const backgroundImage = this.getBackgroundImageLastItem();
            return (
                <div className={"carousel"}
                     style={{
                         backgroundImage: `url(${backgroundImage})`,
                         backgroundRepeat: "no-repeat",
                         backgroundPosition: "center",
                         backgroundSize: "cover",
                     }}
                >

                    {this.renderItems()}

                    <div className={`${this.state.style.itemButtons} p-0`}>
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