import React, {Component} from 'react';
import {connect} from "react-redux";
import {actions} from "../../actions";
import Carousel from "./Carousel";
import Step from "../../bo/Step";

class CvCarousel extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const oldQualificationSeleted = eval(prevProps.qualificationSeleted);
        const newQualificationSeleted = eval(this.props.qualificationSeleted);

        const oldExperienceSelected = eval(prevProps.experienceSelected);
        const newExperienceSelected = eval(this.props.experienceSelected);

        if (oldQualificationSeleted !== newQualificationSeleted || oldExperienceSelected !== newExperienceSelected) {
            this.props.setOccurence(null);
        }
    }

    getItemsCarousel() {
        const items = [];
        let i = 0;

        const {occurences} = this.props;
        const occurencesKeys = Object.keys(occurences);
        occurencesKeys.map((key) => {

            const occurence = occurences[key];
            let title = "";
            let dateStart = null;
            let dateEnd = null;
            let description = "";

            if (occurence.experience instanceof Object) {
                title = occurence.experience.name;

                dateStart = occurence.dateStart ? occurence.dateStart : null;
                dateEnd = occurence.dateEnd ? occurence.dateEnd : null;
            }

            if (occurence.qualification instanceof Object) {
                title = occurence.qualification.name;
                dateEnd = occurence.dateEnd ? occurence.dateEnd : null;
            }

            const step = new Step(title, description, dateStart, dateEnd);
            step.onClick = () => {
                this.props.setOccurence(occurence);
            };
            items[i] = step;

            i++;
        });

        return items;
    }

    getTarget() {
        let target = 0;

        const {occurences} = this.props;
        const occurencesKeys = Object.keys(occurences);
        occurencesKeys.map((key) => {

            const occurence = occurences[key];

            if (occurence.experience instanceof Object) {
                target = this.props.experienceSelected;
            }

            if (occurence.qualification instanceof Object) {
                target = this.props.qualificationSeleted;
            }

        });

        return target;
    }

    updateTarget = (target) => {

        const {occurences} = this.props;
        const occurencesKeys = Object.keys(occurences);
        occurencesKeys.map((key) => {

            const occurence = occurences[key];

            if (occurence.experience instanceof Object) {
                this.props.setExperienceSelected(target);
            }

            if (occurence.qualification instanceof Object) {
                this.props.setQualificationSelected(target);
            }
        });
    }

    render() {
        return (
            <Carousel
                items={this.getItemsCarousel()}
                target={this.getTarget()}
                updateTarget={this.updateTarget}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const qualificationSeleted = state.QualificationReducer.selected;
    const experienceSelected = state.ExperienceReducer.selected;
    return {
        qualificationSeleted,
        experienceSelected,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setExperienceSelected: (id) => dispatch(actions.experience.setExperienceSelected(id)),
        setQualificationSelected: (id) => dispatch(actions.qualification.setQualificationSelected(id)),
        setOccurence: (occurence) => dispatch(actions.occurences.setOccurence(occurence)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CvCarousel);