import React, {Component, Fragment} from 'react';
import {Button, Card} from 'react-bootstrap';
import MonthFr from "../utils/MonthFr";
import FirstCharUppercase from "../utils/FirstCharUppercase";

class QualificationCard extends Component {

    constructor(props) {
        super(props);
    }


    renderJobs(jobs) {
        return (
            <div className={"container"}>
                <ul className={"list-group"}>
                    {this.formatJobRendering(jobs)}
                </ul>
            </div>
        );
    }

    formatJobRendering(jobs) {
        const jobsKeys = Object.keys(jobs);
        return jobsKeys.map((key) => {
            const job = jobs[key];
            return (
                this.renderJob(job)
            );
        });
    }

    renderJob(job) {
        return (
            <li key={job.name} className={"list-group-item"}>
                {job.name}
            </li>
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
            <a key={link.title} className={"btn btn-info m-1"} href={link.url}>
                {link.title}
            </a>
        );
    }

    renderOnjectives(objectives) {
        if (objectives != undefined && objectives != null) {
            return (
                <Card.Text className={"text-justify p-3"}>
                    {objectives}
                </Card.Text>
            );
        }
    }

    renderTrainingCenter(trainingCenter) {
        const {name, logo, address, url} = trainingCenter;
        return (
            <div className={"container trainingCenter"}>
                <a href={url}>
                    <img className={"mr-1"} src={logo}/>
                </a>

                <a href={url}>
                    {name}
                </a>

                <a href={`https://www.google.fr/maps/search/${address}?hl=fr`}>
                    <img className={"float-right"}
                         src={"data:image/png;base64,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"}/>
                </a>
            </div>
        );
    }

    renderDate(date) {
        if (date instanceof Date) {
            const month = MonthFr.convert(date.getMonth());
            const year = date.getFullYear();

            return (
                // <div>{date.toLocaleDateString()}</div>
                <div className={"text-center mt-2 mb-2"}>
                    <span className={"badge badge-secondary qualification-date pt-2 pb-2 pl-4 pr-4"}>
                        {FirstCharUppercase.convert(month)} {year}
                    </span>
                </div>
            );
        }
    }

    render() {
        let image = "https://www.cm-alsace.fr/sites/default/files/styles/header_banner/public/image/201406/formation_diplomante_fotolia_61632227_s.jpg?itok=xZejzVxB";
        const {dateStart, dateEnd, qualification} = this.props.occurence;
        const {title, img, level, trainingCenter, objectives, jobs, links} = qualification;

        if (img != undefined && img != null) {
            image = img;
        }

        return (
            <Card>

                <Card.Img variant={"top"} src={image}/>
                <Card.Title>{title}</Card.Title>

                {this.renderDate(dateEnd)}

                <Card.Body>

                    {this.renderTrainingCenter(trainingCenter)}

                    <hr/>

                    {this.renderOnjectives(objectives)}

                    <hr/>

                    {this.renderJobs(jobs)}

                    <hr/>

                    {this.renderLinks(links)}

                </Card.Body>

            </Card>
        );
    }
}

export default QualificationCard;