import React from "react";
//import header image
import HeaderPage from "./assets/header.svg";

//Using Functional Component
const Header = () => {
  return (
    <div>
      <img src={HeaderPage} alt="headerimage" className="header" />
    </div>
  );
};

export default Header;
