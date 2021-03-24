import React, {Component, Fragment} from 'react';
import {Card} from 'react-bootstrap';
import MonthFr from "../../utils/MonthFr";
import FirstCharUppercase from "../../utils/FirstCharUppercase";
import {BsBriefcaseFill, BsFillInfoCircleFill, BsBuilding, BsLink} from "react-icons/bs";
import {FaCalendarAlt} from "react-icons/fa";
import {GiComputing} from "react-icons/gi";
import "./occurrence-card.css";
import {
    STRING_EXPERIENCE_JOB_DESCRIPTION,
    STRING_EXPERIENCE_TECH,
    STRING_LINKS,
    STRING_PROFESSIONAL_EXPERIENCE,
    STRING_QUALIFICATION_ACCESSIBLE_EMPLOYMENT,
    STRING_QUALIFICATION_ROLES,
} from "../../translation/fr-fr";
import {GoCalendar} from "react-icons/go";
import {MdWork} from "react-icons/md";

class ExperienceCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: {
                display: "block",
            },
            technology: {
                display: "none",
            },
            links: {
                display: "none",
            },
        };
        this.showComment = this.showComment.bind(this)
        this.showTechnology = this.showTechnology.bind(this)
        this.showLinks = this.showLinks.bind(this)
    }

    showComment() {

        let display = 'block';
        if (this.state.comment.display == display) {
            display = "none";
        }

        this.setState({
            comment: {
                display: `${display}`,
            },
            technology: {
                display: "none",
            },
            links: {
                display: "none",
            },
        });
    }

    showTechnology() {

        let display = 'block';
        if (this.state.technology.display == display) {
            display = "none";
        }

        this.setState({
            comment: {
                display: "none",
            },
            technology: {
                display: `${display}`,
            },
            links: {
                display: "none",
            },
        });
    }

    showLinks() {

        let display = 'block';
        if (this.state.links.display == display) {
            display = "none";
        }

        this.setState({
            comment: {
                display: "none",
            },
            technology: {
                display: "none",
            },
            links: {
                display: `${display}`,
            },
        });
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

    renderEnterpriseLogo(enterprise) {
        const {url, logo} = enterprise;
        if (url != undefined && url != null && url != "") {
            return (
                <a href={url}>
                    <img className={"mr-1"} src={logo} style={{height: "100px"}}/>
                </a>
            );
        } else if (logo != undefined && logo != null && logo != "") {
            return (
                <img className={"mr-1"} src={logo}/>
            );
        }
    }

    renderEnterpriseLink(enterprise) {

        const {name, url} = enterprise;

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

    renderEnterpriseLinkGoogleMap(enterprise) {

        const {address, postalCode, city} = enterprise;

        let fullAddress = "";
        fullAddress += address ? address : "";
        fullAddress += address && postalCode ? " " : "";
        fullAddress += postalCode ? postalCode : "";
        fullAddress += postalCode && fullAddress ? " " : "";
        fullAddress += city ? city : "";

        if (address != undefined && address != null && address != "") {
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

    renderDate(resDateStart, resDateEnd) {

        let dateStart = resDateStart;
        let dateEnd = resDateEnd;
        if (dateStart != undefined && dateStart != null) {
            if (!(dateStart instanceof Date)) {
                dateStart = new Date(resDateStart)
            }
        }
        if (dateEnd != undefined && dateEnd != null) {
            if (!(dateEnd instanceof Date)) {
                dateEnd = new Date(resDateEnd)
            }
        }

        if (dateStart instanceof Date || dateEnd instanceof Date) {

            return (
                <div>
                    {this.renderTimeline(dateStart,dateEnd)}
                </div>
            );
        }
    }

    renderTimeline = (dateStart,dateEnd) => {
        const {firstDate, lastDate} = this.props;
        const startYear = firstDate.getFullYear();
        const endYear = lastDate.getFullYear();
        const yearStartJob = dateStart.getFullYear();
        const yearEndJob = dateEnd.getFullYear();

        const positionStart = 0;
        const positionEnd = 100;
        const positionYearStartJob = ((((yearStartJob - startYear) * positionEnd) / (endYear - startYear)));
        const positionYearEndJob = ((((yearEndJob - startYear) * positionEnd) / (endYear - startYear)));
        const leftStart = positionStart.toString() + "%";
        const leftYearStartJob = positionYearStartJob.toString() + "%";
        const leftYearEndJob = positionYearEndJob.toString() + "%";
        const leftEnd = positionEnd.toString() + "%";
        const positionsProgressbar = (positionYearEndJob - positionYearStartJob);
        const progressbarWidth = positionsProgressbar.toString() + "%";

        return (
            <div className={"timeline"}>

                <div className={"gradualness"}>

                    <div className={"startPoint"} style={{left: leftStart, marginLeft:"-6px"}}></div>
                    <div className={"start"} style={{left: leftStart, marginLeft:"-12px"}}>
                        {startYear}
                    </div>

                    <div className={"endPoint"} style={{left: leftEnd, marginLeft:"-6px"}}></div>
                    <div className={"end"} style={{left: leftEnd, marginLeft:"-12px"}}>
                        {endYear}
                    </div>

                    <div className={"datePoint"} style={{left: leftYearStartJob, marginLeft:"-6px"}}></div>
                    <div className={"date"} style={{left: leftYearStartJob, marginLeft:"-12px"}}>
                        {yearStartJob}
                    </div>

                    <div className={"datePoint"} style={{left: leftYearEndJob, marginLeft:"-6px"}}></div>
                    <div className={"date"} style={{left: leftYearEndJob, marginLeft:"-12px"}}>
                        {yearEndJob}
                    </div>

                    <div className={"progressbar"} style={{left:leftYearStartJob, width:progressbarWidth, marginLeft:"6px", paddingLeft:"12px", paddingRight:"12px"}}>
                        <div className={"background"}></div>
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
                        {year ? year : ""}
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

    renderTechnonogies(technologies) {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    {this.formatTechnologieRendering(technologies)}
                </div>
            </div>
        );
    }

    formatTechnologieRendering(technologies) {
        const technologiesKeys = Object.keys(technologies);
        return technologiesKeys.map((key) => {
            const technology = technologies[key];
            return (
                <Fragment key={key}>
                    {this.renderTechnology(technology)}
                </Fragment>
            );
        });
    }

    renderTechnology(technology) {
        const {name, logo} = technology;
        return (
            <div className={"col-auto"}>
                <img className={"experience-technology-logo mr-1"} src={logo}/>
                {name}
            </div>
        );
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
            <a key={link.name} className={"btn btn-primary m-1"} href={link.url}>
                {link.name}
            </a>
        );
    }

    renderComment(comment) {
        if (comment != undefined && comment != null) {
            return (
                <div className={"text-justify p-3"}>
                    {comment}
                </div>
            );
        }
    }

    render() {
        let image = "https://alchimistedelajoie.com/wp-content/uploads/2018/12/business-camera-coffee-1509428-reduit-1080x675.jpg";
        const {dateStart, dateEnd, experience} = this.props.occurrence;
        const {name, comment, img, enterprise, technologicalCategories, workstudy, links} = experience;

        return (
            <Card className={"m-0 occurrence-card experience"}>

                <div className={"logo"}>
                    <BsBriefcaseFill/>
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
                                {this.renderEnterpriseLogo(enterprise)}
                            </div>

                            <div className={"col-9 col-xl-9 row p-0 m-0"}>
                                <div className={"col-7 col-xl-5 pl-0 pr-0 pt-3"}>
                                    {this.renderDate(dateStart, dateEnd)}
                                </div>
                                <div className={"col-5 col-xl-7 pl-5 pr-5"}>
                                    {this.renderEnterpriseLinkGoogleMap(enterprise)}
                                </div>
                            </div>

                            <div className={"col-12 border-top mt-1"}>
                                {this.renderEnterpriseLink(enterprise)}
                            </div>



                                {/*<div className={"col-12 col-xl-8"}>*/}
                                {/*    {this.renderEnterprise(enterprise)}*/}
                                {/*</div>*/}

                        </div>

                    </div>

                    <div className={"row"}>

                        <div className={"col-12 pl-4 pr-4"}>
                            <div className={"row h-100"}>

                                <div className={"occurrence-card-menu col-3 h-100"}>
                                    <div className={"btn-group h-100"}>
                                        <button className={"btn btn-primary outer"} onClick={this.showComment}>
                                            <div className={"inner"}>
                                                <BsFillInfoCircleFill/> &nbsp;
                                                {STRING_EXPERIENCE_JOB_DESCRIPTION}
                                            </div>
                                        </button>
                                        <button className={"btn btn-primary outer"} onClick={this.showTechnology}>
                                            <div className={"inner"}>
                                                <GiComputing/> &nbsp;
                                                {STRING_EXPERIENCE_TECH}
                                            </div>
                                        </button>
                                        <button className={"btn btn-primary outer"} onClick={this.showLinks}>
                                            <div className={"inner"}>
                                                <BsLink/> &nbsp;
                                                {STRING_LINKS}
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className={"col-9"} style={{minHeight: "400px"}}>

                                    <div className={"text-justify p-3"} style={{display: this.state.comment.display}}>
                                        <h4>
                                            {STRING_EXPERIENCE_JOB_DESCRIPTION}
                                        </h4>
                                        {this.renderComment(comment)}
                                    </div>

                                    <div className={"text-justify p-3"}
                                         style={{display: this.state.technology.display}}>
                                        <h4>
                                            {STRING_EXPERIENCE_TECH}
                                        </h4>
                                        {this.renderTechnonogies(technologicalCategories)}
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

                {/*<Card.Footer className={"text-right"}>*/}
                {/*    <button className={"btn btn-secondary m-1"} onClick={this.handleDeploy.bind(this)}>Action*/}
                {/*    </button>*/}
                {/*</Card.Footer>*/}

            </Card>
        );
    }
}

export default ExperienceCard;