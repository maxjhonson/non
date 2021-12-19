import React from "react";
import { Field } from "react-final-form";

export const FieldTextDisplay = ({ name }) => {
  return (
    <Field
      name={name}
      render={(props) => {
        return <React.Fragment>{props.input.value}</React.Fragment>;
      }}
    />
  );
};
