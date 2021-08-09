import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
// import { useHttpClient } from "../../../hooks/http-hook";
import "../scss/NavLinks.scss";

const NavLinks = () => {
//   const [loadedUser, setLoadedUser] = useState();
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  
  useEffect(()=> {
    // console.log(auth)
  }, [auth])

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
        {/* <img src={process.env.REACT_APP_ASSET_URL + localStorage.getItem("userImage")} alt="" /> */}
          <NavLink onClick={auth.logout} to="/auth">Logout</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
