import React, {Component, Fragment} from 'react';
import "./dateBar.css";
import Step from "../../bo/Step";
import {actions} from "../../actions";
import {connect} from "react-redux";

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

        const listKeys = Object.keys(list);

        const steps = listKeys.map((key) => {

            const item = list[key];
            const {title, description, action} = item

            const newStepObject = new Step(title, description)

            if (action != undefined && action != null) {
                newStepObject.action = action;
            }

            return newStepObject;
        });

        if (steps[0]) {
            steps[0].active = true;
        }

        this.setState({
            steps,
        });
    }

    handleStep(e) {

        const {id} = e.target;
        const {steps} = {...this.state};
        const step = steps[id];
        const fullYear = step.title;

        this.props.setOccurencesDateTargeted(fullYear);

        step.active = !step.active;
        this.actualiseStepBeforeActive(id, steps);
        const newState = {
            steps,
            target: eval(id),
        };

        this.updateOccurencesSelected(fullYear);

        this.setState(newState);

        step.onClick(e);
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

    getNewIdToFullYear(occurences, fullYear) {

        const occurencesKeys = Object.keys(occurences);
        let newId = null;

        occurencesKeys.map((key) => {
            if (newId === null) {
                const occurence = occurences[key];
                const dateControl = new Date(this.getDateControl(occurence)).getFullYear();

                if (dateControl != undefined && dateControl != null) {
                    if (eval(dateControl) === eval(fullYear)) {
                        newId = key;
                    }
                }
            }
        });

        return newId;
    }

    getDateControl(occurence) {

        const {dateStart, dateEnd} = occurence;
        let dateControl = null;

        if (dateStart != undefined && dateStart != null && dateStart !== "") {

            if(dateStart instanceof Date){
                dateControl = dateStart.getFullYear();
            }else{
                dateControl = dateStart;
            }
        }

        if (dateEnd != undefined && dateEnd != null && dateEnd !== "") {

            if(dateEnd instanceof Date){
                dateControl = dateEnd.getFullYear();
            }else{
                dateControl = dateEnd;
            }
        }

        return dateControl;
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

    renderSteps() {

        const {steps} = this.state;
        const stepsKeys = Object.keys(steps);

        if (steps[0]) {
            return stepsKeys.map((key) => {

                const step = steps[key];

                let classActive = "";
                if (step.active == true) {
                    classActive = "active";
                }

                return (
                    <li key={key} className={"col " + classActive}>
                        <div
                            id={key}
                            className={"title"}
                            onClick={this.handleStep}
                            style={{cursor: "pointer"}}
                        >
                            {step.title}
                        </div>

                        {step.description}
                        <div className={"link"}></div>
                        <div className={"link-active"}></div>
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