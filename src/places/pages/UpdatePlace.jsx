import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/jsx/Card";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/components/UIElements/jsx/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/jsx/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceForm.scss";

const UpdatePlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory()
  const auth = useContext(AuthContext)

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getPlaceToUpdate = async () => {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`)
        .then((res) => {
          setLoadedPlace(res.data.place);
          let { title, description } = res.data.place;
          setFormData(
            {
              title: {
                value: title,
                isValid: true,
              },
              description: {
                value: description,
                isValid: true,
              },
            },
            true
          );
        })
        .catch((err) => {});
    };
    getPlaceToUpdate();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
      "patch",
      {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value
      },
      {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + auth.token
      }
    )
      .then((res) => {
        history.push('/' + auth.userId + "/places")
      })
      .catch((err) => {});
  };

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place.</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          {isLoading && (
            <div className="center">
              <LoadingSpinner asOverlay />
            </div>
          )}
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            value={loadedPlace.title}
            valid={true}
          ></Input>
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            value={loadedPlace.description}
            valid={true}
          ></Input>
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
