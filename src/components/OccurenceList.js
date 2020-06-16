import React, {Component, Fragment} from 'react';
import data from "../data";
import OccurenceItem from "./OccurenceItem";
import CvCarousel from "./CvCarousel";

class OccurenceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            occurences: data.occurences,
            occurence: {},
        };
    }

    handleOccurence(occurence){
        console.log("occurence",occurence);
        this.setState({occurence});
    }

    getQualifications() {
        const {occurences} = this.state;
        const occurencesQualifications = [];

        for (const id in occurences) {
            const occurence = occurences[id];
            const {qualification} = occurence;
            if (qualification != undefined && qualification != null) {
                occurencesQualifications.push(occurence);
            }
        }

        return occurencesQualifications;
    }

    getExperiences() {
        const {occurences} = this.state;
        const occurencesExperiences = [];

        for (const id in occurences) {
            const occurence = occurences[id];
            const {experience} = occurence;
            if (experience != undefined && experience != null) {
                occurencesExperiences.push(occurence);
            }
        }

        return occurencesExperiences;
    }

    renderOccurences() {
        const {occurences} = this.state;
        const occurencesIds = Object.keys(occurences);

        return occurencesIds.map((key) => {
            return (
                <OccurenceItem key={key} occurence={occurences[key]} />
            );
        });
    }

    renderOcurence() {
        const {occurence} = this.state;
        if (occurence != undefined && occurence != null) {
            return (
                <OccurenceItem occurence={occurence}/>
            );
        }
    }

    render() {

        const occurencesQualifications = this.getQualifications();
        const occurencesExperiences = this.getExperiences();

        return (
            <Fragment>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <CvCarousel
                            occurences={occurencesQualifications}
                            handleOccurence={this.handleOccurence.bind(this)}
                        />
                    </div>
                    <div className={"col-6"}>
                        <CvCarousel
                            occurences={occurencesExperiences}
                            handleOccurence={this.handleOccurence.bind(this)}
                        />
                    </div>
                </div>

                <div className={"clearfix"}>
                    {/*{this.renderOccurences()}*/}
                </div>

                <div>
                    {this.renderOcurence()}
                </div>

            </Fragment>
        );
    }
}

export default OccurenceList;