import React, {Component, Fragment} from 'react';
import OccurrenceItem from "./OccurrenceItem";
import CvCarousel from "../Corousel/CvCarousel";
import DateBar from "../DateBar/DateBar";
import Step from "../../bo/Step";
import {connect} from "react-redux";
import {actions} from '../../actions';
import DAOFactory from "../../dal/DAOFactory";
import ScreenDetection from "../../utils/ScreenDetection";
import {BsBuilding} from 'react-icons/bs';
import {GiDiploma} from 'react-icons/gi';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import Earth from "../Planets/Earth";
import {OCCURRENCE_EXPERIENCE, OCCURRENCE_QUALIFICATION} from "./occurence-type";
import Occurrence from "../../bo/Occurrence";
import "./occurrence-list.css";
import OccurrencesUtils from "../../utils/OccurrencesUtils";

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
        }, (error) => {
            console.log(error);
        });

        // Lorsque l'écran change de résolution
        window.addEventListener("resize", this.screenResizeEvent);
        this.screenResizeEvent(true);
    }

    screenResizeEvent = (force) => {

        const state = {...this.state};
        const screenSize = ScreenDetection.getBootstrapSize();

        if (state.screenSize != screenSize || force == true) {

            state.screenSize = screenSize;

            if (screenSize == "col-xl") {
                state.style.qualificationDisplay = "";
                state.style.experienceDisplay = "";
            } else {
                if (state.style.qualificationDisplay != "d-none" && state.style.experienceDisplay != "d-none") {
                    state.style.qualificationDisplay = "";
                    state.style.experienceDisplay = "d-none";
                }
            }

            this.setState(state);
        }
    }

    getStepsDates = () => {
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
                    stepDate.onClick = (year) => {

                        if (year != undefined && year != null) {

                            const experience = OccurrencesUtils.getExperienceByYear(this.props.occurrences, year);
                            const qualification = OccurrencesUtils.getQualificationByYear(this.props.occurrences, year);

                            const occurrence = OccurrencesUtils.getClosestToYear(experience,qualification,year);
                            if(Occurrence.isExperience(occurrence)){
                                this.props.setExperience(experience)
                                this.props.setQualification(null)
                            }else if(Occurrence.isQualification(occurrence)) {
                                this.props.setExperience(null)
                                this.props.setQualification(qualification)
                            }

                        }
                    };
                    dates.push(stepDate);
                }
            }
        }

        return dates;
    }

    renderOccurrences = () => {
        const {occurrences} = this.props;
        const occurrencesIds = Object.keys(occurrences);

        return occurrencesIds.map((key) => {
            return (
                <OccurrenceItem key={key} occurrence={occurrences[key]}/>
            );
        });
    }

    renderOcurence = () => {
        const {occurrence} = this.props;
        if (occurrence != undefined && occurrence != null) {
            return (
                <OccurrenceItem occurrence={occurrence}/>
            );
        } else {
            return (
                <div
                    className={"border w-100 h-100 bg-light"}
                    style={{
                        borderRadius: "25px 0 25px 0",
                    }}
                ></div>
            );
        }
    }

    renderDateBar = () => {

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

    renderMenu = () => {
        const {screenSize} = this.state
        if (screenSize != "col-xl") {
            return (
                <Fragment>
                    <div className={"text-center mb-3 p-0"}>

                        {/* Boutton Diplome */}
                        {this.renderButtonQualification()}

                        {/* Boutton Experience */}
                        {this.renderButtonExperience()}

                    </div>
                </Fragment>
            );
        }
    }

    renderButtonExperience() {
        return (
            <button className={"btn btn-secondary m-1 col-5 col-xl-12"}
                    onClick={this.showExperience}
                    style={{fontSize: "large"}}
            >
                <span style={{fontSize: "x-large", marginRight: "5px"}}>
                    <BsBuilding/>
                </span>
                <span> Expérience</span>
            </button>
        );
    }

    renderButtonQualification() {
        return (
            <button className={"btn btn-secondary m-1 col-5 col-xl-12"}
                    onClick={this.showQualification}
                    style={{fontSize: "large"}}
            >
                <span style={{fontSize: "x-large"}}>
                    <GiDiploma/>
                </span>
                <span> Diplome</span>
            </button>
        );
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
            <Tooltip id="button-tooltip-experience" {...props}>
                Expérience
                <br/>
                Professionnelle
            </Tooltip>
        );
    }

    updateOccurenceSelected = (target) => {

        if (target != undefined && target != null) {
            if (this.isItemExistInOccurrences()) {

                const occurrence = this.props.occurrences[target];
                this.props.setOccurrence(occurrence);

                if (Occurrence.isExperience()) {
                    this.updateExperienceSelected(occurrence);
                }

                if (Occurrence.isQualification()) {
                    this.updateQualificationSelected(occurrence);
                }
            }
        }
    }

    updateExperienceSelected = (occurrence) => {
        const targetExperience = this.getTargetExperience(occurrence);
        if (targetExperience != null && targetExperience >= 0) {
            this.props.setExperienceSelected(targetExperience);
        }

    }

    updateQualificationSelected = (occurrence) => {
        const targetQualification = this.getTargetQailification(occurrence);
        if (targetQualification != null && targetQualification >= 0) {
            this.props.setQualificationSelected(targetQualification);
        }
    }


    isItemExistInOccurrences() {
        const {occurrences} = this.props;
        let isExist = false;

        const occurrencesKeys = Object.keys(occurrences);
        if (occurrencesKeys.length > 0) {
            isExist = true;
        }

        return isExist;
    }

    getTargetExperience(occurrence) {

        const occurrencesExperiences = this.getExperiences();
        let keyResult = null;

        if (occurrencesExperiences) {
            const keys = Object.keys(occurrencesExperiences);
            keys.map((key) => {
                if (occurrence.id == occurrencesExperiences[key].id) {
                    keyResult = key;
                }
            });
        }

        return keyResult;
    }

    getTargetQailification(occurrence) {
        const occurrencesQualifications = this.getQualifications();
        let keyResult = null;

        if (occurrencesQualifications) {
            const keys = Object.keys(occurrencesQualifications);
            keys.map((key) => {
                if (occurrence.id == occurrencesQualifications[key].id) {
                    keyResult = key;
                }
            });
        }

        return keyResult;
    }

    renderCvCarousel() {
        const {qualificationDisplay, experienceDisplay} = this.state.style;
        return (
            <div className={"row"}>
                <div className={`col-12 mb-3 ${qualificationDisplay}`}>
                    {this.renderCvCarouselQualification()}
                </div>

                <div className={"col-12 d-none d-xl-block"} style={{height: "25px"}}></div>

                <div className={`col-12 mb-3 ${experienceDisplay}`}>
                    {this.renderCvCarouselExperience()}
                </div>
            </div>
        );
    }

    renderCvCarouselExperience() {
        // const occurrencesExperiences = this.getExperiences();
        return (
            <Fragment>
                <div style={{height: 0}}>
                    <OverlayTrigger
                        placement="left"
                        delay={{show: 250, hide: 400}}
                        overlay={this.renderTooltipExperience}
                    >
                        <div className={"logo-carousel logo-carousel-experience text-center"}>
                            <BsBuilding style={{
                                fontSize: "x-large"
                            }}/>
                        </div>
                    </OverlayTrigger>
                </div>
                <CvCarousel type={OCCURRENCE_EXPERIENCE}/>
            </Fragment>
        );
    }

    renderCvCarouselQualification() {
        // const occurrencesQualifications = this.getQualifications();
        return (
            <Fragment>
                <div style={{height: 0}}>
                    <OverlayTrigger
                        placement="left"
                        delay={{show: 250, hide: 400}}
                        overlay={this.renderTooltipQualification}
                    >
                        <div className={"logo-carousel logo-carousel-qualification text-center"}>
                            <GiDiploma style={{
                                fontSize: "x-large"
                            }}/>
                        </div>
                    </OverlayTrigger>
                </div>
                <CvCarousel type={OCCURRENCE_QUALIFICATION}/>
            </Fragment>
        );
    }


    render() {

        return (
            <Fragment>

                <div className={"row"}>

                    <div className={"col-12"} style={{zIndex: 999999999}}>
                        {this.renderDateBar()}
                    </div>

                    <div className={"col-12"}>
                        <div className={"container-fluid"}>
                            <div className={"row pr-4"}>
                                <div className={"col-12"}>
                                    {this.renderMenu()}
                                </div>

                                <div className={"d-none d-xl-block col-xl-3 text-left"}>
                                    <Earth
                                        updateOccurenceSelected={this.updateOccurenceSelected}
                                    />
                                </div>

                                <div className={"col-12 col-xl-3"}>
                                    {this.renderCvCarousel()}
                                </div>

                                <div className={"col-12 col-xl-6 pl-5 pr-5"}>
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
        setExperienceSelected: (id) => dispatch(actions.experience.setExperienceSelected(id)),
        setQualificationSelected: (id) => dispatch(actions.qualification.setQualificationSelected(id)),
        setOccurrence: (occurrence) => dispatch(actions.occurrences.setOccurrence(occurrence)),
        setOccurrences: (occurrences) => dispatch(actions.occurrences.setOccurrences(occurrences)),
        setQualification: (occurrence) => dispatch(actions.qualification.setQualification(occurrence)),
        setExperience: (occurrence) => dispatch(actions.experience.setExperience(occurrence)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OccurrenceList);