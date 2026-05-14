import { useState } from "react";

type FormValue = string | number | boolean;
type FormState = Record<string, FormValue>;
type FormChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

function getInputValue(event: FormChangeEvent): FormValue {
  const { type, value } = event.target;

  if (type === "checkbox") {
    return (event.target as HTMLInputElement).checked;
  }

  if (type === "number") {
    const { valueAsNumber } = event.target as HTMLInputElement;
    return Number.isNaN(valueAsNumber) ? "" : valueAsNumber;
  }

  return value;
}

export function useFormInputs<T extends FormState>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: FormChangeEvent) => {
    const { name } = event.target;
    const nextValue = getInputValue(event);

    setValues((currentValues) => ({
      ...currentValues,
      [name]: nextValue,
    }));
  };

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const reset = (nextValues?: T) => {
    setValues(nextValues ?? initialValues);
  };

  return {
    values,
    handleChange,
    setValues,
    setFieldValue,
    reset,
  };
}
