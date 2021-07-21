import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/jsx/Card";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.scss";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formState, inputHandler, setFormData, defaultSubmit] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid,
        formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const authSubmitHandler = event => {
      event.preventDefault()
      auth.login()
  }

  return (
    <Card className="authentication">
      <h2>{isLogin ? "Login Required" : "Create an Account"}</h2>
      <hr />
      <form className="place-form" onSubmit={authSubmitHandler}>
        {!isLogin && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            // value={formState.inputs.email.value}
            // valid={formState.inputs.email.isValid}
            errorText="Please enter a your name"
          ></Input>
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          value={formState.inputs.email.value}
          valid={formState.inputs.email.isValid}
          errorText="Please enter a valid email"
        ></Input>
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          value={formState.inputs.password.value}
          valid={formState.inputs.password.isValid}
          errorText="Please enter at least 5 characters"
        ></Input>
        <Button type="submit" disabled={!formState.isValid}>
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {isLogin ? "Sign Up" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
