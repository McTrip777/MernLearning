import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PlacesList from "../../places/components/jsx/PlaceList";
import Card from "../../shared/components/UIElements/jsx/Card";
import Avatar from "../../shared/components/UIElements/jsx/Avatar";

const Profile = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState(null);
  const [placesList, setPlacesList] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUserInfo = async () => {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
      ).then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    };
    getUserInfo();
  }, [sendRequest]);

  useEffect(() => {
    const getPlaces = async () => {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
      )
        .then((res) => {
          setPlacesList(res.data.userPlaceList);
          // console.log(res.data.userPlaceList)
        })
        .catch((err) => {});
    };
    getPlaces();
  }, [sendRequest, userId]);

  return (
    <div>
      {!isLoading && user && (
        <div className="place-list">
          <Card className="place-item__content">
            <div className="place-item__image">
              <img
                src={process.env.REACT_APP_ASSET_URL + user.user.image}
                alt="profile Image"
              />
            </div>
            <div className="place-item__info">
              <h2>{user.user.name}</h2>
              <p>{user.user.email}</p>
            </div>
          </Card>
        </div>
      )}
      {!isLoading && user && placesList && (
        <PlacesList user={user.user} items={placesList} />
      )}
    </div>
  );
};

export default Profile;
