import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "../scss/SideDrawer.scss";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.querySelector("#side-hook"));
};

export default SideDrawer;
