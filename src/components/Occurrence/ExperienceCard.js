import React, {Component, Fragment} from 'react';
import {Card, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import MonthFr from "../../utils/MonthFr";
import FirstCharUppercase from "../../utils/FirstCharUppercase";
import {BsBuilding, BsLink} from "react-icons/bs";
import {BsFillInfoCircleFill} from "react-icons/bs";
import {FaCalendarAlt} from "react-icons/fa";
import {GiComputing} from "react-icons/gi";
import "./occurrence-card.css";
import {
    STRING_EXPERIENCE_JOB_DESCRIPTION,
    STRING_EXPERIENCE_TECH, STRING_LINKS, STRING_PROFESSIONAL_EXPERIENCE,
} from "../../translation/fr-fr";
import {GoCalendar} from "react-icons/go";

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

    renderEnterprise(enterprise) {
        const {name, logo, address, url} = enterprise;
        return (
            <Fragment>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <div className={"row"}>
                            <div className={"col-12 text-center"}>
                                {this.renderEnterpriseLogo(url, logo)}
                            </div>
                            <div className={"col-12 text-center"}>
                                {this.renderEnterpriseLink(url, name)}
                            </div>
                        </div>
                    </div>
                    <div className={"col-8 m-0 pl-0 pr-5 pt-0 pb-0"}>
                        {this.renderEnterpriseLinkGoogleMap(address)}
                    </div>
                </div>

                {/*<div className={"col-6 text-right"}>*/}
                {/*    <div className={"row"}>*/}
                {/*        <div className={"col-12 col-xl-6 p-0 text-center"}>*/}
                {/*            {this.renderEnterpriseLogo(url, logo)}*/}
                {/*        </div>*/}
                {/*        <div className={"col-12 col-xl-6 pl-0 pr-0"}>*/}
                {/*            {this.renderEnterpriseLink(url, name)}*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className={"col-6 text-left pt-2"}>*/}

                {/*{this.renderEnterpriseLinkGoogleMap(address)}*/}

                {/*</div>*/}
            </Fragment>
        );
    }

    renderEnterpriseLogo(url, logo) {
        if (url != undefined && url != null && url != "") {
            return (
                <a href={url}>
                    <img className={""} src={logo} style={{width: "50px"}}/>
                </a>
            );
        } else if (logo != undefined && logo != null && logo != "") {
            return (
                <img className={"mr-1"} src={logo}/>
            );
        }
    }

    renderEnterpriseLink(url, name) {

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

    renderEnterpriseLinkGoogleMap(address) {
        if (address != undefined && address != null && address != "") {
            return (
                <div className={"h-100 google-map-link text-center"}>
                    <a
                        href={`https://www.google.fr/maps/search/${address}?hl=fr`}
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
                <div className={"ml-auto mr-auto"} style={{
                    width: "100%",
                    height: "75px",
                }}>

                    <div className={"row m-0 p-0"}>
                        <div className={"col-4 m-0 p-0"}>
                            <div className={"row p-0 m-0"}>
                                <div className={"col-auto ml-auto mr-auto"}>
                                    <div
                                        className={"occurrence-card-logo-date"}
                                    >
                                        <GoCalendar
                                            style={{
                                                fontSize: "x-large",
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={"col-8 m-0 p-0"}>
                            <div className={"row m-0 p-0 h-100"}>
                                <div className={"col-6 m-0 p-0 text-center p-2"}>
                                    {dateStart ? this.formatDate(dateStart) : ""}
                                </div>

                                <div className={"col-6 m-0 p-0 text-center p-2"}>
                                    {dateEnd ? this.formatDate(dateEnd) : ""}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
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

    renderTooltipExperience = (props) => {
        return (
            <Tooltip id="card-tooltip-experience" {...props}>
                {STRING_PROFESSIONAL_EXPERIENCE}
            </Tooltip>
        );
    }

    render() {
        let image = "https://alchimistedelajoie.com/wp-content/uploads/2018/12/business-camera-coffee-1509428-reduit-1080x675.jpg";
        const {dateStart, dateEnd, experience} = this.props.occurrence;
        const {name, comment, img, enterprise, technologicalCategories, workstudy, links} = experience;

        if (img != undefined && img != null) {
            image = img;
        }

        return (
            <Card className={"m-0 occurrence-card experience"}>

                <OverlayTrigger
                    placement="right"
                    delay={{show: 250, hide: 400}}
                    overlay={this.renderTooltipExperience}
                >
                    <div className={"logo"}>
                        <BsBuilding
                            style={{fontSize: "x-large"}}
                        />
                    </div>
                </OverlayTrigger>

                <Card.Header>
                    <Card.Title>
                        <h4 className={"mt-1"}>
                            {FirstCharUppercase.convert(name)}
                        </h4>
                    </Card.Title>
                </Card.Header>

                <Card.Body>

                    <div className={"row"}>
                        <div className={"col-12"}>
                            <div className={"mt-2 row"}>

                                <div className={"col-12 col-xl-4"}>
                                    {this.renderDate(dateStart, dateEnd)}
                                </div>

                                <div className={"d-block d-xl-none w-100 pl-5 pr-5 pb-3"}>
                                    <hr className={"ml-5 mr-5"}/>
                                </div>

                                <div className={"col-12 col-xl-8"}>
                                    {this.renderEnterprise(enterprise)}
                                </div>

                            </div>
                        </div>

                        <div className={"w-100 pl-5 pr-5"}>
                            <br/>
                        </div>


                        <div className={"col-12 pl-5"}>

                            <button className={"btn btn-outline-primary m-1 pt-1 pb-2 pr-3 pl-3 "}
                                    onClick={this.showComment}>
                                <BsFillInfoCircleFill/>
                            </button>

                            <button className={"btn btn-outline-primary  m-1 pt-1 pb-2 pr-3 pl-3"}
                                    onClick={this.showTechnology}>
                                <GiComputing/>
                            </button>

                            <button className={"btn btn-outline-primary  m-1 pt-1 pb-2 pr-3 pl-3"}
                                    onClick={this.showLinks}>
                                <BsLink/>
                            </button>

                        </div>


                        <div className={"col-12 pl-4 pr-4"}>

                            <div className={"text-justify p-3"} style={{display: this.state.comment.display}}>
                                <h4>
                                    {STRING_EXPERIENCE_JOB_DESCRIPTION}
                                </h4>
                                {this.renderComment(comment)}
                            </div>

                            <div className={"text-justify p-3"} style={{display: this.state.technology.display}}>
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