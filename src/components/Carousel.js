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
        };
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

    renderItems() {

        const {cssClassCenter, direction} = this.state;
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
                        className={`${cssClassCenterRender}`}
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    >
                        <div
                            className={"title text-center p-2"}
                            onClick={item.onClick}
                        >
                            {item.title}
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

    render() {
        return (
            <div className={"container-fluid"}>
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
            </div>
        );
    }
}

export default Carousel;