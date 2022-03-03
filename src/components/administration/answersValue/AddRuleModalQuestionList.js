import React from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { FieldTextDisplay } from "../../commond/CustomFields";

const AddRuleModalQuestionList = ({ name }) => {
  return (
    <div className="ui segment" key={name}>
      <h5 className="ui header">
        <FieldTextDisplay name={`${name}.text`} />
      </h5>
      <FieldArray name={`${name}.answers`}>
        {({ fields }) =>
          fields.map((name) => {
            return (
              <div className="inline fields">
                <div className="field">
                  <FieldTextDisplay name={`${name}.letter`} />
                </div>
                <div className="field">
                  <FieldTextDisplay name={`${name}.text`} />
                </div>
                <div className="field">
                  <Field name={`${name}.selected`} component="input" type="checkbox" />
                </div>
              </div>
            );
          })
        }
      </FieldArray>
    </div>
  );
};

export default AddRuleModalQuestionList;
