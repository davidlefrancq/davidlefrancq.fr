import React, {Component, Fragment} from 'react';
import QualificationCard from "./QualificationCard";
import ExperienceCard from "./ExperienceCard";

class OccurenceItem extends Component {

    constructor(props) {
        super(props);
    }

    renderOccurence(occurence){
        if(occurence.experience){

            return this.renderExperience(occurence);

        }else if(occurence.qualification){

            return this.renderQualification(occurence);

        }
    }

    renderQualification(occurence){
        return <QualificationCard occurence={occurence}/>
    }

    renderExperience(occurence){
        return <ExperienceCard occurence={occurence}/>
    }

    render() {
        const {occurence} = this.props;

        return (
            <div className={"col-4"}>
                {this.renderOccurence(occurence)}
            </div>
        );
    }
}

export default OccurenceItem;