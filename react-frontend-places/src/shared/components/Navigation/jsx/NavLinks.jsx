import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
// import { useHttpClient } from "../../../hooks/http-hook";
import Avatar from "../../UIElements/jsx/Avatar";
import Dropdown from "../../UIElements/jsx/Dropdown";
import "../scss/NavLinks.scss";

const NavLinks = () => {
  //   const [loadedUser, setLoadedUser] = useState();
  //   const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    // console.log(auth)
  }, [auth]);

  return (
    <ul className="nav-links">
      <li>
        <NavLink exact to="/">
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
            <Dropdown/>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
