import React from "react";
import UserItem from "./UserItem";

import "./UsersList.css";

const UsersList = (props) => {
  return props.items.length === 0 ? (
    <div className="center">
      <h2>No Users Found</h2>
    </div>
  ) : (
    <ul className="user-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
