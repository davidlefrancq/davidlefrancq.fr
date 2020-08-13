import React, {Component} from 'react';
import {connect} from "react-redux";
import {actions} from "../../actions";
import Carousel from "./Carousel";
import Step from "../../bo/Step";
import {SERVER_API} from "../../utils/urls";
import {OCCURRENCE_EXPERIENCE, OCCURRENCE_QUALIFICATION} from "../Occurrence/occurence-type";
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
        this.isActivatedRefresh = true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        this.dataInitializer(prevProps);
        this.refresh();

    }

    dataInitializer(prevProps) {
        if (prevProps.occurrences.length != this.props.occurrences.length) {
            this.loadingOccurences();
        }
    }

    refresh() {

        if(this.isActivatedRefresh){
            if (VarUtils.isNotUndefinedNull(this.state.occurrences) && this.state.occurrences.length > 0) {

                this.refreshActived().then((res)=>{
                    this.refreshOther();
                }).catch((error)=>{
                    console.log(error);
                });

            }
        }
    }

    activeRefresh(){
        this.isActivatedRefresh = true;
    }

    unactiveRefresh(){
        this.isActivatedRefresh = false;
    }

    refreshActived() {
        return new Promise((resolve,reject)=>{

            const actived = this.getActived();
            const selected = this.state.occurrences[this.state.selected];
            const idActived = (actived != null) ? actived.id : null;
            let idSelected = null;

            if (VarUtils.isNotUndefinedNull(selected)) {
                idSelected = selected.id;
            }

            if (VarUtils.isNotUndefinedNull(idSelected)) {
                if (VarUtils.isNotUndefinedNull(actived)) {

                    if (idSelected != idActived) {

                        let newSelected = idSelected;

                        const keys = Object.keys(this.state.occurrences);
                        keys.map((key) => {
                            if (this.state.occurrences[key].id == idActived) {
                                newSelected = key;
                            }
                        });

                        if (newSelected != idSelected) {
                            this.updateTarget(newSelected);
                        }
                    } else{
                        this.props.setOccurrence(selected);
                    }
                }
            }

            resolve();

        });
    }

    getActived = () => {
        let occurence = null;

        if (this.props.type == OCCURRENCE_EXPERIENCE) {
            occurence = this.props.experience;
        }

        if (this.props.type == OCCURRENCE_QUALIFICATION) {
            occurence = this.props.qualification;
        }

        return occurence;
    }

    getOtherActived(){
        let occurrence = null;
        if(this.props.type == OCCURRENCE_EXPERIENCE){
            occurrence = this.props.qualification;
        }
        if(this.props.type == OCCURRENCE_QUALIFICATION){
            occurrence = this.props.experience;
        }
        return occurrence;
    }

    refreshOther() {

        if (VarUtils.isNotUndefinedNull(this.state.occurrences) && this.state.occurrences.length > 0) {

            let newSelected = this.state.selected;
            let actived = this.getActived();

            if (actived == null) {
                actived = this.getOtherActived();
                const year = Occurrence.getYear(actived);

                const curentType = OccurrencesUtils.getType(this.state.occurrences[0]);
                if(curentType == OCCURRENCE_EXPERIENCE){
                    actived = this.props.qualification;
                }
                if(curentType == OCCURRENCE_QUALIFICATION){
                    actived = this.props.experience;
                }

                let activedType = OccurrencesUtils.getType(actived);
                if (curentType != activedType && activedType != null) {

                    const keys = Object.keys(this.state.occurrences);
                    keys.map((key) => {

                        const occurrence = this.state.occurrences[key];
                        const occurrenceYear = Occurrence.getYear(occurrence);

                        if (occurrenceYear <= year || key == 0) {

                            const occurenceSelected = this.state.occurrences[this.state.selected];
                            const occurenceSelectedYear = Occurrence.getYear(occurenceSelected);

                            if(occurrenceYear > occurenceSelectedYear || occurenceSelectedYear > year){

                                if(eval(this.state.selected) != eval(key)){

                                    newSelected = key;
                                }
                            }
                        }
                    });

                    if(newSelected != this.state.selected){
                        this.setSelected(newSelected);
                    }
                }
            }
        }
    }

    loadingOccurences() {
        const {type} = this.props;
        if (type == OCCURRENCE_EXPERIENCE) {
            this.loadingExperiences();
        } else if (type == OCCURRENCE_QUALIFICATION) {
            this.loadingQualifications();
        }
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

                if (VarUtils.isNotUndefinedNull(occurrence.experience.img) && occurrence.experience.img != "") {
                    image = occurrence.experience.img;
                }
            }

            if (occurrence.qualification instanceof Object) {

                title += occurrence.qualification.name;
                dateEnd = occurrence.dateEnd ? new Date(occurrence.dateEnd) : null;

                if (VarUtils.isNotUndefinedNull(occurrence.qualification.img) && occurrence.qualification.img != "") {
                    image = occurrence.qualification.img;
                }
            }

            step.title = title;
            step.description = description;
            step.dateStart = dateStart;
            step.dateEnd = dateEnd;

            if (VarUtils.isNotUndefinedNull(image) && image != "") {
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

    getSelected = () => {
        let target = 0;

        if (this.state.selected) {
            target = this.state.selected;
        }

        return target;
    }

    updateTarget = (target) => {

        if (VarUtils.isNotUndefinedNull(target)) {
            if (target >= 0) {
                this.setSelected(target);
                this.updateOccurence(target);
            }
        }

        // this.activeRefresh();
    }

    setSelected(target){
        const state = {...this.state};
        state.selected = eval(target);
        this.setState(state);
    }

    updateOccurence(target) {

        const {occurrences} = this.props;
        if (occurrences && occurrences.length > 0) {

            let occurrence = null;
            const occurrenceTargeted = this.state.occurrences[target];


            const keys = Object.keys(occurrences);
            keys.map((key) => {
                let id1 = '' + occurrences[key].id;
                let id2 = '' + occurrenceTargeted.id;
                if (id1 == id2) {
                    occurrence = occurrences[key];
                }
            });

            this.props.setOccurrence(occurrence);
        }
    }

    // setOccurrence = (occurrence) => {
    //     if (occurrence != null) {
    //         this.props.setOccurrence(occurrence);
    //         if (Occurrence.isExperience(occurrence)) {
    //             this.props.setExperience(occurrence);
    //             this.props.setQualification(null);
    //         }else if (Occurrence.isQualification(occurrence)) {
    //             this.props.setExperience(null);
    //             this.props.setQualification(occurrence);
    //         }
    //     }
    // }

    getOccurenceDisplayed = () => {
        const {occurrence} = this.props;
        return occurrence;
    }

    prevent = (target) => {
        this.unactiveRefresh();
        this.updateTarget(target)
    }
    next = (target) => {
        this.unactiveRefresh();
        this.updateTarget(target)
    }

    isActived(selected) {
        const {occurrence, type} = this.props;
        let result = false;

        if (occurrence) {
            if (type == OCCURRENCE_EXPERIENCE) {
                const experience = this.state.occurrences[selected];

                if (experience) {
                    if (occurrence.id == experience.id) {
                        result = true;
                    }
                }
            }

            if (type == OCCURRENCE_QUALIFICATION) {
                const qualification = this.state.occurrences[selected];
                if (qualification) {
                    if (occurrence.id == qualification.id) {
                        result = true;
                    }
                }
            }
        }

        return result;
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

                // displayed={this.getStepDisplayed()}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const occurrence = state.OccurrencesReducer.occurrence;
    const occurrences = state.OccurrencesReducer.occurrences;
    const experience = state.ExperienceReducer.occurrence;
    const qualification = state.QualificationReducer.occurrence;
    return {
        occurrences,
        occurrence,
        experience,
        qualification,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setOccurrence: (occurrence) => dispatch(actions.occurrences.setOccurrence(occurrence)),
        // setExperience: (occurrence) => dispatch(actions.experience.setExperience(occurrence)),
        // setQualification: (occurrence) => dispatch(actions.qualification.setQualification(occurrence)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CvCarousel);