import React, {Component} from 'react';
import {connect} from "react-redux";
import OccurrenceItemMenu from "./OccurrenceItemMenu";
import {actions} from "../../actions";
import EditQualification from "../Occurrence/edit/EditQualification";
import TrainingCenter from "../../bo/TrainingCenter";
import Qualification from "../../bo/Qualification";
import Occurrence from "../../bo/Occurrence";
import Experience from "../../bo/Experience";
import Enterprise from "../../bo/Enterprise";
import DAOFactory from "../../dal/DAOFactory";
import EditExperience from "../Occurrence/edit/EditExperience";

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createNewOccurrence: false,
        };
        this.daoFactory = new DAOFactory();
    }

    handleNewOccurrence = () => {
        const state = {...this.state};
        state.createNewOccurrence = true;
        this.setState(state);
        this.props.setOccurrence(null);
    }

    handleBackNewQualification = () => {
        const state = {...this.state};
        state.createNewOccurrence = false;
        this.setState(state);
    }

    handleNewQualification = () => {
        const state = {...this.state};
        const {setOccurrence} = this.props;

        state.createNewOccurrence = false;

        const trainingCenter = new TrainingCenter(null, null, null, null, null, null)
        const qualification = new Qualification(null, null, null, trainingCenter, "", [], []);
        const occurrence = new Occurrence(null, null, qualification, null)

        this.setState(state);
        setOccurrence(occurrence);
    }

    handelDeleteOccurrence = (occurrence) => {
        const {token, setOccurrences} = this.props;
        this.daoFactory.getOccurrenceDAO().delete(occurrence, token).then((res) => {
            const occurrences = {...this.props.occurrences};
            this.deleteOccurrenceInList(occurrences, occurrence);
            setOccurrences(occurrences);
        });
    }

    deleteOccurrenceInList(occurrences, occurrence) {
        for(const key in occurrences){
            const item = occurrences[key];
            if (item.id !== undefined && item.id !== null) {
                if (item.id === occurrence.id) {
                    delete occurrences[key];
                }
            }

        }
    }

    handleNewExperience = () => {
        const state = {...this.state};
        const {setOccurrence} = this.props;

        state.createNewOccurrence = false;
        this.setState(state);

        const occurrence = this.getNewExperienceOccurrence();
        setOccurrence(occurrence);
    }

    getNewExperienceOccurrence() {
        const occurrence = new Occurrence();
        const experience = new Experience();
        const enterprise = new Enterprise();
        experience.setEnterprise(enterprise);
        experience.setLinks([]);
        experience.setTechnologicalCategories([]);
        experience.setWorkstudy(false);
        occurrence.setExperience(experience);
        return occurrence;
    }

    handleSelectOccurrence = (occurrence) => {
        const {setOccurrence} = this.props;
        setOccurrence(occurrence);
    }

    renderBtnNewOccurrence() {
        const {createNewOccurrence} = this.state;
        if (createNewOccurrence !== true) {
            return (
                <div className={"row mt-1 p-0"}>
                    <div className={"col-12 m-0 p-0"}>
                        <button className={"btn btn-primary col-12"} onClick={this.handleNewOccurrence}>
                            Ajouter
                        </button>
                    </div>
                </div>
            );
        }
    }

    renderMenu() {
        const {isLoggedIn} = this.props;
        if (isLoggedIn === true) {
            return (
                <div className={"col-2 mr-0 pr-0"}>

                    <h2>Menu</h2>

                    {this.renderBtnNewOccurrence()}

                    {this.renderMenuNewOccurrence()}

                    {this.renderItemsMenu()}

                </div>
            );
        }
    }

    renderItemsMenu() {

        const {occurrences} = this.props;
        if (occurrences) {
            const occurrencesKeys = Object.keys(occurrences);

            return occurrencesKeys.map((key) => {
                const occurrence = occurrences[key];
                return (
                    <OccurrenceItemMenu
                        key={key}
                        occurrence={occurrence}
                        handleSelectOccurrence={this.handleSelectOccurrence}
                        handelDeleteOccurrence={this.handelDeleteOccurrence}
                    />
                );
            });
        }
    }

    renderEdit() {
        const {isLoggedIn, occurrence} = this.props;
        if (isLoggedIn === true) {
            if (occurrence !== undefined && occurrence !== null) {
                const {qualification, experience} = occurrence;
                if (qualification !== undefined && qualification !== null) {
                    return (
                        <div className={"col-10"}>
                            <h2>Edit</h2>
                            {this.renderEditQualification(occurrence)}
                        </div>
                    );
                }
                if (experience !== undefined && experience !== null) {
                    return (
                        <div className={"col-10"}>
                            <h2>Edit</h2>
                            {this.renderEditExperience(occurrence)}
                        </div>
                    );
                }
            }
        }
    }

    renderEditQualification(occurrence) {
        const {qualification} = occurrence;
        if (qualification !== undefined && qualification !== null) {
            return (
                <EditQualification/>
            );
        }
    }

    renderEditExperience(occurrence) {
        const {experience} = occurrence;
        if (experience !== undefined && experience !== null) {
            return (
                <EditExperience/>
            );
        }
    }

    renderMenuNewOccurrence() {
        const {createNewOccurrence} = this.state;
        if (createNewOccurrence) {
            return (
                <div className={"row p-0"}>
                    <div className={"col-4 p-1"}>
                        <button className={"btn btn-secondary col-12"}
                                onClick={this.handleBackNewQualification}>{"<"}</button>
                    </div>
                    <div className={"col-4 p-1"}>
                        <button className={"btn btn-primary col-12"} onClick={this.handleNewQualification}>Dip</button>
                    </div>
                    <div className={"col-4 p-1"}>
                        <button className={"btn btn-primary col-12"} onClick={this.handleNewExperience}>Exp</button>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className={"container-fluid"}>
                <div className={"row"}>
                    {this.renderMenu()}
                    {this.renderEdit()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {isLoggedIn, token} = state.AuthentificationReducer;
    const {occurrences, occurrence} = state.OccurrencesReducer;
    return {
        isLoggedIn,
        occurrences,
        occurrence,
        token,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setOccurrence: (occurrence) => dispatch(actions.occurrences.setOccurrence(occurrence)),
        setOccurrences: (occurrences) => dispatch(actions.occurrences.setOccurrences(occurrences)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
