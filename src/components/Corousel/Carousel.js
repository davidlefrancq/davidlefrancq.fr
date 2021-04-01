import React, {Component, Fragment} from 'react';
import "./carousel.css";
import {TiArrowBackOutline, TiArrowForwardOutline} from "react-icons/ti";

class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            enableComponentDidUpdate:true,
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

        document.addEventListener("click",()=>{this.actualizeImageAnimation()});

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

        if(this.state.enableComponentDidUpdate){
            const oldTarget = eval(prevProps.selected);
            const newTarget = eval(this.props.selected);

            if (newTarget !== oldTarget) {
                if (newTarget > oldTarget) {
                    // this.setRightDirection();
                } else if (newTarget < oldTarget) {
                    // this.setLeftDirection();
                }
            }
        }else{
            this.activateComponentDidUpdate();
        }
    }

    togglePlayMouseEnter = () => {
        const state = {...this.state};
        const setState = this.setState;
        const {sfx} = state;
        const {mouseEnter} = sfx;

        if (mouseEnter.play) {
            mouseEnter.audio.pause();
            state.sfx.mouseEnter.play = false;
            this.setState(state);
        } else {
            let playPromise = mouseEnter.audio.play();
            playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                    // console.log("audio played auto");

                    state.sfx.mouseEnter.play = true;
                    setState(state);
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    // console.log("playback prevented",error);
                });
        }
    }

    togglePlayMouseLeave = () => {
        const state = {...this.state};
        const setState = this.setState;
        const {sfx} = state;
        const {mouseLeave} = sfx;

        if (mouseLeave.play) {
            mouseLeave.audio.pause();
            state.sfx.mouseLeave.play = false;
            this.setState(state);
        } else {
            mouseLeave.audio.play();
            let playPromise = mouseLeave.audio.play();
            playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                    // console.log("audio played auto");

                    state.sfx.mouseLeave.play = true;
                    setState(state);
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    // console.log("playback prevented",error);
                });


        }
    }

    togglePlayMouseClick = () => {
        const state = {...this.state};
        const {sfx} = state;
        const {mouseClick} = sfx;

        if (mouseClick.play) {
            // mouseClick.audio.pause();
            // state.sfx.mouseClick.play = false;
            // this.setState(state);
        } else {
            mouseClick.audio.play();
            state.sfx.mouseClick.play = true;
            this.setState(state);
        }
    }

    handlePrevent = () => {
        this.togglePlayMouseClick();

        const target = eval(this.props.selected);
        let newTarget = eval(this.props.selected);

        if (target > 0) {
            newTarget = target - 1;
            this.setLeftDirection();
        }else{
            const nItems = Object.keys(this.props.items).length - 1;
            newTarget = nItems;
        }

        if (newTarget !== target) {
            this.setLastTarget(target)
            this.props.prevent(newTarget);
        }
    }

    setLastTarget(target){
        const state = {...this.state};
        state.lastTarget = target;
        this.setState(state);
    }

    activateComponentDidUpdate = () => {
        const state = {...this.state};
        state.enableComponentDidUpdate = true;
        this.setState(state);
    }
    deactivateComponentDidUpdate = () => {
        const state = {...this.state};
        state.enableComponentDidUpdate = false;
        this.setState(state);
    }

    handleNext = () => {
        this.togglePlayMouseClick();

        const target = eval(this.props.selected);
        let newTarget = eval(this.props.selected);

        const nItems = Object.keys(this.props.items).length;

        if (target < (nItems - 1)) {
            newTarget = target + 1;
            // this.setRightDirection();
        }else{
            newTarget = 0;
            // this.setLeftDirection();
        }

        if (newTarget !== target) {
            this.deactivateComponentDidUpdate();
            this.setLastTarget(target);
            this.props.next(newTarget);
        }
    }

    handleSelectItem = (e) => {

        const target = eval(this.props.selected);
        let newTarget = eval(this.props.selected);

        const key = eval(e.target.name);
        if (key > target) {
            newTarget = key;
            // this.setRightDirection();
        } else if (key < target) {
            newTarget = key;
            // this.setLeftDirection();
        }

        if (key !== target) {
            this.setLastTarget(target);

            if(newTarget > target){
                this.props.next(newTarget);
            }else{
                this.props.prevent(newTarget);
            }
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

    itemMouseEnter = (e) => {

        let startSound = this.isNotElementInMovement(e);
        if(startSound){
            this.togglePlayMouseEnter();
        }

        const state = {...this.state};
        state.style.titleAnimation = "title-enter";
        state.style.imageAnimation = "carousel-item-image-enter";
        this.setState(state);
    }

    isNotElementInMovement(e){
        let isMouved = true;
        if(e){
            const target = e.target.getAttribute("name");
            if(target !== undefined && target !== null){
                let cssClassItem = this.getCssClassItem(eval(target));
                if(cssClassItem === "center"){
                    isMouved = false;
                }
            }
        }
        return !isMouved;
    }

    itemMouseLeave = () => {
        // this.togglePlayMouseLeave();

        const state = {...this.state};
        state.style.titleAnimation = "title-leave";
        if(!this.props.actived){
            state.style.imageAnimation = "carousel-item-image-leave";
        }
        this.setState(state);
    }

    actualizeImageAnimation(){
        if(!this.props.actived){
            const state = {...this.state};
            state.style.imageAnimation = "";
            this.setState(state);
        }
    }

    itemOnClick = (e) => {
        e.preventDefault();
        this.togglePlayMouseClick();

        // const key = e.target.getAttribute('name');
        // const {items} = this.props;
        // if (items[key] !== undefined && items[key] !== null) {
        //     items[key].onClick();
        // }
        this.handleNext();
    }

    // itemButtonsSelected = () => {
    //     const state = {...this.state};
    //     if(state.style.itemButtons != "item-buttons-selected"){
    //         state.style.itemButtons = "item-buttons-selected";
    //         this.setState(state);
    //     }
    // }
    //
    // itemButtonsUnselected = () => {
    //     const state = {...this.state};
    //     if(state.style.itemButtons != "item-buttons"){
    //         state.style.itemButtons = "item-buttons";
    //         this.setState(state);
    //     }
    // }

    renderItems() {

        const {direction, style} = this.state;
        const {titleAnimation, imageAnimation} = style;
        const {items, selected} = this.props;
        // const itemButtonsUnselected = this.itemButtonsUnselected;
        // const itemButtonsSelected = this.itemButtonsSelected;

        const itemsKeys = Object.keys(items);
        if (itemsKeys.length > 0) {
            return itemsKeys.map((key) => {
                if (eval(key) === eval(selected)) {
                    const item = items[key];

                    let cssClassItem = this.getCssClassItem(key);
                    let itemImageCss = this.getItemImageCss(item);

                    // if(itemImageCss === "carousel-item-image"){
                    //     itemButtonsUnselected();
                    // }else if(itemImageCss === "carousel-item-image-selected"){
                    //     itemButtonsSelected();
                    // }


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

    getCssClassItem(key) {

        const {direction} = this.state;
        let css = "hidden"

        if (direction === "left") {
            css = "rightToCenter";
            this.resetDirection();
        } else if (direction === "right") {
            css = "leftToCenter";
            this.resetDirection();
        } else if (eval(key) === eval(this.props.selected)) {
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
        const itemDisplayed = this.props.items[this.props.selected];
        if (itemDisplayed !== undefined && itemDisplayed !== null) {
            const title1 = '' + item.title;
            const title2 = '' + itemDisplayed.title;
            if (title1.localeCompare(title2, 'fr', {sensitivity: 'variant'}) === 0 && this.props.actived) {
                itemImageCss = "carousel-item-image-selected";
            }
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
        const {items, selected, actived} = this.props;
        if (items !== undefined && items !== null) {

            const itemsKeys = Object.keys(items);
            return itemsKeys.map((key) => {
                let targeted = "";

                if (eval(selected) === eval(key) && actived) {
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