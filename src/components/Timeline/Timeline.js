import React from 'react';

const Timeline = (props) => {

    const {firstDate, lastDate, dateStart, dateEnd} = props;

    const startYear = firstDate ? firstDate.getFullYear() : 1900;
    const endYear = lastDate ? lastDate.getFullYear() : new Date(Date.now()).getFullYear();
    const yearStartJob = dateStart ? new Date(dateStart).getFullYear() : startYear;
    const yearEndJob = dateEnd ? new Date(dateEnd).getFullYear() : new Date(Date.now()).getFullYear();

    const positionStart = 0;
    const positionEnd = 100;
    const positionYearStartJob = ((((yearStartJob - startYear) * positionEnd) / (endYear - startYear)));
    const positionYearEndJob = ((((yearEndJob - startYear) * positionEnd) / (endYear - startYear)));
    const leftStart = positionStart.toString() + "%";
    const leftYearStartJob = positionYearStartJob.toString() + "%";
    const leftYearEndJob = positionYearEndJob.toString() + "%";
    const leftEnd = positionEnd.toString() + "%";
    const positionsProgressbar = (positionYearEndJob - positionYearStartJob);
    const progressbarWidth = positionsProgressbar.toString() + "%";

    return (
        <div className={"timeline"}>

            <div className={"gradualness"}>

                <div className={"startPoint"} style={{left: leftStart, marginLeft: "-6px"}}></div>
                <div className={"start"} style={{left: leftStart, marginLeft: "-12px"}}>
                    {startYear}
                </div>

                <div className={"endPoint"} style={{left: leftEnd, marginLeft: "-6px"}}></div>
                <div className={"end"} style={{left: leftEnd, marginLeft: "-12px"}}>
                    {endYear}
                </div>

                <div className={"datePoint"} style={{left: leftYearStartJob, marginLeft: "-6px"}}></div>
                <div className={"date"} style={{left: leftYearStartJob, marginLeft: "-12px"}}>
                    {yearStartJob}
                </div>

                <div className={"datePoint"} style={{left: leftYearEndJob, marginLeft: "-6px"}}></div>
                <div className={"date"} style={{left: leftYearEndJob, marginLeft: "-12px"}}>
                    {yearEndJob}
                </div>

                <div className={"progressbar"} style={{
                    left: leftYearStartJob,
                    width: progressbarWidth,
                    marginLeft: "6px",
                    paddingLeft: "12px",
                    paddingRight: "12px"
                }}>
                    <div className={"background"}></div>
                </div>

            </div>

        </div>
    );
};

export default Timeline;
