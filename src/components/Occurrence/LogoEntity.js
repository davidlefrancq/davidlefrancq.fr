import React from 'react';

const LogoEntity = (props) => {

    const {url, logo} = props;

    const renderLogo = () => {
        if (logo && logo !== "") {
            return <img style={{height: 75, borderRadius: 40}} src={`./image/${logo}`} alt={""} />;
        }
    }

    const renderLink = () => {
        if(url && url !== ""){
            return(
                <a href={url} target={"_blank"} rel={"noopener noreferrer"}>
                    {renderLogo()}
                </a>
            );
        }else{
            return renderLogo();
        }
    }

    return (
        <>
            {renderLink()}
        </>
    );
};

export default LogoEntity;
