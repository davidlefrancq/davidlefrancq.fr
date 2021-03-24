import React, {Component, Fragment} from 'react';
import QualificationCard from "./QualificationCard";
import ExperienceCard from "./ExperienceCard";

class OccurrenceItem extends Component {

    constructor(props) {
        super(props);
    }

    renderOccurrence(occurrence) {
        if (occurrence.experience && (this.props.lastDate || this.props.lastDate)) {

            return this.renderExperience(occurrence);

        } else if (occurrence.qualification && (this.props.firstDate || this.props.lastDate)) {

            return this.renderQualification(occurrence);

        }else{
            return;
        }
    }

    renderQualification(occurrence) {
        return <QualificationCard occurrence={occurrence} firstDate={this.props.firstDate} lastDate={this.props.lastDate}/>
    }

    renderExperience(occurrence) {
        return <ExperienceCard occurrence={occurrence} firstDate={this.props.firstDate} lastDate={this.props.lastDate}/>
    }

    render() {
        const {occurrence} = this.props;

        return (
            <Fragment>
                {this.renderOccurrence(occurrence)}
            </Fragment>
        );
    }
}

export default OccurrenceItem;