import React, {Component, createRef, Fragment} from 'react';
import CvCarousel from "../Corousel/CvCarousel";
import {connect} from "react-redux";
import {actions} from '../../actions';
import DAOFactory from "../../dal/DAOFactory";
import ScreenDetection from "../../utils/ScreenDetection";
import "./occurrence-list.css";
import Qualification from "../../bo/Qualification";
import Experience from "../../bo/Experience";
import OccurrenceItem from "./OccurrenceItem";
import Timeline from "../Timeline/Timeline";
import Technologies from "../Technologies/Technologies";
import {CgWebsite, FaMapMarkerAlt, GrFirefox, MdWeb} from "react-icons/all";
import LinkGoogleMap from "../LinkGoogleMap/LinkGoogleMap";

const daoFactory = new DAOFactory();

class OccurrenceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            target: 0,
            dateStart: 0,
            dateEnd: new Date(),
            load: "",
            carouselTitleClassCss: "",
            carouselTitleDisplay: "",
            carouselDateClassCss: "",
            carouselDateDisplay: "",
        };
    }

    componentDidMount() {
        const result = daoFactory.getOccurrenceDAO().selectAll();
        result.then((items) => {
            this.init(items);
        }, (error) => {
            console.error(error);
        });
    }

    init(items) {
        this.props.setOccurrences(items);
        this.initDates(items);
    }

    initDates(items) {
        let start;
        let end;

        for (const key in items) {
            const item = items[key];
            const {dateStart, dateEnd} = item;

            if (Number.parseInt(key) === 0) {

                if (dateStart && dateStart != "") {
                    start = new Date(dateStart);
                }
                if (dateEnd && dateEnd != "") {
                    end = new Date(dateEnd);
                }

            } else {

                if (dateStart && dateStart != "") {
                    const date = new Date(dateStart);
                    if (!start) {
                        start = date;
                    } else if (date < start) {
                        start = date;
                    }
                }

                if (dateEnd && dateEnd != "") {
                    const date = new Date(dateEnd);
                    if (!end) {
                        end = date;
                    } else if (date > end) {
                        end = date;
                    }
                }
            }
        }
        const state = {...this.state};
        state.dateStart = start;
        state.dateEnd = end;
        this.setState(state);
    }

    move = (value) => {

        const state = {...this.state};
        state.target += value;
        if (state.target < 0) {
            state.target = this.props.occurrences.length - 1;
        }
        if (state.target >= this.props.occurrences.length) {
            state.target = 0;
        }
        state.carouselTitleClassCss = "title-show-animation";
        state.carouselTitleDisplay = "none";
        state.carouselDateClassCss = "date-show-animation";
        state.carouselDateDisplay = "none";
        state.load = "load";
        this.setState(state);

        setTimeout(() => {
            const state = {...this.state};
            state.carouselTitleDisplay = "";
            state.carouselDateDisplay = "";
            this.setState(state);
        }, 500);

        setTimeout(() => {
            const state = {...this.state};
            state.load = "";
            state.carouselTitleClassCss = "";
            state.carouselDateClassCss = "";
            this.setState(state);
        }, 1000);
    }


    renderOccurenceType() {
        const occurrence = this.props.occurrences[this.state.target];
        let type = "";
        if (occurrence) {
            if (occurrence.experience) {
                type = "Experience Professionnel";
            }
            if (occurrence.qualification) {
                type = "Formation";
            }
        }
        return type;
    }

    renderOccurenceTitle() {
        const occurrence = this.props.occurrences[this.state.target];
        let title = "";
        if (occurrence) {
            if (occurrence.experience) {
                title = occurrence.experience.name;
            }
            if (occurrence.qualification) {
                title = occurrence.qualification.name;
            }
        }
        return title;
    }

    renderOccurenceLogo() {
        const occurrence = this.props.occurrences[this.state.target];
        let logo = null;
        if (occurrence) {
            if (occurrence.experience) {
                logo = occurrence.experience.enterprise.logo;
            }
            if (occurrence.qualification) {
                logo = occurrence.qualification.trainingCenter.logo;
            }
        }

        if (logo && logo != "") {
            return <img style={{height: 75, borderRadius: 40}} src={`./image/${logo}`}/>;
        }
    }

    renderOccurenceLink() {
        const occurrence = this.props.occurrences[this.state.target];
        let link = null;
        if (occurrence) {
            if (occurrence.experience) {
                link = occurrence.experience.enterprise.url;
            }
            if (occurrence.qualification) {
                link = occurrence.qualification.trainingCenter.url;
            }
        }

        if (link && link != "") {
            return (
                <a href={link} target={"_blank"}>
                    {this.renderOccurenceLogo()}
                </a>
            );
        }

        return this.renderOccurenceLogo();
    }

    renderDates() {
        const occurrence = this.props.occurrences[this.state.target];
        if (occurrence) {
            const {dateStart, dateEnd} = occurrence;
            let dates = "";
            if (occurrence) {
                const start = new Date(dateStart);
                const end = new Date(dateEnd);

                if (dateStart) {
                    dates += start.getFullYear();
                }

                if (dateEnd) {
                    if (start.getFullYear() < end.getFullYear()) {
                        if (dates != "") {
                            dates += " - ";
                        }
                        dates += end.getFullYear();
                    }
                }
            }
            return dates;
        }
    }

    renderCvCarouselOccurrence = () => {
        return (
            <div className={"mr-auto ml-auto"} style={{
                position: "relative",
                width: 1000,
                height: 421,
            }}>
                <CvCarousel
                    images={this.props.images}
                    callback={this.move}
                />
                <div className={this.state.carouselTitleClassCss} style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.95)",
                    paddingTop: 15,
                    paddingBottom: 0,
                    paddingLeft: 25,
                    paddingRight: 15,
                }}>
                    <h2 style={{display: this.state.carouselTitleDisplay}}>
                        <div className={"codeBlue"}>
                            {this.renderOccurenceType()}
                            {' { '}
                        </div>
                        <div className={"ml-5"} style={{maxWidth: 600}}>
                            {this.renderOccurenceTitle()}
                        </div>
                        <div className={"codeBlue"}>{' }'}</div>
                        {/*<div style={{*/}
                        {/*    position: "absolute",*/}
                        {/*    right: 25,*/}
                        {/*    top: "20%",*/}
                        {/*    height: 75,*/}
                        {/*}}>*/}
                        {/*    {this.renderOccurenceLink()}*/}
                        {/*</div>*/}
                    </h2>
                </div>

                <div className={this.state.carouselDateClassCss} style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    padding: 2,
                    textAlign: "center",
                    fontSize: "x-large",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    color: "rgba(255,255,255,0.75)",
                    backgroundColor: "rgba(0,0,0,0.95)",
                }}>
                    <div style={{display: this.state.carouselDateDisplay}}>
                        {'/ '}
                        {this.renderDates()}
                        {' /'}
                    </div>
                </div>

            </div>
        );
    }

    renderTimeline() {
        const occurrence = this.props.occurrences[this.state.target];
        if (occurrence) {
            return (
                <Timeline
                    firstDate={this.state.dateStart}
                    lastDate={this.state.dateEnd}
                    dateStart={occurrence.dateStart}
                    dateEnd={occurrence.dateEnd}
                />
            );
        }
    }

    renderTechnologies() {
        const occurrence = this.props.occurrences[this.state.target];
        if (occurrence) {
            if (occurrence.experience) {
                const technologies = occurrence.experience.technologicalCategories;
                return <Technologies technologies={technologies}/>;
            }
        }
    }

    renderDescription() {
        const occurrence = this.props.occurrences[this.state.target];
        if (occurrence) {

            if (occurrence.experience) {
                return occurrence.experience.comment;
            }

            if (occurrence.qualification) {
                const {objectives, jobs} = occurrence.qualification;
                return (
                    <div style={{position: "relative"}}>
                        {objectives}
                        {this.renderJobsList(jobs)}
                    </div>
                );
            }

        }
    }

    renderJobsList(jobs) {
        if (jobs && jobs.length > 0) {
            return (
                <div className={"mt-3"} style={{position: "absolute"}}>
                    <h3 style={{fontSize: "large"}}>Emplois cibles</h3>
                    <ul>
                        {this.renderJobs(jobs)}
                    </ul>
                </div>
            );
        }
    }

    renderJobs(jobs) {
        return jobs.map((job, index) => {
            return this.renderJob(job, index);
        });
    }

    renderJob(job, index) {
        if (job != undefined && job != null && job.name != "") {
            return (
                <li key={index}>
                    {job.name}
                </li>
            );
        }
    }

    renderInfo() {
        const occurrence = this.props.occurrences[this.state.target];
        if (occurrence) {

            if (occurrence.experience) {
                const {enterprise} = occurrence.experience;
                const {address, postalCode, city} = enterprise;
                return (
                    <div className={"pt-2"}>
                        {this.renderOccurenceLink()}
                        <h3 className={"mt-2"} style={{fontSize: "large"}}>{enterprise.name}</h3>
                        <div>{enterprise.postalCode} {enterprise.city}</div>
                        <div className={"mt-4 flex text-center"}>
                            <a className={"ml-3 mr-3"} href={enterprise.url} target={"_blank"}>
                                <GrFirefox size={32}/>
                            </a>
                            <a className={"ml-3 mr-3"} href={"#"}>
                                <LinkGoogleMap address={address} postalCode={postalCode} city={city}/>
                            </a>
                        </div>
                    </div>
                );

            } else if (occurrence.qualification) {

                const {trainingCenter} = occurrence.qualification;
                const {address, postalCode, city} = trainingCenter;
                return (
                    <div className={"pt-2"}>
                        {this.renderOccurenceLink()}
                        <h3 className={"mt-2"} style={{fontSize: "large"}}>{trainingCenter.name}</h3>
                        <div>{trainingCenter.postalCode} {trainingCenter.city}</div>
                        <div className={"mt-4 flex text-center"}>
                            <a className={"ml-3 mr-3"} href={trainingCenter.url} target={"_blank"}>
                                <GrFirefox size={32}/>
                            </a>
                            <a className={"ml-3 mr-3"} href={"#"}>
                                <LinkGoogleMap address={address} postalCode={postalCode} city={city}/>
                            </a>
                        </div>
                    </div>
                );
            }
        }
    }

    renderCvCarousel() {

        return (
            <div className={"row"}>

                <div className={`col-2`}>
                    {this.renderInfo()}
                </div>

                <div className={`col-7 mt-0 mb-4 ml-0 mr-0 p-0`}>
                    {this.renderCvCarouselOccurrence()}
                </div>

                <div className={`col-3 pt-5 pl-4 pr-4 text-justify`}>
                    {this.renderDescription()}
                </div>

                <div className={`offset-2 col-7 mt-4 mb-5`}>
                    {this.renderTimeline()}
                </div>

                <div className={`offset-2 col-7 mt-5 pt-3 text-center`}>
                    {this.renderTechnologies()}
                </div>

            </div>
        );
    }


    render() {
        return (
            <div className={"container-fluid"}>
                {this.renderCvCarousel()}
            </div>
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
