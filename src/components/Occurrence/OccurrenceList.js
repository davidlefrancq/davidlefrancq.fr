import React, {Component, createRef, Fragment} from 'react';
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
import {OCCURRENCE_ALL, OCCURRENCE_EXPERIENCE, OCCURRENCE_QUALIFICATION} from "./occurence-type";
import Occurrence from "../../bo/Occurrence";
import "./occurrence-list.css";
import OccurrencesUtils from "../../utils/OccurrencesUtils";
import VarUtils from "../../utils/VarUtils";

const daoFactory = new DAOFactory();

class OccurrenceList extends Component {

    constructor(props) {
        super(props);
        const screenSize = ScreenDetection.getBootstrapSize();
        this.state = {
            occurrence: {},
            // style: {
            //     qualificationDisplay: "",
            //     experienceDisplay: "",
            // },
            screenSize: screenSize,
        };
        this.refOverlayQualification = createRef();
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

        if (state.screenSize !== screenSize || force === true) {

            state.screenSize = screenSize;

            // if (screenSize === "col-xl") {
            //     state.style.qualificationDisplay = "";
            //     state.style.experienceDisplay = "";
            // } else {
            //     if (state.style.qualificationDisplay !== "d-none" && state.style.experienceDisplay !== "d-none") {
            //         state.style.qualificationDisplay = "";
            //         state.style.experienceDisplay = "d-none";
            //     }
            // }

            this.setState(state);
        }
    }

    getStepsDates = () => {
        const {occurrences} = this.props;
        let dates = [];

        for (const id in occurrences) {
            const occurrence = occurrences[id];

            let date = OccurrencesUtils.getDate(occurrence)
            if (date != null && !isNaN(date.getTime())) {

                let dateExist = false;

                dates.forEach((item) => {

                    if (date.getFullYear() === item.title) {
                        dateExist = true;
                    }
                });

                if (dateExist === false) {
                    let stepDate = this.initiateStepDate(date);
                    dates.push(stepDate);
                }
            }
        }

        return dates;
    }

    initiateStepDate = (date) => {
        let stepDate = new Step(date.getFullYear(), "");
        stepDate.onClick = (year) => {
            if (year !== undefined && year !== null) {
                const occurrence = OccurrencesUtils.getOccurrenceClosestToYear(this.props.occurrences, year);
                this.setOccurrence(occurrence);
            }
        };
        return stepDate;
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

    renderOcurence = (firstDate, lastDate) => {
        const {occurrence} = this.props;
        if (occurrence !== undefined && occurrence !== null) {
            return (
                <OccurrenceItem occurrence={occurrence} firstDate={firstDate} lastDate={lastDate}/>
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
            const {year} = this.props;

            return (
                <DateBar steps={stepsDates} year={year}/>
            );
        }
    }

    getTargetDateBar() {
        let dateTarget = null;

        const {occurrence} = this.props;
        if (VarUtils.isNotUndefinedNull(occurrence)) {
            const date = OccurrencesUtils.getDate(this.props.occurrence);
            if (date instanceof Date) {
                dateTarget = date.getFullYear();
            }
        }

        return dateTarget;
    }

    // showQualification = () => {
    //     const state = {...this.state};
    //     state.style.experienceDisplay = "d-none";
    //     state.style.qualificationDisplay = "";
    //     this.setState(state);
    // }
    //
    // showExperience = () => {
    //     const state = {...this.state};
    //     state.style.experienceDisplay = "";
    //     state.style.qualificationDisplay = "d-none";
    //     this.setState(state);
    // }

    // renderMenu = () => {
    //     const {screenSize} = this.state
    //     if (screenSize !== "col-xl") {
    //         return (
    //             <Fragment>
    //                 <div className={"text-center mb-3 p-0"}>
    //
    //                     {/* Boutton Diplome */}
    //                     {this.renderButtonQualification()}
    //
    //                     {/* Boutton Experience */}
    //                     {this.renderButtonExperience()}
    //
    //                 </div>
    //             </Fragment>
    //         );
    //     }
    // }

    // renderButtonExperience() {
    //     return (
    //         <button className={"btn btn-secondary m-1 col-5 col-xl-12"}
    //                 onClick={this.showExperience}
    //                 style={{fontSize: "large"}}
    //         >
    //             <span style={{fontSize: "x-large", marginRight: "5px"}}>
    //                 <BsBuilding/>
    //             </span>
    //             <span> Expérience</span>
    //         </button>
    //     );
    // }
    //
    // renderButtonQualification() {
    //     return (
    //         <button className={"btn btn-secondary m-1 col-5 col-xl-12"}
    //                 onClick={this.showQualification}
    //                 style={{fontSize: "large"}}
    //         >
    //             <span style={{fontSize: "x-large"}}>
    //                 <GiDiploma/>
    //             </span>
    //             <span> Diplome</span>
    //         </button>
    //     );
    // }

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

        if (target !== undefined && target !== null) {
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
                if (occurrence.id === occurrencesExperiences[key].id) {
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
                if (occurrence.id === occurrencesQualifications[key].id) {
                    keyResult = key;
                }
            });
        }

        return keyResult;
    }

    setOccurrence = (occurrence) => {
        if (VarUtils.isNotUndefinedNull(occurrence)) {

            const {year} = this.props;
            const newDate = OccurrencesUtils.getDate(occurrence);
            const newYear = OccurrencesUtils.getYear(newDate);

            if(eval(year) !== eval(newYear)){

                this.props.setYear(newYear);
            }


            this.props.setOccurrence(occurrence);

            // if (Occurrence.isExperience(occurrence)) {
            //
            //     this.props.setExperience(occurrence);
            //     this.props.setQualification(null);
            //
            // }else if (Occurrence.isQualification(occurrence)) {
            //
            //     this.props.setExperience(null);
            //     this.props.setQualification(occurrence);
            //
            // }
        }
    }

    renderCvCarouselOccurrence = () => {
        return (
            <div>
                <CvCarousel type={OCCURRENCE_ALL} setOccurrence={this.setOccurrence}/>
            </div>
        );
    }

    renderQualificationList = () => {

        if (this.props.occurrences.length) {

            const occurrences = this.props.occurrences;
            const qualifications = OccurrencesUtils.getQualifications(occurrences).sort(OccurrencesUtils.occurrenceRevertSort);
            const qualificationsKeys = Object.keys(qualifications);

            return qualificationsKeys.map((key) => {
                const occurrence = qualifications[key];
                let selected = "";
                if(occurrence && this.props.occurrence){
                    if(occurrence.id == this.props.occurrence.id){
                        selected = "occurrence-list-selected";
                    }
                }

                // console.log(occurrence);

                return (
                    <div key={occurrence.id} className={`occurrence-list pl-2 pr-2 ${selected}`}>
                        {occurrence.qualification.name}
                    </div>
                );

            });
        }
    }

    renderExperienceList = () => {
        if (this.props.occurrences.length) {

            const occurrences = this.props.occurrences;
            const experiences = OccurrencesUtils.getExperiences(occurrences).sort(OccurrencesUtils.occurrenceRevertSort);
            const experiencesKeys = Object.keys(experiences);

            return experiencesKeys.map((key) => {
                const occurrence = experiences[key];
                let selected = "";
                if(occurrence && this.props.occurrence){
                    if(occurrence.id == this.props.occurrence.id){
                        selected = "occurrence-list-selected";
                    }
                }

                return (
                    <div key={occurrence.id} className={`occurrence-list pl-2 pr-2 ${selected}`}>
                        {occurrence.experience.enterprise.name}
                    </div>
                );
            });
        }
    }

    renderCvCarousel() {
        // const {qualificationDisplay, experienceDisplay} = this.state.style;
        return (
            <div className={"row"}>

                <div className={`col-12 mb-3`}>
                    {this.renderCvCarouselOccurrence()}
                </div>

                <div className={"col-12 d-none d-xl-block"}>

                    <div className={"row m-0 p-3"}>
                        <div className={"col-6 p-0"}>
                            {this.renderQualificationList()}
                        </div>
                        <div className={"col-6"}>
                            {this.renderExperienceList()}
                        </div>
                    </div>

                </div>

                {/*<div className={`col-12 mb-3 ${qualificationDisplay}`}>*/}
                {/*    {this.renderCvCarouselQualification()}*/}
                {/*</div>*/}

                {/*<div className={"col-12 d-none d-xl-block"} style={{height: "25px"}}></div>*/}

                {/*<div className={`col-12 mb-3 ${experienceDisplay}`}>*/}
                {/*    {this.renderCvCarouselExperience()}*/}
                {/*</div>*/}
            </div>
        );
    }

    renderCvCarouselExperience() {
        // const occurrencesExperiences = this.getExperiences();
        return (
            <Fragment>
                <div style={{height: 0}}>
                    {/*<OverlayTrigger*/}
                    {/*    placement="left"*/}
                    {/*    delay={{show: 250, hide: 400}}*/}
                    {/*    overlay={this.renderTooltipExperience}*/}
                    {/*>*/}
                    <div className={"logo-carousel logo-carousel-experience text-center"}>
                        <BsBuilding style={{
                            fontSize: "x-large"
                        }}/>
                    </div>
                    {/*</OverlayTrigger>*/}
                </div>
                <CvCarousel type={OCCURRENCE_EXPERIENCE} setOccurrence={this.setOccurrence}/>
            </Fragment>
        );
    }

    renderCvCarouselQualification() {
        // const occurrencesQualifications = this.getQualifications();
        return (
            <Fragment>
                <div style={{height: 0}}>
                    {/*<OverlayTrigger*/}
                    {/*    placement="left"*/}
                    {/*    delay={{show: 250, hide: 400}}*/}
                    {/*    overlay={this.renderTooltipQualification}*/}
                    {/*>*/}
                    <div ref={this.refOverlayQualification}
                         className={"logo-carousel logo-carousel-qualification text-center"}>
                        <GiDiploma style={{
                            fontSize: "x-large"
                        }}/>
                    </div>
                    {/*</OverlayTrigger>*/}
                </div>
                <CvCarousel type={OCCURRENCE_QUALIFICATION} setOccurrence={this.setOccurrence}/>
            </Fragment>
        );
    }


    getFirstDate = () => {

        let firstDate = null;

        const {occurrences} = this.props;
        const keys = Object.keys(occurrences);
        keys.map((key) => {

            const occurrence = occurrences[key];
            const type = OccurrencesUtils.getType(occurrence)
            if (type !== null) {

                // Qualification
                if (type === OCCURRENCE_QUALIFICATION) {

                    var tmpDate = OccurrencesUtils.getDate(occurrence);
                    if (tmpDate !== null) {

                        // Date of Qualification
                        if (firstDate === null) {
                            firstDate = tmpDate;
                        } else {
                            if (OccurrencesUtils.dateCompare(tmpDate, firstDate) < 0) {
                                firstDate = tmpDate;
                            }
                        }
                    }
                }

                // Experience
                if (type === OCCURRENCE_EXPERIENCE) {

                    var tmpDate = OccurrencesUtils.getDate(occurrence);
                    if (tmpDate !== null) {

                        // Date of Qualification
                        if (firstDate === null) {
                            firstDate = tmpDate;
                        } else {
                            if (OccurrencesUtils.dateCompare(tmpDate, firstDate) < 0) {
                                firstDate = tmpDate;
                            }
                        }
                    }
                }

            }
        });

        return firstDate;
    }

    getLastDate = () => {

        let lastDate = null;

        const {occurrences} = this.props;
        const keys = Object.keys(occurrences);
        keys.map((key) => {

            const occurrence = occurrences[key];
            const type = OccurrencesUtils.getType(occurrence)
            if (type !== null) {

                // Qualification
                if (type === OCCURRENCE_QUALIFICATION) {

                    var tmpDate = OccurrencesUtils.getDate(occurrence);
                    if (tmpDate !== null) {

                        // Date of Qualification
                        if (lastDate === null) {
                            lastDate = tmpDate;
                        } else {
                            if (OccurrencesUtils.dateCompare(tmpDate, lastDate) > 0) {
                                lastDate = tmpDate;
                            }
                        }
                    }
                }

                // Experience
                if (type === OCCURRENCE_EXPERIENCE) {

                    var tmpDate = OccurrencesUtils.getDate(occurrence);
                    if (tmpDate !== null) {

                        // Date of Qualification
                        if (lastDate === null) {
                            lastDate = tmpDate;
                        } else {
                            if (OccurrencesUtils.dateCompare(tmpDate, lastDate) > 0) {
                                lastDate = tmpDate;
                            }
                        }
                    }
                }

            }
        });

        return lastDate;
    }


    render() {

        const firstDate = this.getFirstDate();
        const lastDate = this.getLastDate();

        return (
            <Fragment>

                <div className={"row"}>

                    <div className={"col-12"} style={{zIndex: 999, marginTop: "-100px"}}>
                        <div className={"d-block d-xl-none"} style={{height: "100px"}}></div>
                        {this.renderDateBar()}
                    </div>

                    <div className={"col-12"}>
                        <div className={"container-fluid"}>
                            <div className={"row pr-4"}>
                                {/*<div className={"col-12"}>*/}
                                {/*    {this.renderMenu()}*/}
                                {/*</div>*/}

                                {/*<div className={"d-none d-xl-block col-xl-3 text-left"}>*/}
                                {/*    <Earth*/}
                                {/*        updateOccurenceSelected={this.updateOccurenceSelected}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                <div className={"col-12 col-xl-4"}>
                                    {this.renderCvCarousel()}
                                </div>

                                <div className={"col-12 col-xl-8 pl-5 pr-5"}>
                                    {this.renderOcurence(firstDate, lastDate)}
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
    const {occurrences, occurrence, year} = state.OccurrencesReducer;
    const experience = state.ExperienceReducer.occurrence;
    const qualification = state.QualificationReducer.occurrence;
    return {
        occurrences,
        occurrence,
        experience,
        qualification,
        year,
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
        setYear: (year) => dispatch(actions.occurrences.setYear(year)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OccurrenceList);