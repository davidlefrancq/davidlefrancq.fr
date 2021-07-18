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

        if (address != undefined && address != null && address != "") {
            return (
                <a
                    href={url}
                    target={"_blank"}
                >
                    <FaMapMarkerAlt size={32}/>
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
