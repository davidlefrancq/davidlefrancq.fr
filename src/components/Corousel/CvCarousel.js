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

    getItemsCarousel = () => {
        const items = [];
        let i = 0;

        const {occurrences} = this.props;
        const occurrencesKeys = Object.keys(occurrences);
        occurrencesKeys.map((key) => {

            const occurrence = occurrences[key];
            const step = this.occurenceToStep(occurrence);

            items[i] = step;
            i++;
        });

        return items;
    }

    occurenceToStep = (occurrence) => {
        let step = null;

        if (occurrence) {
            const {qualification, experience} = occurrence;
            step = new Step();

            let title = "";
            let dateStart = null;
            let dateEnd = null;
            let description = "";
            let image = null;

            if (occurrence.experience instanceof Object) {
                title = occurrence.experience.name;

                dateStart = occurrence.dateStart ? new Date(occurrence.dateStart) : null;
                dateEnd = occurrence.dateEnd ? new Date(occurrence.dateEnd) : null;

                if (occurrence.experience.img != undefined && occurrence.experience.img != null && occurrence.experience.img != "") {
                    image = occurrence.experience.img;
                }
            }

            if (occurrence.qualification instanceof Object) {

                title += occurrence.qualification.name;
                dateEnd = occurrence.dateEnd ? new Date(occurrence.dateEnd) : null;

                if (occurrence.qualification.img != undefined && occurrence.qualification.img != null && occurrence.qualification.img != "") {
                    image = occurrence.qualification.img;
                }
            }

            step.title = title;
            step.description = description;
            step.dateStart = dateStart;
            step.dateEnd = dateEnd;

            if (image != undefined && image != null && image != "") {
                step.image = `${SERVER_API}${image}`;
            } else if (occurrence.qualification instanceof Object) {
                step.image = `default-background-qualification.jpg`;
            } else if (occurrence.experience instanceof Object) {
                step.image = `defauld-background-experience.jpeg`;
            }

            step.onClick = () => {

                if (this.props.occurrence != null) {

                    const id1 = '' + this.props.occurrence.id;
                    const id2 = '' + occurrence.id;

                    if (id1.localeCompare(id2, 'fr', {sensitivity: 'variant'}) == 0) {
                        // Si on clique sur un élément qui est déjà affiché
                        this.props.setOccurrence(null);
                    } else {
                        this.props.setOccurrence(occurrence);
                    }
                } else {
                    this.props.setOccurrence(occurrence);
                }
            };

        }
        return step;
    }

    getTarget = () => {

        const {occurrences} = this.props;
        let target = 0;

        const occurrencesKeys = Object.keys(occurrences);
        if (occurrencesKeys.length > 0) {

            const occurrence = occurrences[occurrencesKeys[0]];

            if (occurrence.experience instanceof Object) {
                target = this.props.experienceSelected;
            }

            if (occurrence.qualification instanceof Object) {
                target = this.props.qualificationSeleted;
            }

        }

        return target;
    }

    updateTarget = (target) => {

        const {occurrences} = this.props;

        const occurrencesKeys = Object.keys(occurrences);
        if (occurrencesKeys.length > 0) {

            const occurrence = occurrences[occurrencesKeys[0]];

            if (occurrence.experience instanceof Object) {
                this.props.setExperienceSelected(target);
                this.props.setOccurrence(occurrences[target]);
            }

            if (occurrence.qualification instanceof Object) {
                this.props.setQualificationSelected(target);
                this.props.setOccurrence(occurrences[target]);
            }
        }
    }

    getStepDisplayed = () => {
        const {occurrence} = this.props;
        let step = this.occurenceToStep(occurrence);
        return step;
    }

    render() {
        return (
            <Carousel
                items={this.getItemsCarousel()}
                target={this.getTarget()}
                // updateTarget={this.updateTarget}
                // displayed={this.getStepDisplayed()}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const qualificationSeleted = state.QualificationReducer.selected;
    const experienceSelected = state.ExperienceReducer.selected;
    const occurrence = state.OccurrencesReducer.occurrence;
    return {
        qualificationSeleted,
        experienceSelected,
        occurrence,
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