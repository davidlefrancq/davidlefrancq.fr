import React from 'react';
import FirstCharUppercase from "../../utils/FirstCharUppercase";

const OccurrenceItemMenu = (props) => {

    const {occurrence, handleSelectOccurrence, handelDeleteOccurrence} = props;
    const {experience, qualification} = occurrence;

    let title = "";

    if (experience !== undefined && experience !== null) {
        title = experience.name;
    }

    if (qualification !== undefined && qualification !== null) {
        title = qualification.name;
    }

    return (
        <div className={"row mt-1 p-0"}>
            <div className={"col-10 m-0 p-0"}>
                <button className={"col-12 btn btn-secondary"} onClick={()=>{handleSelectOccurrence(occurrence)}}>
                    {FirstCharUppercase.convert(title)}
                </button>
            </div>
            <div className={"col-2 m-0 pl-1 pr-0 pt-0 pb-0"}>
                <button className={"h-100 col-12 btn btn-danger"} onClick={()=>{handelDeleteOccurrence(occurrence)}}>
                    x
                </button>
            </div>
        </div>
    );
};

export default OccurrenceItemMenu;
