import React from "react";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";

const NavBar = () => {
  return (
    <div>
      <div>
        <span>App Name</span>
      </div>
      <div>
        <NavLinks />
      </div>
      <div>
        <UserLinks />
      </div>
    </div>
  );
};

export default NavBar;
