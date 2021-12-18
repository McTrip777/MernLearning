import React, { useState } from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../../UIElements/jsx/Backdrop";
import "../scss/MainNavigation.scss";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleSideDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  return (
    <>
      {drawerIsOpen && (<Backdrop onClick={toggleSideDrawer}/>)}
        <SideDrawer show={drawerIsOpen} onClick={toggleSideDrawer}>
          {/* <button onClick={toggleSideDrawer}>X</button> */}
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={toggleSideDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
