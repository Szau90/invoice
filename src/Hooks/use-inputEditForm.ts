import React, { useState } from "react";

export const useInputEdit = (
  validateValue: (value: string) => boolean,
  initialValue: string
) => {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue);

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

export const useNumInputEdit = (
  validateValue: (value: number) => boolean,
  initialValue: number
) => {
  const [enteredNumValue, setEnteredNumValue] = useState<number>(initialValue);
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

export const useDateInputEdit = (
  validateValue: (value: Date) => boolean,
  initialValue: Date
) => {
  const [enteredDate, setEnteredDate] = useState(initialValue);
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
    setEnteredDate(initialValue);
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
