import React, {Fragment} from 'react';
import {FaMapMarkerAlt} from "react-icons/all";

const LinkGoogleMap = (props) => {

    const renderLink = () => {

        const {address, postalCode, city, lat, lng} = props;

        let fullAddress = "";
        fullAddress += address ? address : "";
        fullAddress += address && postalCode ? " " : "";
        fullAddress += postalCode ? postalCode : "";
        fullAddress += postalCode && fullAddress ? " " : "";
        fullAddress += city ? city : "";
        let url = `https://www.google.fr/maps/search/${fullAddress}?hl=fr`;

        if (lat && lng && lat != "" && lng != "") {
            url = `https://www.google.fr/maps/search/${lat},${lng}`;
        }

        if ((city != undefined && city != null && city != "") || (lat && lat)) {
            return (
                <a href={url} target={"_blank"} style={{fontSize:"medium"}}>
                    <FaMapMarkerAlt size={18}/> Google Map
                </a>
            );
        }
    }

    return (
        <Fragment>
            {renderLink()}
        </Fragment>
    );
};

export default LinkGoogleMap;
