import React, { useState } from "react";

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>("");

  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    textChangeHandler,
    reset,
  };
};

export const useNumInput = (validateValue: (value: number) => boolean) => {
  const [enteredNumValue, setEnteredNumValue] = useState<number>(0);
  const [isTouched, setIsTouched] = useState(false);

  const numValueIsValid = validateValue(enteredNumValue);

  const numValueHasError = !numValueIsValid && isTouched;

  const numValueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredNumValue(event.target.valueAsNumber);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredNumValue(0);
    setIsTouched(false);
  };

  return {
    value: enteredNumValue,

    isValid: numValueIsValid,
    numValueHasError,
    numValueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export const useDateInput = (validateValue: (value: Date) => boolean) => {
  const date = new Date(Date.now());
  const [enteredDate, setEnteredDate] = useState(date);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredDate);
  const dateValueHasError = !valueIsValid && isTouched;

  const dateValueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    setEnteredDate(newDate);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredDate(date);
    setIsTouched(false);
  };

  return {
    value: enteredDate,
    isValid: valueIsValid,
    dateValueHasError,
    dateValueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
