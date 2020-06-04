import React, {Component, Fragment} from 'react';
import data from "../data";
import OccurenceItem from "./OccurenceItem";

class OccurenceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            occurences: data.occurences,
        };
    }

    renderOccurences() {
        const {occurences} = this.state;
        const occurencesIds = Object.keys(occurences);

        return occurencesIds.map((key) => {
            return (
                <OccurenceItem key={key} occurence={occurences[key]}/>
            );
        });
    }

    render() {
        return (
            <div className={"row"}>
                {this.renderOccurences()}
            </div>
        );
    }
}

export default OccurenceList;