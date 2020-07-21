import React, {Component} from 'react';
import {connect} from "react-redux";
import OccurenceItemMenu from "./OccurenceItemMenu";
import {actions} from "../../actions";
import EditQualification from "../edit/EditQualification";
import TrainingCenter from "../../bo/TrainingCenter";
import Qualification from "../../bo/Qualification";
import Occurence from "../../bo/Occurence";
import Experience from "../../bo/Experience";
import Enterprise from "../../bo/Enterprise";
import DAOFactory from "../../dal/DAOFactory";
import EditExperience from "../edit/EditExperience";

const daoFactory = new DAOFactory();

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createNewOccurence: false,
        };
    }

    handleNewOccurence = () => {
        const state = {...this.state};
        state.createNewOccurence = true;
        this.setState(state);
        this.props.setOccurence(null);
    }

    handleBackNewQualification = () => {
        const state = {...this.state};
        state.createNewOccurence = false;
        this.setState(state);
    }

    handleNewQualification = () => {
        const state = {...this.state};
        const {setOccurence} = this.props;

        state.createNewOccurence = false;

        const trainingCenter = new TrainingCenter(null, null, null, null, null, null)
        const qualification = new Qualification(null, null, null, trainingCenter, "", [], []);
        const occurence = new Occurence(null, null, qualification, null)

        this.setState(state);
        setOccurence(occurence);
    }

    handelDeleteOccurence = (occurence) => {
        const {token,setOccurences} = this.props;
        daoFactory.getOccurenceDAO().delete(occurence,token).then((res) => {
            console.log("handelDeleteOccurence res", res);
            console.log("handelDeleteOccurence occurence", occurence);
            const occurences = {...this.props.occurences};
            this.deleteOccurenceInList(occurences,occurence);
            setOccurences(occurences);
        });
    }

    deleteOccurenceInList(occurences,occurence){
        const keys = Object.keys(occurences);
        keys.map((key)=>{
            const item = occurences[key];
            if(item.id != undefined && item.id !=null){
                if(item.id == occurence.id){
                    delete occurences[key];
                }
            }
        });
    }

    handleNewExperience = () => {
        const state = {...this.state};
        const {setOccurence} = this.props;

        state.createNewOccurence = false;
        this.setState(state);

        const occurence = this.getNewExperienceOccurence();
        console.log(occurence);
        setOccurence(occurence);
    }

    getNewExperienceOccurence() {
        const occurence = new Occurence();
        const experience = new Experience();
        const enterprise = new Enterprise();
        experience.setEnterprise(enterprise);
        experience.setLinks([]);
        experience.setTechnologicalCategories([]);
        experience.setWorkstudy(false);
        occurence.setExperience(experience);
        return occurence;
    }

    handleSelectOccurence = (occurence) => {
        const {setOccurence} = this.props;
        setOccurence(occurence);
    }

    renderBtnNewOccurence() {
        const {createNewOccurence} = this.state;
        if (createNewOccurence !== true) {
            return (
                <div className={"row mt-1 p-0"}>
                    <div className={"col-12 m-0 p-0"}>
                        <button className={"btn btn-primary col-12"} onClick={this.handleNewOccurence}>
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

                    {this.renderBtnNewOccurence()}

                    {this.renderMenuNewOccurence()}

                    {this.renderItemsMenu()}

                </div>
            );
        }
    }

    renderItemsMenu() {

        const {occurences} = this.props;
        if (occurences) {
            const occurencesKeys = Object.keys(occurences);

            return occurencesKeys.map((key) => {
                const occurence = occurences[key];
                return (
                    <OccurenceItemMenu
                        key={key}
                        occurence={occurence}
                        handleSelectOccurence={this.handleSelectOccurence}
                        handelDeleteOccurence={this.handelDeleteOccurence}
                    />
                );
            });
        }
    }

    renderEdit() {
        const {isLoggedIn, occurence} = this.props;
        if (isLoggedIn === true) {
            if (occurence !== undefined && occurence !== null) {
                const {qualification, experience} = occurence;
                if (qualification !== undefined && qualification !== null) {
                    return (
                        <div className={"col-10"}>
                            <h2>Edit</h2>
                            {this.renderEditQualification(occurence)}
                        </div>
                    );
                }
                if (experience !== undefined && experience !== null) {
                    return (
                        <div className={"col-10"}>
                            <h2>Edit</h2>
                            {this.renderEditExperience(occurence)}
                        </div>
                    );
                }
            }
        }
    }

    renderEditQualification(occurence) {
        const {qualification} = occurence;
        if (qualification !== undefined && qualification !== null) {
            return (
                <EditQualification/>
            );
        }
    }

    renderEditExperience(occurence) {
        const {experience} = occurence;
        if (experience !== undefined && experience !== null) {
            return (
                <EditExperience/>
            );
        }
    }

    renderMenuNewOccurence() {
        const {createNewOccurence} = this.state;
        if (createNewOccurence) {
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
            <div className={"container"}>
                <div className={"row pl-2"}>
                    {this.renderMenu()}
                    {this.renderEdit()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {isLoggedIn,token} = state.AuthentificationReducer;
    const {occurences, occurence} = state.OccurencesReducer;
    return {
        isLoggedIn,
        occurences,
        occurence,
        token,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setOccurence: (occurence) => dispatch(actions.occurences.setOccurence(occurence)),
        setOccurences: (occurences) => dispatch(actions.occurences.setOccurences(occurences)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);