import React, { useState, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/jsx/Card";
import Modal from "../../../shared/components/UIElements/jsx/Modal";
import Map from "../../../shared/components/UIElements/jsx/Map";
import ErrorModal from "../../../shared/components/UIElements/jsx/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/jsx/LoadingSpinner";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import "../scss/PlaceItem.scss";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfimModal, setShowComfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const toggleMapHandler = () => {
    setShowMap((prevMap) => !prevMap);
  };

  const toggleDeleteWarningHandler = () => {
    setShowComfirmModal((prevShow) => !prevShow);
  };

  const confirmDeleteHandler = async () => {
    setShowComfirmModal((prevShow) => !prevShow);

    await sendRequest(
      `http://localhost:5000/api/places/${props.id}`,
      "delete",
      null,
      { Authorization: "Bearer " + auth.token }
    )
      .then((res) => {
        props.onDelete(props.id);
      })
      .catch((err) => {});
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={toggleMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={toggleMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfimModal}
        onCancel={toggleDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={toggleDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Yes, delete
            </Button>
          </>
        }
      >
        <p>Are you sure you would like to delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>Location: {props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={toggleMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={toggleDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
