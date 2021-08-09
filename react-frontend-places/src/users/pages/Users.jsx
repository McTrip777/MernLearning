import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/jsx/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/jsx/LoadingSpinner";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUsersRequest = async () => {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users`,
        "get",
        null,
        {
          "Content-Type": "application/json"
        }
      )
        .then((res) => {
          setLoadedUsers(res.data.users);
        })
        .catch((err) => {});
    };
    getUsersRequest();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
