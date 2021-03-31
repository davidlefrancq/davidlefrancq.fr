import React, {Component} from 'react';
import {connect} from "react-redux";
import {actions} from "../../actions";
import Carousel from "./Carousel";
import Step from "../../bo/Step";
import {SERVER_API} from "../../utils/urls";
import {OCCURRENCE_EXPERIENCE, OCCURRENCE_QUALIFICATION, OCCURRENCE_ALL} from "../Occurrence/occurence-type";
import OccurrencesUtils from "../../utils/OccurrencesUtils";
import VarUtils from "../../utils/VarUtils";
import Occurrence from "../../bo/Occurrence";

class CvCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            occurrences: [],
            selected: 0,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.dataInitializer(prevProps);
    }

    dataInitializer(prevProps) {
        if (prevProps.occurrences.length !== this.props.occurrences.length) {
            this.loadingOccurences();
        }
    }


    getActived = () => {
        return this.props.occurrence;
    }

    loadingOccurences() {
        const {type} = this.props;
        switch (type) {

            case OCCURRENCE_ALL:
                this.loadingAllOccurences();
                break;

            // case OCCURRENCE_EXPERIENCE:
            //     this.loadingExperiences();
            //     break;
            //
            // case OCCURRENCE_QUALIFICATION:
            //     this.loadingQualifications();
            //     break;
        }
    }

    loadingAllOccurences = () => {
        const state = {...this.state};
        const {occurrences} = this.props;

        state.occurrences = OccurrencesUtils.getOccurrences(occurrences);

        this.setState(state);
    }

    loadingQualifications = () => {
        const state = {...this.state};
        const {occurrences} = this.props;

        state.occurrences = OccurrencesUtils.getQualifications(occurrences);

        this.setState(state);
    }

    loadingExperiences = () => {
        const state = {...this.state};
        const {occurrences} = this.props;

        state.occurrences = OccurrencesUtils.getExperiences(occurrences);

        this.setState(state);
    }

    getItemsCarousel = () => {
        const items = [];
        let i = 0;

        const {occurrences} = this.state;
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
        return this.initStep(occurrence);
    }

    initStep = (occurrence) => {
        let step = null;

        if (VarUtils.isNotUndefinedNull(occurrence)) {

            step = new Step();

            step.title = this.getTitle(occurrence);
            step.dateStart = this.getDateStart(occurrence);
            step.dateEnd = this.getDateEnd(occurrence);
            step.description = this.getDescription(occurrence);

            // Illustration image
            let image = this.getImage(occurrence);
            if (VarUtils.isNotUndefinedNull(image) && image != "") {
                step.image = `${SERVER_API}${image}`;
            } else if (occurrence.qualification instanceof Object) {
                step.image = `default-background-qualification.jpg`;
            } else if (occurrence.experience instanceof Object) {
                step.image = `defauld-background-experience.jpeg`;
            }

            // Redefine Step OnClick Action
            step.onClick = () => {

                if (this.props.occurrence != null) {

                    const id1 = '' + this.props.occurrence.id;
                    const id2 = '' + occurrence.id;

                    // If new occurrence selected
                    if (id1.localeCompare(id2, 'fr', {sensitivity: 'variant'}) !== 0) {
                        this.props.setOccurrence(occurrence);
                    }
                } else {
                    this.props.setOccurrence(occurrence);
                }
            };
        }

        return step;
    }

    getTitle = (occurrence) => {
        let title = null;
        const type = OccurrencesUtils.getType(occurrence);
        switch (type) {
            case OCCURRENCE_EXPERIENCE:
                title = occurrence.experience.name;
                break;

            case OCCURRENCE_QUALIFICATION:
                title = occurrence.qualification.name;
                break;
        }
        return title;
    }

    getDescription(occurrence) {
        let description = "";
        const type = OccurrencesUtils.getType(occurrence);
        switch (type) {
            case OCCURRENCE_EXPERIENCE:
                break;

            case OCCURRENCE_QUALIFICATION:
                break;
        }
        return description;
    }

    getDateStart(occurrence) {
        let dateStart = null;
        const type = OccurrencesUtils.getType(occurrence);
        switch (type) {
            case OCCURRENCE_EXPERIENCE:
                dateStart = occurrence.dateStart ? new Date(occurrence.dateStart) : null;
                break;

            case OCCURRENCE_QUALIFICATION:
                break;
        }
        return dateStart;
    }

    getDateEnd(occurrence) {
        let dateEnd = null;
        const {type} = this.props;
        switch (type) {
            case OCCURRENCE_EXPERIENCE:
                dateEnd = occurrence.dateEnd ? new Date(occurrence.dateEnd) : null;
                break;

            case OCCURRENCE_QUALIFICATION:
                dateEnd = occurrence.dateEnd ? new Date(occurrence.dateEnd) : null;
                break;
        }

        return dateEnd;
    }

    getImage(occurrence) {
        let image = null;
        const {type} = this.props;
        switch (type) {
            case OCCURRENCE_EXPERIENCE:
                if (VarUtils.isNotUndefinedNull(occurrence.experience.img) && occurrence.experience.img != "") {
                    image = occurrence.experience.img;
                }
                break;

            case OCCURRENCE_QUALIFICATION:
                if (VarUtils.isNotUndefinedNull(occurrence.qualification.img) && occurrence.qualification.img != "") {
                    image = occurrence.qualification.img;
                }
                break;
        }

        return image;
    }

    getSelected = () => {

        // const {type} = this.props;
        // const occurrenceType = OccurrencesUtils.getType(this.props.occurrence);
        let target = 0;

        if (eval(this.state.selected) >= 0) {
            target = eval(this.state.selected);
        }

        if (this.props.occurrence) {
            if (this.state.occurrences.length > 0) {

                const occurrenceSelected = this.state.occurrences[this.state.selected];
                const idOccurrenceProps = eval(this.props.occurrence.id);
                const idOccurrenceSelected = eval(occurrenceSelected.id);

                if (idOccurrenceProps !== idOccurrenceSelected) {

                    for(const key in this.state.occurrences){
                        const occurrence = this.state.occurrences[key];

                        const id1 = idOccurrenceProps;
                        const id2 = eval(occurrence.id);
                        if (id1 === id2) {

                            target = key;
                        }
                    }
                }
            }
        }

        return target;
    }

    isActived = (selected) => {

        let result = false;
        const {occurrence} = this.props;
        const occurrenceSelected = this.state.occurrences[selected];

        if (occurrence && occurrenceSelected) {
            if (occurrence.id == occurrenceSelected.id) {
                result = true;
            }
        }

        return result;
    }

    setSelected(target) {
        const state = {...this.state};
        state.selected = eval(target);
        this.setState(state);
    }

    updateTarget = (target) => {

        if (VarUtils.isNotUndefinedNull(target)) {
            if (target >= 0) {
                this.setSelected(target);
                this.updateOccurence(target);
            }
        }
    }

    updateOccurence(target) {

        const {occurrences} = this.props;
        if (occurrences && occurrences.length > 0) {

            // let occurrence = null;
            const occurrenceTargeted = this.state.occurrences[target];

            // const keys = Object.keys(occurrences);
            // keys.map((key) => {
            //     let id1 = eval(occurrences[key].id);
            //     let id2 = eval(occurrenceTargeted.id);
            //     if (id1 === id2) {
            //         occurrence = occurrences[key];
            //     }
            // });

            this.props.setOccurrence(occurrenceTargeted);
        }
    }

    prevent = (target) => {
        // console.log("target", target);
        this.updateTarget(target);
    }

    next = (target) => {
        // console.log("state", this.state);
        // console.log("target", target);
        this.updateTarget(target);
    }

    render() {

        const items = this.getItemsCarousel();
        const selected = this.getSelected();
        const isActived = this.isActived(selected);

        return (
            <Carousel
                items={items}
                selected={selected}
                actived={isActived}

                prevent={this.prevent}
                next={this.next}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const occurrence = state.OccurrencesReducer.occurrence;
    const occurrences = state.OccurrencesReducer.occurrences;
    return {
        occurrences,
        occurrence,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setOccurrence: (occurrence) => dispatch(actions.occurrences.setOccurrence(occurrence)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CvCarousel);