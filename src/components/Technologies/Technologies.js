import React from 'react';
import TechnoIcon from "../Occurrence/TechnoIcon";

const Technologies = (props) => {

    const renderTechnology = (technology, index) => {
        const {name} = technology;
        return (
            <div key={index} className={"m-3 float-left"} style={{minHeight:30}}>
                <TechnoIcon name={name}/>
                {name}
            </div>
        );
    }

    const renderTechnologies = () => {
        return props.technologies.map((technology, index) => {
            return renderTechnology(technology, index);
        });
    }

    return (
        <div className={"clearfix"}>
            {renderTechnologies()}
        </div>
    );
};

export default Technologies;
