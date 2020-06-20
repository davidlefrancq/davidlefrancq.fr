import React, {Component, Fragment} from 'react';
import OccurenceItem from "./OccurenceItem";
import CvCarousel from "./CvCarousel";
import DateBar from "./edit/DateBar";
import Step from "../bo/Step";
import {connect} from "react-redux";
import {actions} from '../actions';
import data from "../data";

class OccurenceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            occurence: {},
        };
    }

    componentDidMount() {
        this.props.setOccurences(data.occurences);
    }

    handleOccurence(occurence) {
        this.setState({occurence});
    }

    getQualifications() {
        const {occurences} = this.props;
        const occurencesQualifications = [];

        for (const id in occurences) {
            const occurence = occurences[id];
            const {qualification} = occurence;
            if (qualification != undefined && qualification != null) {
                occurencesQualifications.push(occurence);
            }
        }

        this.props.setQualificationList(occurencesQualifications);

        return occurencesQualifications;
    }

    getExperiences() {
        const {occurences} = this.props;
        const occurencesExperiences = [];

        for (const id in occurences) {
            const occurence = occurences[id];
            const {experience} = occurence;
            if (experience != undefined && experience != null) {
                occurencesExperiences.push(occurence);
            }
        }

        this.props.setExperienceList(occurencesExperiences);

        return occurencesExperiences;
    }

    getStepsDates() {
        const {occurences} = this.props;
        let dates = [];

        for (const id in occurences) {
            const occurence = occurences[id];
            const {dateStart, dateEnd} = occurence;

            let date = null;

            if (dateStart != undefined && dateStart != null) {
                date = new Date(dateStart);
            }

            if (dateEnd != undefined && dateEnd != null) {
                date = new Date(dateEnd);
            }

            if (date != null && !isNaN(date.getTime())) {

                let dateExist = false;

                dates.forEach((item) => {
                    if (date.getFullYear() == item.title) {
                        dateExist = true;
                    }
                });

                if (dateExist == false) {
                    let stepDate = new Step(date.getFullYear(), "");
                    dates.push(stepDate);
                }
            }
        }

        return dates;
    }

    renderOccurences() {
        const {occurences} = this.props;
        const occurencesIds = Object.keys(occurences);

        return occurencesIds.map((key) => {
            return (
                <OccurenceItem key={key} occurence={occurences[key]}/>
            );
        });
    }

    renderOcurence() {
        const {occurence} = this.props;
        if (occurence != undefined && occurence != null) {
            return (
                <OccurenceItem occurence={occurence}/>
            );
        }
    }

    renderDateBar() {

        let i = 0;
        for (let item in this.props.occurences) {
            i = i + 1;
        }

        if (i > 1) {
            const stepsDates = this.getStepsDates();

            return (
                <DateBar steps={stepsDates}/>
            );
        }
    }

    render() {

        const occurencesQualifications = this.getQualifications();
        const occurencesExperiences = this.getExperiences();

        return (
            <Fragment>
                <div className={"row"}>

                    <div className={"col-12"}>
                        {this.renderDateBar()}
                    </div>

                    <div className={"col-12 col-md-6"}>
                        <CvCarousel
                            occurences={occurencesQualifications}
                            handleOccurence={this.handleOccurence.bind(this)}
                        />
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <CvCarousel
                            occurences={occurencesExperiences}
                            handleOccurence={this.handleOccurence.bind(this)}
                        />
                    </div>
                </div>

                <div className={"clearfix"}>
                    {/*{this.renderOccurences()}*/}
                </div>

                <div className={"container"} style={{minHeight:"250px"}}>
                    {this.renderOcurence()}
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const {occurences, occurence} = state.OccurencesReducer;
    return {
        occurences: occurences,
        occurence,
    };
};

const mapDispatchToProps = (dispatch) =>{

    return{
        setOccurences: (occurences) => dispatch(actions.occurences.setOccurences(occurences)),
        setExperienceList: (occurences) => dispatch(actions.experience.setExperienceList(occurences)),
        setQualificationList: (occurences) => dispatch(actions.qualification.setQualificationList(occurences)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OccurenceList);