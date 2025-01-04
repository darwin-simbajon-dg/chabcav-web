import React from "react";
import HeaderProperties from "../models/HeaderProperties";

const Header: React.FC<HeaderProperties> = ({bannerImage}) => {
    return (
        <header style={{background: `url('${bannerImage}') no-repeat center center`,
            backgroundSize: "cover", // Ensures the image covers the entire area
            height: "150px",}}>
        </header>
    );

};

export default Header;
