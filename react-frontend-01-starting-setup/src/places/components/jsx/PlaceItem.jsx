import React, { useState } from "react";

import Button from "../../../shared/components/FormElements/Button";
import Card from "../../../shared/components/UIElements/jsx/Card";
import Modal from "../../../shared/components/UIElements/jsx/Modal";

import "../scss/PlaceItem.scss";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const toggleMapHandler = () => {
    setShowMap(!showMap);
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={toggleMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={toggleMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>The Map</h2>
        </div>
      </Modal>
      <li className="place-item">
        <Card>
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>Location: {props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={toggleMapHandler}>VIEW ON MAP</Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
