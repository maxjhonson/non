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

export const FieldTextInput = ({ name, label }) => {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className="field">
          <label>{label}</label>
          <input {...input} />
          {meta.error && meta.touched && (
            <div className="ui pointing red basic label">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export const FieldSelectInput = ({ name, label, options }) => {
  const optionsRendered = options.map(({ text, value }) => (
    <option value={value}>{text}</option>
  ));
  optionsRendered.unshift(<option value="">--{label}--</option>);
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className="field">
          <label>{label}</label>
          <select {...input}>{optionsRendered}</select>
          {meta.error && meta.touched && (
            <div className="ui pointing red basic label">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export const FieldCheckboxtInput = ({ name, label }) => {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className="field">
          <label>{label}</label>
          <input {...input} />
          {meta.error && meta.touched && (
            <div className="ui pointing red basic label">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
