import React, {Component, Fragment} from 'react';
import QualificationCard from "./QualificationCard";
import ExperienceCard from "./ExperienceCard";

class OccurrenceItem extends Component {

    constructor(props) {
        super(props);
    }

    renderOccurrence(occurrence) {
        if (occurrence.experience) {

            return this.renderExperience(occurrence);

        } else if (occurrence.qualification) {

            return this.renderQualification(occurrence);

        }
    }

    renderQualification(occurrence) {
        return <QualificationCard occurrence={occurrence}/>
    }

    renderExperience(occurrence) {
        return <ExperienceCard occurrence={occurrence}/>
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