import React, {Component, Fragment} from 'react';
import {Card, Button} from 'react-bootstrap';
import MonthFr from "../utils/MonthFr";
import FirstCharUppercase from "../utils/FirstCharUppercase";
import {BsLink} from "react-icons/bs";
import {BsFillInfoCircleFill} from "react-icons/bs";
import {FaCalendarAlt} from "react-icons/fa";
import {GiComputing} from "react-icons/gi";

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
        this.setState({
            comment: {
                display: "block",
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
        this.setState({
            comment: {
                display: "none",
            },
            technology: {
                display: "block",
            },
            links: {
                display: "none",
            },
        });
    }

    showLinks() {
        this.setState({
            comment: {
                display: "none",
            },
            technology: {
                display: "none",
            },
            links: {
                display: "block",
            },
        });
    }

    isLessOneYear(date) {
        let result = false;
        const now = new Date();
        const oneYear = now - (60 * 60 * 24 * 365);
        let dateDiff = now - this.props.occurence.dateEnd;
        if (dateDiff < oneYear) {
            result = true;
        }
        return result;
    }

    renderEnterprise(enterprise) {
        const {name, logo, address, url} = enterprise;
        return (
            <Fragment>
                <div className={"col-4 text-right"}>

                    {this.renderEnterpriseLogo(url, logo)}

                    {this.renderEnterpriseLink(url, name)}

                </div>

                <div className={"col-4 text-left pt-2"}>

                    {this.renderEnterpriseLinkGoogleMap(address)}

                </div>
            </Fragment>
        );
    }

    renderEnterpriseLogo(url, logo) {
        if (url != undefined && url != null && url != "") {
            return (
                <a href={url}>
                    <img className={"mr-1"} src={logo} style={{width: "50px"}}/>
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
                <a href={`https://www.google.fr/maps/search/${address}?hl=fr`} target={"_blank"}>
                    <img
                        src={"data:image/png;base64,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"}
                        style={{width: "35px"}}
                    />
                </a>
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

                    <div className={"row"}>
                        <div className={"col-auto"}>
                            <FaCalendarAlt
                                className={"mr-1"}
                                style={{fontSize: "300%", color: "#034f84"}}
                            />
                        </div>
                        <div className={"col-auto"}>
                            <div className={"row"}>
                                <div className={"col-12"}>
                                    {this.formatDate(dateStart)}
                                </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col-12"}>
                                    {this.formatDate(dateEnd)}
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
                    {year} {"("} {FirstCharUppercase.convert(month)} {")"}
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
            <a key={link.name} className={"btn btn-info m-1"} href={link.url}>
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
        const {dateStart, dateEnd, experience} = this.props.occurence;
        const {name, comment, img, enterprise, technologicalCategories, workstudy, links} = experience;

        if (img != undefined && img != null) {
            image = img;
        }

        return (
            <Card className={"mt-3"}>

                <Card.Header>
                    <Card.Title>
                        <h4>
                            {FirstCharUppercase.convert(name)}
                        </h4>
                    </Card.Title>

                </Card.Header>

                <Card.Body>

                    <div className={"row"}>
                        <div className={"col-12"}>
                            <div className={"mt-2 row"}>

                                <div className={"col-4 text-left pl-5"}>
                                    {this.renderDate(dateStart, dateEnd)}
                                </div>

                                {this.renderEnterprise(enterprise)}

                            </div>
                        </div>

                        <div className={"col-1 text-center pt-4"}>

                            <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3 "}
                                    onClick={this.showComment}>
                                <BsFillInfoCircleFill/>
                            </button>

                            <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3"}
                                    onClick={this.showTechnology}>
                                <GiComputing/>
                            </button>

                            <button className={"btn btn-secondary m-1 pt-1 pb-2 pr-3 pl-3"} onClick={this.showLinks}>
                                <BsLink/>
                            </button>

                        </div>


                        <div className={"col-11"}>

                            <div className={"text-justify p-3"} style={{display: this.state.comment.display}}>
                                <h4 className={"border border-top-0 border-right-0 border-left-0"}>
                                    Description du poste
                                </h4>
                                {this.renderComment(comment)}
                            </div>

                            <div style={{display: this.state.technology.display}}>
                                <h4 className={"border border-top-0 border-right-0 border-left-0"}>
                                    Techno(s)
                                </h4>
                                {this.renderTechnonogies(technologicalCategories)}
                            </div>

                            <div className={"p-3"} style={{display: this.state.links.display}}>
                                <h4 className={"border border-top-0 border-right-0 border-left-0"}>
                                    Liens
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