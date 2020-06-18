import React, {Component, Fragment} from 'react';
import data from "../data";
import OccurenceItem from "./OccurenceItem";
import CvCarousel from "./CvCarousel";
import DateBar from "./edit/DateBar";
import Step from "../bo/Step";

class OccurenceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            occurences: data.occurences,
            occurence: {},
        };
    }

    handleOccurence(occurence){
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

    getStepsDates(){
        const {occurences} = this.state;
        let dates = [];

        for(const id in occurences){
            const occurence = occurences[id];
            const {dateStart, dateEnd} = occurence;

            let date = null;

            if(dateStart != undefined && dateStart != null){
                date = new Date(dateStart);
            }

            if(dateEnd != undefined && dateEnd != null){
                date = new Date(dateEnd);
            }

            if(date != null && !isNaN(date.getTime())){

                let dateExist = false;

                dates.forEach((item)=>{
                    if(date.getFullYear() == item.title){
                        dateExist = true;
                    }
                });

                if(dateExist == false){
                    let stepDate = new Step(date.getFullYear(),"");
                    dates.push(stepDate);
                }
            }
        }

        return dates;
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
        const stepsDates = this.getStepsDates();

        return (
            <Fragment>
                <div className={"row"}>

                    <div className={"col-12"}>
                        <DateBar steps={stepsDates}/>
                    </div>

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