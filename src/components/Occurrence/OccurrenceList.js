import React, {Component, Fragment} from 'react';
import OccurrenceItem from "./OccurrenceItem";
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

class OccurrenceList extends Component {

    constructor(props) {
        super(props);
        const screenSize = ScreenDetection.getBootstrapSize();
        this.state = {
            occurrence: {},
            style: {
                qualificationDisplay: "",
                experienceDisplay: "",
            },
            screenSize: screenSize,
        };
    }

    componentDidMount() {
        const result = daoFactory.getOccurrenceDAO().selectAll();
        result.then((res) => {
            const {data} = res;
            const items = data['hydra:member'];

            this.props.setOccurrences(items);
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
        const {occurrences} = this.props;
        const occurrencesQualifications = [];

        for (const id in occurrences) {
            const occurrence = occurrences[id];
            const {qualification} = occurrence;
            if (qualification != undefined && qualification != null) {
                occurrencesQualifications.push(occurrence);
            }
        }

        this.props.setQualificationList(occurrencesQualifications);

        return occurrencesQualifications;
    }

    getExperiences() {
        const {occurrences} = this.props;
        const occurrencesExperiences = [];

        for (const id in occurrences) {
            const occurrence = occurrences[id];
            const {experience} = occurrence;
            if (experience != undefined && experience != null) {
                occurrencesExperiences.push(occurrence);
            }
        }

        this.props.setExperienceList(occurrencesExperiences);

        return occurrencesExperiences;
    }

    getStepsDates() {
        const {occurrences} = this.props;
        let dates = [];

        for (const id in occurrences) {
            const occurrence = occurrences[id];
            const {dateStart, dateEnd} = occurrence;

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

    renderOccurrences() {
        const {occurrences} = this.props;
        const occurrencesIds = Object.keys(occurrences);

        return occurrencesIds.map((key) => {
            return (
                <OccurrenceItem key={key} occurrence={occurrences[key]}/>
            );
        });
    }

    renderOcurence() {
        const {occurrence} = this.props;
        if (occurrence != undefined && occurrence != null) {
            return (
                <OccurrenceItem occurrence={occurrence}/>
            );
        }
    }

    renderDateBar() {

        let i = 0;
        for (let item in this.props.occurrences) {
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
                Expérience
                <br/>
                Professionnelle
            </Tooltip>
        );
    }

    render() {
        const {qualificationDisplay, experienceDisplay} = this.state.style;

        const occurrencesQualifications = this.getQualifications();
        const occurrencesExperiences = this.getExperiences();

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
                                <div className={"col-12 col-xl-3"}>
                                    <div className={"row"}>
                                        <div className={`col-12 mb-3 ${qualificationDisplay}`}>
                                            <div style={{height:0}}>
                                                <OverlayTrigger
                                                    placement="left"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={this.renderTooltipQualification}
                                                >
                                                    <div className={"logo-carousel text-center"}>
                                                        <GiDiploma style={{
                                                            fontSize:"x-large"
                                                        }}/>
                                                    </div>
                                                </OverlayTrigger>
                                            </div>
                                            <CvCarousel
                                                occurrences={occurrencesQualifications}
                                            />
                                        </div>

                                        <div className={"col-12 d-none d-xl-block"} style={{height:"25px"}}></div>

                                        <div className={`col-12 mb-3 ${experienceDisplay}`}>
                                            <div style={{height:0}}>
                                                <OverlayTrigger
                                                    placement="left"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={this.renderTooltipExperience}
                                                >
                                                    <div className={"logo-carousel text-center"}>
                                                        <BsBuilding style={{
                                                            fontSize:"x-large"
                                                        }}/>
                                                    </div>
                                                </OverlayTrigger>
                                            </div>
                                            <CvCarousel
                                                occurrences={occurrencesExperiences}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-xl-auto d-none d-xl-block"} style={{minWidth:"75px"}}></div>
                                <div className={"col-12 col-xl-6"}>
                                    {this.renderOcurence()}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={"clearfix"}>
                    {/*{this.renderOccurrences()}*/}
                </div>

                <div className={"container"}>
                    {/*{this.renderOcurence()}*/}
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const {occurrences, occurrence} = state.OccurrencesReducer;
    return {
        occurrences: occurrences,
        occurrence,
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        setOccurrences: (occurrences) => dispatch(actions.occurrences.setOccurrences(occurrences)),
        setExperienceList: (occurrences) => dispatch(actions.experience.setExperienceList(occurrences)),
        setQualificationList: (occurrences) => dispatch(actions.qualification.setQualificationList(occurrences)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OccurrenceList);