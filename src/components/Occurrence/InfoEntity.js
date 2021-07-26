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
                <div className={"mt-4"}>
                    <a className={"ml-3 mr-3"} href={url} target={"_blank"}>
                        <GrFirefox size={24}/>
                        <span style={{marginLeft: 5}}>{urlTitle}</span>
                    </a>
                </div>
            );
        }
    };

    return (
        <div className={`pt-2 ${animated}`}>

            <LogoEntity url={url} logo={logo}/>
            <h3 className={"mt-2"} style={{fontSize: "large"}}>{name}</h3>
            <div>{postalCode} {city}</div>

            {renderLink()}

            <div className={"mt-4"}>
                <div className={"ml-3"}>
                    <LinkGoogleMap address={address} postalCode={postalCode} city={city} lat={lat} lng={lng}/>
                </div>
            </div>

        </div>
    );
};

export default InfoEntity;
