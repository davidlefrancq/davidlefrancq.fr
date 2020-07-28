import React, {Component} from 'react';
import {connect} from "react-redux";
import {actions} from "../../actions";
import Carousel from "./Carousel";
import Step from "../../bo/Step";
import {SERVER_API} from "../../utils/urls";

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
            this.props.setOccurrence(null);
        }
    }

    getItemsCarousel() {
        const items = [];
        let i = 0;

        const {occurrences} = this.props;
        const occurrencesKeys = Object.keys(occurrences);
        occurrencesKeys.map((key) => {

            const occurrence = occurrences[key];
            let title = "";
            let dateStart = null;
            let dateEnd = null;
            let description = "";
            let image = null;

            if (occurrence.experience instanceof Object) {
                title = occurrence.experience.name;

                dateStart = occurrence.dateStart ? occurrence.dateStart : null;
                dateEnd = occurrence.dateEnd ? occurrence.dateEnd : null;

                if(occurrence.experience.img){
                    image = occurrence.experience.img;
                }
            }

            if (occurrence.qualification instanceof Object) {
                title = occurrence.qualification.name;
                dateEnd = occurrence.dateEnd ? occurrence.dateEnd : null;
                if(occurrence.qualification.img){
                    image = occurrence.qualification.img;
                }
            }

            const step = new Step(title, description, dateStart, dateEnd);
            if(image){
                step.image = `${SERVER_API}${image}`;
            }
            step.onClick = () => {
                this.props.setOccurrence(occurrence);
            };
            items[i] = step;

            i++;
        });

        return items;
    }

    getTarget() {
        let target = 0;

        const {occurrences} = this.props;
        const occurrencesKeys = Object.keys(occurrences);
        occurrencesKeys.map((key) => {

            const occurrence = occurrences[key];

            if (occurrence.experience instanceof Object) {
                target = this.props.experienceSelected;
            }

            if (occurrence.qualification instanceof Object) {
                target = this.props.qualificationSeleted;
            }

        });

        return target;
    }

    updateTarget = (target) => {

        const {occurrences} = this.props;
        const occurrencesKeys = Object.keys(occurrences);
        occurrencesKeys.map((key) => {

            const occurrence = occurrences[key];

            if (occurrence.experience instanceof Object) {
                this.props.setExperienceSelected(target);
            }

            if (occurrence.qualification instanceof Object) {
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
        setOccurrence: (occurrence) => dispatch(actions.occurrences.setOccurrence(occurrence)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CvCarousel);