import React, {Component, Fragment} from 'react';
import "./progressBar.css";
import Step from "../../bo/Step";

class ProgressBar extends Component {

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
        let {target} = {...this.state};
        const step = steps[id];
        step.active = !step.active;

        this.actualiseStepBeforeActive(id, steps);

        this.setState({
            steps,
            target: eval(id),
        });
        step.action(e);
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

        return stepsKeys.map((key) => {

            const step = steps[key];

            let classActive = "";
            if (step.active == true) {
                classActive = "active";
            }

            return (
                <li key={key} id={key} className={"col " + classActive} onClick={this.handleStep}>
                    {step.title}
                    {/*<div className={"link " + classActive}></div>*/}
                    <div className={"link"}></div>
                    <div className={"link-active"}></div>

                </li>
            );
        });

    }

    renderButtons() {

        return (
            <div className={"clearfix"}>
                {this.renderButtonBefore()}
                {this.renderButtonAfter()}
            </div>
        );
    }

    renderButtonBefore() {

        const {steps, target} = this.state;
        let before = -1;

        if (steps[target - 1] != undefined && steps[target - 1] != null) {
            before = target - 1;
        }

        if (before >= 0) {
            return (
                <button id={before} className={"btn btn-secondary float-left"} onClick={this.handleStep}>{'Précédent'}</button>
            );
        } else {
            // return (
            //     <button className={"btn btn-light float-left"} disabled>{"Précédent"}</button>
            // );
        }
    }

    renderButtonAfter() {
        const {steps, target} = this.state;
        let after = -1;


        if (steps[target + 1] != undefined && steps[target + 1] != null) {
            after = target + 1;
        }

        if (after > target) {
            return (
                <button id={after} className={"btn btn-success float-right"} onClick={this.handleStep}>{'Suivant'}</button>
            );
        } else {
            // return (
            //     <button className={"btn btn-light m-1 float-right"} disabled>{'Suivant'}</button>
            // );
        }
    }

    render() {
        return (
            <div className={"container"}>

                <ul className={"progressbar row"}>
                    {this.renderSteps()}
                </ul>

                {this.renderButtons()}

            </div>
        );
    }
}

export default ProgressBar;