import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/jsx/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/jsx/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PlaceList from "../components/jsx/PlaceList";
// import { AuthContext } from "../../shared/context/auth-context";

const UserPlaces = () => {
//   const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [placesList, setPlacesList] = useState();

  const userId = useParams().userId

  useEffect(() => {
    const getPlaces = async () => {
      await sendRequest(`http://localhost:5000/api/places/user/${userId}`)
        .then((res) => {
          setPlacesList(res.data.userPlaceList);
        // console.log(res.data.userPlaceList)
        })
        .catch((err) => {});
    };
    getPlaces();
  }, [sendRequest, userId]);

  const  placeDeletedHandler = deletedId => {
    setPlacesList(prev => prev.filter(place => place.id !== deletedId))
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && placesList && <PlaceList onDelete={placeDeletedHandler} items={placesList} />}
    </>
  );
};

export default UserPlaces;
