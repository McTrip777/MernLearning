import React, { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formISValid = true;
      for (const inputId in state.inputs) {
        if(!state.inputs[inputId]){
          continue
        }
        if (inputId === action.inputId) {
          formISValid = formISValid && action.isValid;
        } else {
          formISValid = formISValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value.trim(),
            isValid: action.isValid,
          },
        },
        isValid: formISValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formISValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formISValid: formValidity,
    });
  }, []);

  const defaultSubmit = event => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  return [formState, inputHandler, setFormData, defaultSubmit];
};
