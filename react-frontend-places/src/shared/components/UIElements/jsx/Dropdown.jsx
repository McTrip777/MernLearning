import React, { useContext } from "react";
import Avatar from "./Avatar";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import "../scss/Dropdown.scss";

const Dropdown = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="dropdown user-item__image center">
      <Avatar
        image={
          process.env.REACT_APP_ASSET_URL + localStorage.getItem("userImage")
        }
        alt="avatar"
        style={{ width: "75%", height: "75%" }}
      />
      <div className="dropdown-content" id="dropdown">
        <NavLink to={"/profile/" + auth.userId}>
          Profile
        </NavLink>
        <NavLink onClick={auth.logout} to="/auth">
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Dropdown;
