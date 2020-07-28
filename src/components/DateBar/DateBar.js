import React, {Component, Fragment} from 'react';
import "./dateBar.css";
import {actions} from "../../actions";
import {connect} from "react-redux";
import DateBareStep from "./bo/DateBareStep";

class DateBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            steps: {},
            target: 0,
        };

        this.handleStep = this.handleStep.bind(this);
    }

    componentDidMount() {
        let data = {};
        const {steps} = this.props;

        if (steps instanceof Object) {
            data = steps;
        }

        this.initStep(data);
    }

    initStep(list) {

        const state = {...this.state};
        const listKeys = Object.keys(list);

        const steps = listKeys.map((key) => {

            const item = list[key];
            const {title, description, action} = item

            const newStepObject = new DateBareStep(title, description)

            if (action != undefined && action != null) {
                newStepObject.action = action;
            }

            return newStepObject;
        });

        if (steps[0]) {
            steps[0].active = true;
            steps[0].animation.end = true;
        }


        state.steps = steps;

        this.setState(state);
    }

    handleStep(e) {

        const {id} = e.target;
        const {steps} = {...this.state};
        const step = steps[id];
        const fullYear = step.title;

        this.props.setOccurencesDateTargeted(fullYear);
        this.updateOccurencesSelected(fullYear);

        // step.active = !step.active;
        // this.actualiseStepBeforeActive(id, steps);
        // const newState = {
        //     steps,
        //     target: eval(id),
        // };
        const target = eval(id);
        this.activeStep(target);

        // this.setState(newState);

        step.onClick(e);
    }

    activeStep = (target) => {
        if (target > this.state.target) {
            this.animateSteps(target).then(() => {
                const state = {...this.state};
                state.target = target;
                this.setState(state);
            });
        } else if (target < this.state.target) {
            this.animateStepsReverted(target).then(() => {
                const state = {...this.state};
                state.target = target;
                this.setState(state);
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

    updateOccurencesSelected(fullYear) {

        this.updateExperienceSelected(fullYear);
        this.updateQualificationSelected(fullYear);
    }

    updateExperienceSelected(fullYear) {

        const {experienceOccurences} = this.props;

        let newId = this.getNewIdToFullYear(experienceOccurences, fullYear);

        if (newId != null) {
            this.props.setExperienceSelected(newId)
        }
    }

    updateQualificationSelected(fullYear) {

        const {qualificationOccurences} = this.props;

        let newId = this.getNewIdToFullYear(qualificationOccurences, fullYear);

        if (newId != null) {
            this.props.setQualificationSelected(newId)
        }
    }

    getItemYear(occurences, fullYear) {

        let occurenceSelected = null;
        const date = new Date(`${fullYear}-01-01T00:00:00`);

        const occurencesKeys = Object.keys(occurences);
        occurencesKeys.map((key) => {

            const occurence = occurences[key];
            const dateOccurence = this.getDate(occurence);

            if (dateOccurence != undefined && dateOccurence != null) {

                const dateControl = dateOccurence.getFullYear();
                if (eval(dateControl) === eval(fullYear)) {

                    if (occurenceSelected == null) {
                        occurenceSelected = occurence;
                    } else {
                        const dateItem = this.getDate(occurence);
                        const dateControlSelected = this.getDate(occurenceSelected);

                        const diffControl = dateItem.getTime() - date.getTime();
                        const diffControlSelected = dateControlSelected.getTime() - date.getTime();

                        if (diffControlSelected > diffControl) {
                            // Ne rien faire
                        } else {
                            occurenceSelected = occurences[key];
                        }
                    }
                }
            }
        });

        return occurenceSelected;
    }

    getItemYearUpper(occurences, fullYear) {

        let occurenceSelected = null;
        const date = new Date(`${fullYear}-01-01T00:00:00`);

        const occurencesKeys = Object.keys(occurences);
        occurencesKeys.map((key) => {

            const occurence = occurences[key];
            const dateItem = this.getDate(occurence);

            if (dateItem != undefined && dateItem != null) {

                const diff = dateItem.getTime() - date.getTime();
                if (diff > 0) {

                    if (occurenceSelected == null) {

                        occurenceSelected = occurences[key];

                    } else {

                        const dateControlSelected = this.getDate(occurenceSelected);
                        const diffControl = dateItem.getTime() - date.getTime();
                        const diffControlSelected = dateControlSelected.getTime() - date.getTime();

                        if (diffControlSelected < diffControl) {
                            // Ne rien faire
                        } else {
                            occurenceSelected = occurences[key];
                        }
                    }
                }
            }
        });

        return occurenceSelected;
    }

    getItemYearLower(occurences, fullYear) {

        let occurenceSelected = null;
        const date = new Date(`${fullYear}-01-01T00:00:00`);

        const occurencesKeys = Object.keys(occurences);
        occurencesKeys.map((key) => {

            const occurence = occurences[key];
            const dateItem = this.getDate(occurence);

            if (dateItem != undefined && dateItem != null) {

                const diff = date.getTime() - dateItem.getTime();
                if (diff > 0) {

                    if (occurenceSelected == null) {

                        occurenceSelected = occurences[key];

                    } else {

                        const dateControlSelected = this.getDate(occurenceSelected);

                        const diffControl = date.getTime() - dateItem.getTime();
                        const diffControlSelected = date.getTime() - dateControlSelected.getTime();

                        if (diffControlSelected < diffControl) {
                            // Ne rien faire
                        } else {
                            occurenceSelected = occurences[key];
                        }
                    }
                }
            }
        });

        return occurenceSelected;
    }

    getNewIdToFullYear(occurences, fullYear) {

        let targetKey = null;

        const occurence = this.getOccurence(occurences, fullYear);
        if (occurence != null) {
            targetKey = this.getTargetKey(occurences, occurence)
        }

        return targetKey;
    }

    getOccurence(occurences, fullYear) {
        const {target} = this.props;
        const {date, oldDate} = target;

        let occurence = this.getItemYear(occurences, fullYear);
        if (occurence == null) {

            if (eval(date) < eval(oldDate)) {
                occurence = this.getItemYearUpper(occurences, fullYear);
            }

            if (oldDate == null || eval(date) > eval(oldDate)) {
                occurence = this.getItemYearLower(occurences, fullYear);
            }
        }

        return occurence;
    }

    getTargetKey(occurences, occurence) {

        let target = 0;
        const keys = Object.keys(occurences);
        keys.map((key) => {
            if (occurences[key].id == occurence.id) {
                target = key;
            }
        });

        return target;
    }

    getDate(occurence) {

        const {dateStart, dateEnd} = occurence;
        let date = null;

        if (dateStart != undefined && dateStart != null && dateStart !== "") {

            if (dateStart instanceof Date) {
                date = dateStart;
            } else {
                date = new Date(dateStart);
            }
        }

        if (dateEnd != undefined && dateEnd != null && dateEnd !== "") {

            if (dateEnd instanceof Date) {
                date = dateEnd;
            } else {
                date = new Date(dateEnd);
            }
        }

        return date;
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
        if (key != undefined && key != null && key != "") {

            const state = {...this.state};

            this.resetAllStepAnimation(state);

            state.steps[key].animation.enter.active = true;
            state.steps[key].animation.leave.active = false;

            this.setState(state);
        }
    }

    itemMouseLeave = (e) => {
        const key = eval(e.target.getAttribute("name"));
        if (key != undefined && key != null && key != "") {

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

        const {steps, style} = this.state;
        //const {animations} = style;
        const stepsKeys = Object.keys(steps);

        if (steps) {
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
                        className={`col ${liCssActive}`}
                        onMouseEnter={this.itemMouseEnter}
                        onMouseLeave={this.itemMouseLeave}
                    >
                        <div
                            id={key}
                            className={`title ${titleCssAnimation}`}
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

    renderButtonBefore() {

        const {steps, target} = this.state;
        let before = -1;

        if (steps[0]) {

            if (steps[target - 1] != undefined && steps[target - 1] != null) {
                before = target - 1;
            }

            if (before >= 0) {
                return (
                    <button id={before} className={"btn btn-light m-1"} onClick={this.handleStep}>{'<<'}</button>
                );
            } else {
                return (
                    <button className={"btn btn-light m-1"} disabled>{'<<'}</button>
                );
            }
        }
    }

    renderButtonAfter() {
        const {steps, target} = this.state;
        let after = -1;

        if (steps[0]) {

            if (steps[target + 1] != undefined && steps[target + 1] != null) {
                after = target + 1;
            }

            if (after > target) {
                return (
                    <button id={after} className={"btn btn-light m-1"} onClick={this.handleStep}>{'>>'}</button>
                );
            } else {
                return (
                    <button className={"btn btn-light m-1"} disabled>{'>>'}</button>
                );
            }
        }
    }

    render() {

        return (
            <div className={"container mt-0 mb-4"}>

                <div className={"row p-0"}>

                    <div className={"col-1 text-left pt-2 pl-0 pr-0 pb-0 m-0"}>
                        {/*{this.renderButtonBefore()}*/}
                    </div>

                    <div className={"col-10 m-0 p-0"}>
                        <ul className={"datebar row m-0 p-0"}>
                            {this.renderSteps()}
                        </ul>
                    </div>

                    <div className={"col-1 text-right pt-2 pl-0 pr-0 pb-0 m-0"}>
                        {/*{this.renderButtonAfter()}*/}
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {target} = state.OccurencesReducer;
    const qualificationOccurences = state.QualificationReducer.occurences;
    const qualificationSeleted = state.QualificationReducer.selected;
    const experienceOccurences = state.ExperienceReducer.occurences;
    const experienceSelected = state.ExperienceReducer.selected;
    const {occurences} = state.OccurencesReducer;
    return {
        target,
        qualificationOccurences,
        qualificationSeleted,
        experienceOccurences,
        experienceSelected,
        occurences,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        setQualificationSelected: (id) => dispatch(actions.qualification.setQualificationSelected(id)),
        setExperienceSelected: (id) => dispatch(actions.experience.setExperienceSelected(id)),
        setOccurencesDateTargeted: (date) => dispatch(actions.occurences.setOccurencesDateTargeted(date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateBar);