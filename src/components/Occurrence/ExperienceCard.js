import React, {Component, Fragment} from 'react';
import {Card} from 'react-bootstrap';
import MonthFr from "../../utils/MonthFr";
import FirstCharUppercase from "../../utils/FirstCharUppercase";
import {BsLink} from "react-icons/bs";
import "./occurrence-card.css";
import {
    STRING_LINKS,
} from "../../translation/fr-fr";
import TechnoIcon from "./TechnoIcon";

class ExperienceCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: {
                css: "active",
                display: "block",
            },
            technology: {
                css: "",
                display: "none",
            },
            links: {
                css: "",
                display: "none",
            },
        };
        this.showComment = this.showComment.bind(this)
        this.showTechnology = this.showTechnology.bind(this)
        this.showLinks = this.showLinks.bind(this)
    }

    showComment() {
        const {experience} = this.props.occurrence;
        const {comment} = experience;
        const disabled = (comment && comment != "") ? false : true;

        if (!disabled) {

            const state = this.setCommentSelected();

            let display = 'block';
            if (this.state.comment.display == display) {
                display = "none";
            }

            state.comment.display = `${display}`;
            state.technology.display = "none";
            state.links.display = "none";

            this.setState(state);
        }
    }

    showTechnology() {
        const {experience} = this.props.occurrence;
        const {technologicalCategories} = experience;
        const disabled = technologicalCategories.length > 0 ? false : true;

        if (!disabled) {

            const state = this.setTechnologySelected();

            let display = 'block';
            if (this.state.technology.display == display) {
                display = "none";
            }

            state.comment.display = "none";
            state.technology.display = `${display}`;
            state.links.display = "none";

            this.setState(state);
        }
    }

    showLinks() {
        const {experience} = this.props.occurrence;
        const {links} = experience;
        const disabled = links.length > 0 ? false : true;

        if (!disabled) {
            const state = this.setLinksSelected();

            let display = 'block';
            if (this.state.links.display == display) {
                display = "none";
            }

            state.comment.display = "none";
            state.technology.display = "none";
            state.links.display = `${display}`;

            this.setState(state);
        }
    }

    setCommentSelected = () => {
        const state = {...this.state};
        state.comment.css = "active";
        state.technology.css = "";
        state.links.css = "";
        return state;
    }

    setTechnologySelected = () => {
        const state = {...this.state};
        state.comment.css = "";
        state.technology.css = "active";
        state.links.css = "";
        return state;
    }

    setLinksSelected = () => {
        const state = {...this.state};
        state.comment.css = "";
        state.technology.css = "";
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

    renderEnterpriseLogo(enterprise) {
        const {url, logo} = enterprise;
        if (url != undefined && url != null && url != "" && logo && logo != "") {
            return (
                <a href={url} className={"m-0 p-0"}>
                    <div className={"enterprise-logo"}>
                        <img className={"m-0"} src={`./image/${logo}`}/>
                    </div>
                </a>
            );
        } else if (logo != undefined && logo != null && logo != "") {
            return (
                <div className={"enterprise-logo"}>
                    <img className={"m-0"} src={`./image/${logo}`}/>
                </div>
            );
        } else {
            return (
                <div className={"enterprise-logo"}>
                    <img className={"m-0"} src={"./image/building.png"}/>
                </div>
            );
        }
    }

    renderEnterpriseLink(enterprise) {

        const {
            name
            ,
            url
        }

            = enterprise;

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
                <div className={"mr-auto ml-auto google-map-link text-center rounded-circle"}>
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
                    {this.renderTimeline(dateStart, dateEnd)}
                </div>
            );
        }
    }

    renderTimeline = (dateStart, dateEnd) => {
        const {firstDate, lastDate} = this.props;
        const startYear = firstDate ? firstDate.getFullYear() : 1900;
        const endYear = lastDate ? lastDate.getFullYear() : new Date().getFullYear();
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

                    <div className={"startPoint"} style={{left: leftStart, marginLeft: "-6px"}}></div>
                    <div className={"start"} style={{left: leftStart, marginLeft: "-12px"}}>
                        {startYear}
                    </div>

                    <div className={"endPoint"} style={{left: leftEnd, marginLeft: "-6px"}}></div>
                    <div className={"end"} style={{left: leftEnd, marginLeft: "-12px"}}>
                        {endYear}
                    </div>

                    <div className={"datePoint"} style={{left: leftYearStartJob, marginLeft: "-6px"}}></div>
                    <div className={"date"} style={{left: leftYearStartJob, marginLeft: "-12px"}}>
                        {yearStartJob}
                    </div>

                    <div className={"datePoint"} style={{left: leftYearEndJob, marginLeft: "-6px"}}></div>
                    <div className={"date"} style={{left: leftYearEndJob, marginLeft: "-12px"}}>
                        {yearEndJob}
                    </div>

                    <div className={"progressbar"} style={{
                        left: leftYearStartJob,
                        width: progressbarWidth,
                        marginLeft: "6px",
                        paddingLeft: "12px",
                        paddingRight: "12px"
                    }}>
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
        return this.formatTechnologieRendering(technologies);
    }

    formatTechnologieRendering(technologies) {
        return technologies.map((technology, index) => {
            return this.renderTechnology(technology, index);
        });
    }

    renderTechnology(technology, index) {
        const {name, logo} = technology;
        return (
            <div key={index} className={"d-inline m-3"}>
                {/*<img className={"experience-technology-logo mr-1"} src={`./image/${logo}`}/>*/}
                <TechnoIcon name={name}/>
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
        if (links && links.length > 0) {
            return links.map((link, index) => {
                return (
                    this.renderLink(link, index)
                );
            });
        }
    }

    renderLink(link, index) {
        return (
            <a key={index} className={"btn btn-primary m-1"} href={link.url}>
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

    renderButtonLinks = () => {
        const {experience} = this.props.occurrence;
        const {links} = experience;

        if (links && links.length > 0) {
            const linksDisable = links.length > 0 ? "" : "disabled";

            return (
                <button className={`btn btn-primary outer ${this.state.links.css} ${linksDisable}`}
                        onClick={this.showLinks}>
                    <div className={"inner"}>
                        <BsLink/> &nbsp;
                        {STRING_LINKS}
                    </div>
                </button>
            );
        }
    }

    render() {
        let image = "https://alchimistedelajoie.com/wp-content/uploads/2018/12/business-camera-coffee-1509428-reduit-1080x675.jpg";
        const {dateStart, dateEnd, experience} = this.props.occurrence;
        const {name, comment, img, enterprise, technologicalCategories, workstudy, links} = experience;

        return (
            <Card className={"bg-dark border-0 m-0 occurrence-card experience"}>

                <Card.Header className={"pb-1"}>
                    <Card.Title className={"pb-0"}>
                        <h4 className={"mt-1 mb-0 pb-0"}>
                            <div className={"codeBlue"}>{'Experience Professionnel { '}</div>
                            <span className={"ml-5"}>{FirstCharUppercase.convert(name)}</span>
                            <div className={"codeBlue"}>{' }'}</div>
                        </h4>
                    </Card.Title>
                </Card.Header>

                <Card.Body>

                    <div className={"row mb-5"}>

                        <div className={"col-9 clearfix"}>
                            <div className={"float-left"}>

                                {this.renderEnterpriseLogo(enterprise)}
                            </div>
                            <div className={"float-left mt-3 pl-3"}>
                                <div>{enterprise.name}</div>
                                <div>{enterprise.postalCode} {enterprise.city}</div>
                            </div>
                        </div>

                        <div className={"col-3"}>
                            {this.renderEnterpriseLinkGoogleMap(enterprise)}
                        </div>

                        <div className={"offset-1 col-10 mt-5 mb-5"}>
                            {this.renderDate(dateStart, dateEnd)}
                        </div>
                    </div>


                    <div className={"row"}>

                        <div className={"col-12 text-center p-3"}>
                            {this.renderTechnonogies(technologicalCategories)}
                        </div>


                        <div className={"col-12 text-justify p-3"}>
                            {this.renderComment(comment)}
                        </div>

                        <div className={"col-12 p-3"}>
                            {this.renderLinks(links)}
                        </div>

                    </div>

                </Card.Body>

            </Card>
        );
    }
}

export default ExperienceCard;
