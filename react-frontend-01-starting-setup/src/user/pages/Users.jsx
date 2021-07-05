import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Jake McFaul",
      image: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
      places: 3,
    },
    {
        id: "u2",
        name: "Zech Drinkhall",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNGdH6wUBTLeEpqTb-53rFi3FoaGBJywyEA&usqp=CAU",
        places: 1,
      },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
