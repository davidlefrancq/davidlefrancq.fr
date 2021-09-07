import React, {Component} from 'react';
import CvCarousel from "../Corousel/CvCarousel";
import {connect} from "react-redux";
import {actions} from '../../actions';
import DAOFactory from "../../dal/DAOFactory";
import "./occurrence-list.css";
import Timeline from "../Timeline/Timeline";
import Technologies from "../Technologies/Technologies";

import InfoEntity from "./InfoEntity";

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
            displayElements: true,
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
        state.displayElements = false;
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
            state.displayElements = true;
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

        let animated = "";
        if (!this.state.displayElements) {
            animated = "top-animated";
        }

        return (
            <div className={"mr-auto ml-auto"} style={{
                position: "relative",
                width: "100%",
            }}>
                <CvCarousel
                    images={this.props.images}
                    callback={this.move}
                    displayBtn={this.state.displayElements}
                />
                <div className={`${this.state.carouselTitleClassCss} ${animated}`} style={{
                    position: "absolute",
                    top: "36%",
                    left: "20%",
                    width: "60%",
                    backgroundColor: "rgba(0,0,0,0.95)",
                    padding:15,
                    borderRadius: 15,
                }}>
                    <h2 style={{display: this.state.carouselTitleDisplay}}>
                        <div className={"codeOrange"}>
                            {this.renderOccurenceType()}
                            {` ( ${this.renderDates()} ) { `}
                        </div>
                        <div className={"ml-5"} style={{maxWidth: 600}}>
                            {this.renderOccurenceTitle()}
                        </div>
                        <div className={"codeOrange"}>{' }'}</div>
                    </h2>
                </div>

                {/*<div className={`${this.state.carouselDateClassCss}`} style={{*/}
                {/*    position: "absolute",*/}
                {/*    bottom: "0",*/}
                {/*    left: "0",*/}
                {/*    width: "100%",*/}
                {/*    padding: 2,*/}
                {/*    textAlign: "center",*/}
                {/*    fontSize: "x-large",*/}
                {/*    fontFamily: "monospace",*/}
                {/*    fontWeight: "bold",*/}
                {/*    color: "rgba(255,255,255,0.75)",*/}
                {/*    backgroundColor: "rgba(0,0,0,0.95)",*/}
                {/*}}>*/}
                {/*    <div style={{display: this.state.carouselDateDisplay}}>*/}
                {/*        {'/ '}*/}
                {/*        {this.renderDates()}*/}
                {/*        {' /'}*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        );
    }

    renderTimeline() {
        const occurrence = this.props.occurrences[this.state.target];
        if (occurrence) {

            let animated = "";
            if (!this.state.displayElements) {
                animated = "bottom-animated";
            }

            return (
                <div className={`p-3 rounded ${animated}`} style={{minHeight: 115, backgroundColor: "rgba(0,0,0,0.5)"}}>
                    <div className={`mt-3 ml-5 mr-5`}>
                        <Timeline
                            firstDate={this.state.dateStart}
                            lastDate={this.state.dateEnd}
                            dateStart={occurrence.dateStart}
                            dateEnd={occurrence.dateEnd}
                        />
                    </div>
                </div>
            );
        }
    }

renderTechnologies() {
    const
    occurrence = this.props.occurrences[this.state.target];

    if(occurrence) {
        let animated = "";
        if (!this.state.displayElements) {
            animated = "left-animated";
        }

        let technologies;
        if (occurrence.qualification) {
            technologies = occurrence.qualification.technologicalCategories;
        } else if (occurrence.experience) {
            technologies = occurrence.experience.technologicalCategories;
        }

        if (technologies && technologies.length > 0) {
            return (
                <div className={`p-3 rounded ${animated}`} style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
                    <h3 style={{fontSize: "large"}}>Techno(s)</h3>
                    <Technologies technologies={technologies}/>
                </div>
            );
        }
    }
}

renderDescription()
{
    const occurrence = this.props.occurrences[this.state.target];
    if (occurrence) {

        let animated = "";
        if (!this.state.displayElements) {
            animated = "right-animated";
        }

        if (occurrence.experience) {
            return (
                <div className={`p-3 rounded ${animated}`} style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
                    <h3 style={{fontSize: "large"}}>Description</h3>
                    {occurrence.experience.comment}
                </div>
            );
        }

        if (occurrence.qualification) {
            const {objectives, jobs} = occurrence.qualification;
            return (
                <div className={`${animated}`} style={{position: "relative"}}>
                    <div className={"p-3 rounded"} style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
                        <h3 style={{fontSize: "large"}}>Description</h3>
                        {objectives}
                    </div>
                    {this.renderJobsList(jobs)}
                </div>
            );
        }

    }
}

renderJobsList(jobs)
{
    if (jobs && jobs.length > 0) {
        return (
            <div className={"mt-3 p-3 rounded"} style={{backgroundColor: "rgba(0,0,0,0.5)", position: "absolute"}}>
                <h3 style={{fontSize: "large"}}>Emplois cibles</h3>
                <ul className={"pr-3"}>
                    {this.renderJobs(jobs)}
                </ul>
            </div>
        );
    }
}

renderJobs(jobs)
{
    return jobs.map((job, index) => {
        return this.renderJob(job, index);
    });
}

renderJob(job, index)
{
    if (job != undefined && job != null && job.name != "") {
        return (
            <li key={index}>
                {job.name}
            </li>
        );
    }
}

renderInfo()
{
    const occurrence = this.props.occurrences[this.state.target];
    if (occurrence) {
        let entity = null;
        let animated = "";
        if (!this.state.displayElements) {
            animated = "left-animated";
        }

        if (occurrence.experience) {
            entity = occurrence.experience.enterprise;

        } else if (occurrence.qualification) {
            entity = occurrence.qualification.trainingCenter;
        }

        if (entity) {
            return <InfoEntity entity={entity} animated={animated}/>;
        }
    }
}

renderCvCarousel()
{
    return (
        <div className={"row"}>

            <div className={`col-12 col-md-2`}>
                {this.renderInfo()}

                <div className={`d-none d-md-block mt-4`} style={{minHeight: 50}}>
                    {this.renderTechnologies()}
                </div>

            </div>

            <div className={`col-12 col-md-7 mt-2 mb-0 ml-0 mr-0 rounded`}>
                {this.renderCvCarouselOccurrence()}

                <div className={`mt-3`}>
                    {this.renderTimeline()}
                </div>

            </div>

            <div className={`col-12 col-md-3 mt-2 mb-0 ml-0 mr-0 text-justify`}>

                <div className={`d-block d-md-none mt-4 mb-4`} style={{minHeight: 50}}>
                    {this.renderTechnologies()}
                </div>

                {this.renderDescription()}
            </div>

        </div>
    );
}

render()
{
    return (
        <div className={"container-fluid"}>
            {this.renderCvCarousel()}
        </div>
    );
}
}

const mapStateToProps = (state) =>
{
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
}
;

const mapDispatchToProps = (dispatch) =>
{

    return {
        setExperienceSelected: (id) => dispatch(actions.experience.setExperienceSelected(id)),
        setQualificationSelected: (id) => dispatch(actions.qualification.setQualificationSelected(id)),
        setOccurrence: (occurrence) => dispatch(actions.occurrences.setOccurrence(occurrence)),
        setOccurrences: (occurrences) => dispatch(actions.occurrences.setOccurrences(occurrences)),
        setQualification: (occurrence) => dispatch(actions.qualification.setQualification(occurrence)),
        setExperience: (occurrence) => dispatch(actions.experience.setExperience(occurrence)),
        setYear: (year) => dispatch(actions.occurrences.setYear(year)),
    };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(OccurrenceList);
