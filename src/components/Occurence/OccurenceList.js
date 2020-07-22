import React, {Component, Fragment} from 'react';
import OccurenceItem from "./OccurenceItem";
import CvCarousel from "../Corousel/CvCarousel";
import DateBar from "../DateBar/DateBar";
import Step from "../../bo/Step";
import {connect} from "react-redux";
import {actions} from '../../actions';
import data from "../../data";
import DAOFactory from "../../dal/DAOFactory";
import ScreenDetection from "../../utils/ScreenDetection";
import { BsBuilding } from 'react-icons/bs';
import { GiDiploma } from 'react-icons/gi';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const daoFactory = new DAOFactory();

class OccurenceList extends Component {

    constructor(props) {
        super(props);
        const screenSize = ScreenDetection.getBootstrapSize();
        this.state = {
            occurence: {},
            style: {
                qualificationDisplay: "",
                experienceDisplay: "",
            },
            screenSize: screenSize,
        };
    }

    componentDidMount() {
        const result = daoFactory.getOccurenceDAO().selectAll();
        result.then((res) => {
            const {data} = res;
            const items = data['hydra:member'];

            this.props.setOccurences(items);
        });

        // Lorsque l'écran change de résolution
        window.addEventListener("resize", this.screenResizeEvent);
    }

    screenResizeEvent = () => {

        const state = {...this.state};
        const screenSize = ScreenDetection.getBootstrapSize();

        if (state.screenSize != screenSize) {

            state.screenSize = screenSize;

            if(screenSize == "col-xl"){
                state.style.qualificationDisplay = "";
                state.style.experienceDisplay = "";
            }else{
                if(state.style.qualificationDisplay != "d-none" && state.style.experienceDisplay != "d-none"){
                    state.style.qualificationDisplay = "";
                    state.style.experienceDisplay = "d-none";
                }
            }

            this.setState(state);
        }
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


    showQualification = () => {
        const state = {...this.state};
        state.style.experienceDisplay = "d-none";
        state.style.qualificationDisplay = "";
        this.setState(state);
    }

    showExperience = () => {
        const state = {...this.state};
        state.style.experienceDisplay = "";
        state.style.qualificationDisplay = "d-none";
        this.setState(state);
    }

    renderMenu() {
        const {screenSize} = this.state
        if (screenSize != "col-xl") {
            return (
                <Fragment>
                    <h2>Menu</h2>
                    <div className={"text-center mb-3 p-0"}>

                        {/* Bouton Diplome */}
                        <button className={"btn btn-secondary m-1 col-5 col-xl-12"}
                                onClick={this.showQualification}
                                style={{fontSize:"large"}}
                        >
                            <span style={{fontSize:"x-large"}}>
                                <GiDiploma/>
                            </span>
                            <span> Diplome</span>
                        </button>

                        {/* Bouton Experience */}
                        <button className={"btn btn-secondary m-1 col-5 col-xl-12"}
                                onClick={this.showExperience}
                                style={{fontSize:"large"}}
                        >
                            <span style={{fontSize:"x-large", marginRight:"5px"}}>
                                <BsBuilding/>
                            </span>
                            <span> Expérience</span>
                        </button>

                    </div>
                </Fragment>
            );
        }
    }

    renderTooltipQualification = (props) => {
        return (
            <Tooltip id="button-tooltip-qualification" {...props}>
                Diplome
            </Tooltip>
        );
    }

    renderTooltipExperience = (props) => {
        return (
            <Tooltip id="button-tooltip-qualification" {...props}>
                Expérience professionnelle
            </Tooltip>
        );
    }

    render() {
        const {qualificationDisplay, experienceDisplay} = this.state.style;

        const occurencesQualifications = this.getQualifications();
        const occurencesExperiences = this.getExperiences();

        return (
            <Fragment>
                <div className={"row"}>

                    <div className={"col-12"} style={{zIndex:999999999}}>
                        {this.renderDateBar()}
                    </div>

                    <div className={"col-12"}>
                        <div className={"container-fluid"}>
                            <div className={"row"}>
                                <div className={"col-12 col-xl-1"}>
                                    {this.renderMenu()}
                                </div>
                                <div className={"col-12 col-xl-4"}>
                                    <div className={"row"}>
                                        <div className={`col-12 mb-3 ${qualificationDisplay}`}>
                                            <div style={{height:0}}>
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={this.renderTooltipQualification}
                                                >
                                                    <GiDiploma className={"logo-carousel"}/>
                                                </OverlayTrigger>
                                            </div>
                                            <CvCarousel
                                                occurences={occurencesQualifications}
                                            />
                                        </div>
                                        <div className={`col-12 mb-3 ${experienceDisplay}`}>
                                            <div style={{height:0}}>
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={this.renderTooltipExperience}
                                                >
                                                    <BsBuilding className={"logo-carousel"}/>
                                                </OverlayTrigger>
                                            </div>
                                            <CvCarousel
                                                occurences={occurencesExperiences}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-12 col-xl-6"}>
                                    {this.renderOcurence()}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={"clearfix"}>
                    {/*{this.renderOccurences()}*/}
                </div>

                <div className={"container"} style={{minHeight: "250px"}}>
                    {/*{this.renderOcurence()}*/}
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

const mapDispatchToProps = (dispatch) => {

    return {
        setOccurences: (occurences) => dispatch(actions.occurences.setOccurences(occurences)),
        setExperienceList: (occurences) => dispatch(actions.experience.setExperienceList(occurences)),
        setQualificationList: (occurences) => dispatch(actions.qualification.setQualificationList(occurences)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OccurenceList);