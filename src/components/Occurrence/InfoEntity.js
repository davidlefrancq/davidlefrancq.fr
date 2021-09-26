import React from 'react';
import {GrFirefox} from "react-icons/all";
import LinkGoogleMap from "../LinkGoogleMap/LinkGoogleMap";
import LogoEntity from "./LogoEntity";

const InfoEntity = (props) => {

    const {entity, animated} = props;
    const {name, address, postalCode, city, lat, lng, url, logo} = entity;
    let urlTitle = url.split("/")[2];

    const renderLink = () => {
        if (urlTitle && urlTitle != "") {
            return (
                // <div className={"d-none d-md-block mt-4 p-3 rounded"} style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
                    <a className={"ml-3 mt-3"} style={{fontSize:"medium"}} href={url} target={"_blank"}>
                        <GrFirefox size={18}/>
                        <span style={{marginLeft: 5}}>{urlTitle}</span>
                    </a>
                // </div>
            );
        }
    };

    const renderGoogleMapLink = () => {
        if ((city && city != "")|| (Number.parseInt(lat) && Number.parseInt(lng))) {
            return (
                // <div className={"d-none d-md-block mt-4 p-3 rounded"} style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
                    <div className={"ml-3 mt-3"}>
                        <LinkGoogleMap address={address} postalCode={postalCode} city={city} lat={lat} lng={lng}/>
                    </div>
                // </div>
            );
        }
    }

    return (
        <div className={`mt-2 ${animated}`}>

            <div className={"p-3 rounded"} style={{backgroundColor: "rgba(33,33,33,1)"}}>
                <LogoEntity url={url} logo={logo}/>
                <h3 className={"mt-2"} style={{fontSize: "large"}}>{name}</h3>
                <div className={"mb-2"}>{postalCode} {city}</div>

                {renderLink()}

                {renderGoogleMapLink()}

            </div>

        </div>
    );
};

export default InfoEntity;
