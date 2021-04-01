import React, {Component, Fragment} from 'react';
import {Card} from 'react-bootstrap';
import MonthFr from "../../utils/MonthFr";
import FirstCharUppercase from "../../utils/FirstCharUppercase";
import {BsBuilding, BsFillInfoCircleFill, BsLink, BsCalendar, BsLink45Deg} from "react-icons/bs";
import {GoCalendar} from "react-icons/go";
import {GiDiploma} from 'react-icons/gi';
import {MdWork} from "react-icons/md";
import {FaGraduationCap} from "react-icons/fa";
import DOMPurify from 'dompurify';
import {
    STRING_DEGREE, STRING_LINKS, STRING_QUALIFICATION_ACCESSIBLE_EMPLOYMENT,
    STRING_QUALIFICATION_ROLES
} from "../../translation/fr-fr";

class QualificationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objectives: {
                css: "active",
                display: "block",
            },
            jobs: {
                css: "",
                display: "none",
            },
            links: {
                css: "",
                display: "none",
            },
        };
        this.showObjectives = this.showObjectives.bind(this);
        this.showJobs = this.showJobs.bind(this);
        this.showLinks = this.showLinks.bind(this);
    }

    showObjectives() {
        const {qualification} = this.props.occurrence;
        const {objectives} = qualification;
        const disabled = (objectives && objectives != "") ? false : true;

        if(!disabled) {

            const state = this.setObjectivesSelected();

            state.objectives.display = "block";
            state.jobs.display = "none";
            state.links.display = "none";

            this.setState(state);
        }
    }

    showJobs() {
        const {qualification} = this.props.occurrence;
        const {jobs} = qualification;
        const disabled = jobs.length > 0 ? false : true;

        if(!disabled) {

            const state = this.setJobsSelected();

            state.objectives.display = "none";
            state.jobs.display = "block";
            state.links.display = "none";

            this.setState(state);
        }
    }

    showLinks() {
        const {qualification} = this.props.occurrence;
        const {links} = qualification;
        const disabled = links.length > 0 ? false : true;

        if(!disabled) {

            const state = this.setLinksSelected();

            state.objectives.display = "none";
            state.jobs.display = "none";
            state.links.display = "block";

            this.setState(state);
        }
    }


    setObjectivesSelected = () => {
        const state = {...this.state};
        state.objectives.css = "active";
        state.jobs.css = "";
        state.links.css = "";
        return state;
    }

    setJobsSelected = () => {
        const state = {...this.state};
        state.objectives.css = "";
        state.jobs.css = "active";
        state.links.css = "";
        return state;
    }

    setLinksSelected = () => {
        const state = {...this.state};
        state.objectives.css = "";
        state.jobs.css = "";
        state.links.css = "active";
        return state;
    }

    isLessOneYear(date) {
        let result = false;
        const now = new Date();
        const oneYear = now - (60 * 60 * 24 * 365);
        let dateDiff = now - this.props.occurrence.dateEnd;
        if (dateDiff < oneYear) {
            result = true;
        }
        return result;
    }

    renderJobs(jobs) {
        return (
            <div className={"row"}>
                {this.formatJobRendering(jobs)}
            </div>
        );
    }

    formatJobRendering(jobs) {
        const jobsKeys = Object.keys(jobs);
        return jobsKeys.map((key) => {
            const job = jobs[key];
            return (
                <Fragment key={key}>
                    {this.renderJob(job)}
                </Fragment>
            );
        });
    }

    renderJob(job) {
        if (job != undefined && job != null) {
            return (
                <div className={"col-12"}>
                    <div className={"row"}>
                        <div className="col-2"></div>
                        <div className="col-8 border border-top-0 border-left-0 border-right-0 p-2 mb-2">
                            {job.name}

                        </div>
                    </div>
                </div>
            );
        }
    }

    renderLinks(links) {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    {this.formatLinkRendering(links)}
                </div>
            </div>
        );
    }

    formatLinkRendering(links) {
        const linksKeys = Object.keys(links);
        return linksKeys.map((key) => {
            const link = links[key];
            return (
                this.renderLink(link)
            );
        });
    }

    renderLink(link) {
        return (
            <a key={link.name} className={"col-4 btn btn-primary m-1 pl-2"} href={link.url} target={"_blank"}>
                <BsLink45Deg style={{fontSize: "large"}}/> {link.name}
            </a>
        );
    }

    renderObjectives(objectives) {
        if (objectives != undefined && objectives != null) {
            return (
                <div className={"text-justify p-3"}
                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(objectives)}}>
                    {/*{objectives}*/}
                </div>
            );
        }
    }

    renderTrainingCenter(trainingCenter) {
        const {name, logo, address, postalCode, city, url} = trainingCenter;

        let fullAddress = "";
        fullAddress += address ? address : "";
        fullAddress += address && postalCode ? " " : "";
        fullAddress += postalCode ? postalCode : "";
        fullAddress += postalCode && fullAddress ? " " : "";
        fullAddress += city ? city : "";

        return (
            <Fragment>


                <div className={"row"}>
                    <div className={"col-4"}>
                        <div className={"row"}>
                            <div className={"col-12 text-center"}>
                                {this.renderTrainingCenterLogo(url, logo)}
                            </div>
                            <div className={"col-12 text-center"}>
                                {this.renderTrainingCenterLink(url, name)}
                            </div>
                        </div>
                    </div>
                    <div className={"col-8 m-0 pl-0 pr-5 pt-0 pb-0"}>
                        {this.renderTrainingCenterLinkGoogleMap(fullAddress)}
                    </div>
                </div>

                {/*<div className={"col-4 text-right"}>*/}

                {/*    {this.renderTrainingCenterLogo(url, logo)}*/}

                {/*    {this.renderTrainingCenterLink(url, name)}*/}

                {/*</div>*/}

                {/*<div className={"col-4 text-left pt-2"}>*/}

                {/*    {this.renderTrainingCenterLinkGoogleMap(fullAddress)}*/}

                {/*</div>*/}
            </Fragment>
        );
    }

    renderTrainingCenterLogo(trainingCenter) {
        const {logo, url} = trainingCenter;
        if (url != undefined && url != null && url != "") {
            return (
                <a href={url}>
                    <img className={"mr-1"} src={logo} style={{height: "100px"}}/>
                </a>
            );
        } else if (logo != undefined && logo != null && logo != "") {
            return (
                <img className={"mr-1"} src={logo} style={{height: "100px"}}/>
            );
        }
    }

    renderTrainingCenterLink(trainingCenter) {

        const {name, url} = trainingCenter;

        if (url != undefined && url != null && url != "") {
            return (
                <a href={url} target={"_blank"}>
                    {name}
                </a>
            );
        } else {
            return (
                <Fragment>
                    {name}
                </Fragment>
            );
        }
    }

    renderTrainingCenterLinkGoogleMap(trainingCenter) {
        const {address, postalCode, city} = trainingCenter;

        let fullAddress = "";
        fullAddress += address ? address : "";
        fullAddress += address && postalCode ? " " : "";
        fullAddress += postalCode ? postalCode : "";
        fullAddress += postalCode && fullAddress ? " " : "";
        fullAddress += city ? city : "";

        if (fullAddress != undefined && fullAddress != null && fullAddress != "") {
            return (
                <div className={"google-map-link text-center"} style={{height: "100px"}}>
                    <a
                        href={`https://www.google.fr/maps/search/${fullAddress}?hl=fr`}
                        target={"_blank"}
                    >
                        <span className={"legend"}>Google Map</span>
                    </a>
                </div>
            );
        }
    }

    renderDate(resDate) {

        let date = resDate;
        if (date != undefined && date != null) {
            if (!(resDate instanceof Date)) {
                date = new Date(resDate);
            }
        }

        if (date != undefined && date != null) {
            return (
                <div>
                    {this.renderTimeline(date)}
                </div>
            );
        }
    }

    renderTimeline = (date) => {
        const {firstDate, lastDate} = this.props;

        const startYear = firstDate ? firstDate.getFullYear() : 1900;
        const endYear = lastDate ? lastDate.getFullYear() : Date.now().getFullYear();
        const year = date ? date.getFullYear() : 1900;

        const positionStart = 0;
        const positionEnd = 100;
        const positionDate = ((((year - startYear) * positionEnd) / (endYear - startYear)));
        const leftStart = positionStart.toString() + "%";
        const leftDate = positionDate.toString() + "%";
        const leftEnd = positionEnd.toString() + "%";

        return (
            <div className={"timeline"}>

                <div className={"gradualness"}>

                    <div className={"startPoint"} style={{left: leftStart, marginLeft: "-6px"}}></div>
                    <div className={"start"} style={{left: leftStart, marginLeft: "-12px"}}>
                        {startYear}
                    </div>

                    <div className={"endPoint"} style={{left: leftEnd, marginLeft: "-6px"}}></div>
                    <div className={"end"} style={{left: leftEnd, marginLeft: "-12px"}}>
                        {endYear}
                    </div>

                    <div className={"datePoint"} style={{left: leftDate, marginLeft: "-6px"}}></div>
                    <div className={"date"} style={{left: leftDate, marginLeft: "-12px"}}>
                        {year}
                    </div>

                </div>

            </div>
        );


    }

    formatDate(date) {
        if (date instanceof Date) {
            const month = MonthFr.convert(date.getMonth());
            const year = date.getFullYear();

            return (
                <Fragment>

                    <span className={"font-weight-bold"}>
                        {year}
                    </span>

                    <div className={"d-sm-none d-xl-block font-italic"}>
                        <span style={{fontSize: "small"}}>
                            {FirstCharUppercase.convert(month)}
                        </span>
                    </div>

                </Fragment>
            );
        }
    }

    renderButtonLinks = () => {
        const {qualification} = this.props.occurrence;
        const {links} = qualification;

        if(links.length > 0){
            const linksDisable = links.length > 0 ? "" : "disabled";

            return(
                <button className={`btn btn-primary outer ${this.state.links.css} ${linksDisable}`} onClick={this.showLinks}>
                    <div className={"inner"}>
                        <BsLink/> &nbsp;
                        {STRING_LINKS}
                    </div>
                </button>
            );
        }
    }

    render() {
        const {dateStart, dateEnd, qualification} = this.props.occurrence;
        const {name, img, level, trainingCenter, objectives, jobs, links} = qualification;

        const objectivesDisable = (objectives && objectives != "") ? "" : "disabled";
        const jobsDisable = jobs.length > 0 ? "" : "disabled";

        return (
            <Card className={"mt-0 occurrence-card qualification"}>

                <div className={"logo"}>
                    <FaGraduationCap/>
                </div>

                <Card.Header className={"pb-1"}>
                    <Card.Title className={"pb-0"}>
                        <h4 className={"mt-1 mb-0 pb-0"}>
                            {FirstCharUppercase.convert(name)}
                        </h4>
                    </Card.Title>
                </Card.Header>

                <Card.Body>

                    <div className={"row"}>
                        <div className={"col-12 row"}>

                            <div className={"col-3"}>
                                {this.renderTrainingCenterLogo(trainingCenter)}
                            </div>

                            <div className={"col-9 col-xl-9 row p-0 m-0"}>
                                <div className={"col-7 col-xl-5 pl-0 pr-0 pt-3"}>
                                    {this.renderDate(dateEnd)}
                                </div>
                                <div className={"col-5 col-xl-7 pl-5 pr-5"}>
                                    {this.renderTrainingCenterLinkGoogleMap(trainingCenter)}
                                </div>
                            </div>

                            <div className={"col-12 border-top mt-1"}>
                                {this.renderTrainingCenterLink(trainingCenter)}
                            </div>

                        </div>
                    </div>


                    <div className={"row"}>

                        <div className={"col-12 pl-4 pr-4"}>
                            <div className={"row h-100"}>

                                <div className={"occurrence-card-menu col-3 h-100"}>
                                    <div className={"btn-group h-100"}>

                                        <button className={`btn btn-primary outer ${this.state.objectives.css} ${objectivesDisable}`} onClick={this.showObjectives}>
                                            <div className={"inner"}>
                                                <BsFillInfoCircleFill/> &nbsp;
                                                {STRING_QUALIFICATION_ROLES}
                                            </div>
                                        </button>

                                        <button className={`btn btn-primary outer ${this.state.jobs.css} ${jobsDisable}`} onClick={this.showJobs}>
                                            <div className={"inner"}>
                                                <MdWork/> &nbsp;
                                                {STRING_QUALIFICATION_ACCESSIBLE_EMPLOYMENT}
                                            </div>
                                        </button>

                                        {this.renderButtonLinks()}

                                    </div>
                                </div>

                                <div className={"col-9"} style={{minHeight: "400px"}}>
                                    <div className={"text-justify p-3"}
                                         style={{display: this.state.objectives.display}}>
                                        <h4>
                                            {STRING_QUALIFICATION_ROLES}
                                        </h4>
                                        {this.renderObjectives(objectives)}
                                    </div>

                                    <div className={"text-justify p-3"} style={{display: this.state.jobs.display}}>
                                        <h4>
                                            {STRING_QUALIFICATION_ACCESSIBLE_EMPLOYMENT}
                                        </h4>
                                        {this.renderJobs(jobs)}
                                    </div>

                                    <div className={"p-3"} style={{display: this.state.links.display}}>
                                        <h4>
                                            {STRING_LINKS}
                                        </h4>
                                        {this.renderLinks(links)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>

            </Card>
        );
    }
}

export default QualificationCard;