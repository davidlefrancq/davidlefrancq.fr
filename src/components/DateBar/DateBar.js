import React, {Component} from 'react';
import "./dateBar.css";
import DateBareStep from "./bo/DateBareStep";

class DateBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            steps: [],
            target: 0,
        };

        this.isWorking = false;
    }

    componentDidMount() {
        let data = {};

        const {steps} = this.props;
        if (steps instanceof Object) {
            data = steps;
        }

        this.initStep(data);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const prevYear = prevProps.year;
        const {year} = this.props;

        if (prevYear != year && this.isWorking == false) {
            if (year != this.state.steps[this.state.target].title) {

                let newTarget = null;

                const keys = Object.keys(this.state.steps);
                keys.map((key)=>{

                    const step = this.state.steps[key];
                    if(step.title == year){
                        newTarget = key;
                    }

                });

                if(newTarget != null){
                    this.activeStep(newTarget)
                }
            }
        }


    }

    initStep(list) {

        const listSorted = this.stepsSort(list);
        const state = {...this.state};

        const listKeys = Object.keys(listSorted);
        let steps = listKeys.map((key) => {

            const item = listSorted[key];
            return this.instanciateStep(item);
        });

        const target = steps.length - 1;
        state.steps = steps;
        state.target = target;
        this.setState(state);

        setTimeout(() => {

            this.updateStep(target)

        }, 300);
    }

    instanciateStep(item) {

        const {title, description, action, onClick} = item
        let stepDateBare = null;

        if (item != undefined && item != null) {

            stepDateBare = new DateBareStep(title, description);
            stepDateBare.onClick = onClick;

            if (action != undefined && action != null) {
                stepDateBare.action = action;
            }

            stepDateBare.active = true;
            stepDateBare.animation.end = false;
        }

        return stepDateBare;
    }

    handleStep = (e) => {
        this.isWorking = true;
        const id = eval(e.target.getAttribute("name"));
        this.updateStep(id);
    }

    updateStep = (target) => {

        this.activeStep(target);

        const {steps} = {...this.state};
        const step = steps[target];
        step.onClick(step.title);
    }


    activeStep = (target) => {
        if (eval(target) > eval(this.state.target)) {
            this.animateSteps(target).then(() => {
                const state = {...this.state};
                state.target = target;
                this.setState(state);
                this.isWorking = false;
            });
        } else if (eval(target) < eval(this.state.target)) {
            this.animateStepsReverted(target).then(() => {
                const state = {...this.state};
                state.target = target;
                this.setState(state);
                this.isWorking = false;
            });
        }
    }

    animateSteps(target) {
        return new Promise(async (resolve, reject) => {
            let position = 0;

            while (await this.animateStep(position)) {

                position++;

                if (position > target) {
                    resolve();
                    break;
                }
            }
        });
    }

    animateStep = (target) => {
        return new Promise((resolve, reject) => {

            const state = {...this.state};
            const {steps} = state;
            if (steps[target]) {

                const step = steps[target];
                step.active = true;
                this.setState(state);

                // Timeout pour laisser l'animation css se terminer
                const t = step.animation.duration;
                setTimeout(() => {
                    resolve(true);
                }, t);

            } else {
                reject(false);
            }
        });
    }


    animateStepsReverted(target) {
        return new Promise(async (resolve, reject) => {
            const {steps} = this.state;
            const keys = Object.keys(steps).reverse();
            let position = (keys.length - 1);

            while (await this.animateStepReverted(position)) {

                position--;

                if (position <= target) {
                    resolve();
                    break;
                }
            }
        });
    }

    animateStepReverted = (target) => {
        return new Promise((resolve, reject) => {

            const state = {...this.state};
            const {steps} = state;
            if (steps[target]) {

                const step = steps[target];
                step.active = false;
                this.setState(state);

                // Timeout pour laisser l'animation css se terminer
                const t = step.animation.duration;
                setTimeout(() => {
                    resolve(true);
                }, t);

            } else {
                reject(false);
            }
        });
    }

    actualiseStepBeforeActive(idActive, steps) {
        const stepsKeys = Object.keys(steps);
        stepsKeys.map((key) => {
            if (key > idActive) {
                steps[key].active = false;
            } else {
                steps[key].active = true;
            }
        });
    }

    itemMouseEnter = (e) => {
        const key = eval(e.target.getAttribute("name"));
        if (key != undefined && key != null) {

            const state = {...this.state};

            this.resetAllStepAnimation(state);

            state.steps[key].animation.enter.active = true;
            state.steps[key].animation.leave.active = false;

            this.setState(state);
        }
    }

    itemMouseLeave = (e) => {
        const key = eval(e.target.getAttribute("name"));
        if (key != undefined && key != null) {

            const state = {...this.state};

            this.resetAllStepAnimation(state);

            state.steps[key].animation.leave.active = true;
            state.steps[key].animation.enter.active = false;

            this.setState(state);
        }
    }

    resetAllStepAnimation(state) {
        this.resetAllStepAnimationEnter(state);
        this.resetAllStepAnimationLeave(state);
    }

    resetAllStepAnimationEnter(state) {
        const keys = Object.keys(state.steps);
        keys.map((key) => {
            state.steps[key].animation.enter.active = false;
        });
    }

    resetAllStepAnimationLeave(state) {
        const keys = Object.keys(state.steps);
        keys.map((key) => {
            state.steps[key].animation.leave.active = false;
        });
    }

    renderSteps() {

        const {steps} = this.state;
        if (steps != undefined && steps != null && steps.length > 0) {

            const stepsKeys = Object.keys(steps);
            return stepsKeys.map((key) => {

                const step = steps[key];

                let liCssActive = "";
                let titleCssAnimation = "";

                // Bouton Actif
                if (step.active == true) {
                    liCssActive = step.animation.css.li;
                    titleCssAnimation = step.animation.css.title;
                }

                // Enter
                if (step.animation.enter.active == true) {
                    titleCssAnimation = step.animation.enter.css;
                }

                // Leave
                if (step.animation.leave.active == true) {
                    titleCssAnimation = step.animation.leave.css;
                }


                return (
                    <li
                        key={key}
                        name={key}
                        className={`${liCssActive}`}
                        // className={``}
                        onMouseEnter={this.itemMouseEnter}
                        onMouseLeave={this.itemMouseLeave}
                    >
                        <div
                            name={key}
                            className={`title ${titleCssAnimation}`}
                            // className={`title datebar-title-enter`}
                            onClick={this.handleStep}
                        >
                            {step.title}
                        </div>

                        {step.description}
                        <div className={"link d-none d-xl-block"}></div>
                        <div className={"link-active d-none d-xl-block"}></div>
                    </li>
                );
            });
        }
    }

    stepsSort(steps) {

        if (steps != undefined && steps != null) {
            return [].slice.call(steps).sort((a, b) => {
                const title1 = '' + a.title;
                const title2 = '' + b.title;
                return title1.localeCompare(title2);
            });
        }
    }


    render() {

        return (
            <div className={"container-fluid mt-0 mb-4"}>
                <ul className={"datebar row d-flex justify-content-center m-0 p-0"}>
                    {this.renderSteps()}
                </ul>
            </div>
        );
    }
}

export default DateBar;