import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import createDecorator from "final-form-calculate";
import { getIn } from "final-form";
import { addRule } from "../../../actions";
import { connect } from "react-redux";
import { ObjectID } from "bson";
import Modal from "../../Modal/Modal";
import { FieldTextDisplay, FieldTextInput } from "../../commond/CustomFields";
import AddRuleModalQuestionList from "./AddRuleModalQuestionList";
import Loader from "../../commond/Loader";

const AddRuleModal = ({
  questionnaire,
  recomendations,
  addRule,
  onDismiss,
  selectedRule,
  show,
}) => {
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    setInitialValues({
      questions: questionnaire.questions,
      recomendations: recomendations,
      ruleValue: 0,
    });
  }, []);

  if (!questionnaire) return <div>Loading</div>;

  const onSubmit = (formValue) => {
    console.log(formValue);
  };

  const renderRuleValue = (props) => {
    const onchange = (amount) => {
      const value = !props.input.value ? 0 : props.input.value;
      props.input.onChange(value + amount);
    };
    return (
      <div className="inline field">
        <Loader active={false} />
        <label>Valor de la combinación Seleccionada</label>
        <div className="ui buttons">
          <button className="ui button" type="button" onClick={() => onchange(-1)}>
            -
          </button>
          <div className="or" data-text={props.input.value}></div>
          <button
            className="ui positive button"
            type="button"
            onClick={() => onchange(1)}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const decorator = createDecorator(
    {
      field: /questions\[\d+\]\.answers\[\d+\]\.selected/,
      updates: (value, name, allValues) => {
        const answerId = getIn(allValues, name.replace("selected", "_id"));
        const answersIds = getIn(allValues, "answersIds") ?? [];
        if (value) {
          answersIds.push(answerId);
        } else {
          const index = answersIds.indexOf(answerId);
          answersIds.splice(index, 1);
        }
        return { answersIds: answersIds };
      },
    },
    {
      field: /recomendations\[\d+\]\.selected/,
      updates: (value, name, allValues) => {
        const recomendationId = getIn(allValues, name.replace("selected", "_id"));
        const recomendationsIds = getIn(allValues, "recomendationsIds") ?? [];
        if (value) {
          recomendationsIds.push(recomendationId);
        } else {
          const index = recomendationsIds.indexOf(recomendationId);
          recomendationsIds.splice(index, 1);
        }
        return { recomendationsIds: recomendationsIds };
      },
    }
  );

  return (
    <Modal show={show} onDismiss={onDismiss}>
      <Form
        decorators={[decorator]}
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="ui form">
            <div className="field">
              <label>Nombre de la regla:</label>
              <FieldTextInput name="ruleName" />
            </div>
            <FieldArray name="questions">
              {({ fields }) =>
                fields.map((name) => {
                  return <AddRuleModalQuestionList name={name} />;
                })
              }
            </FieldArray>
            <Field name="ruleValue" render={renderRuleValue} />

            <table class="ui celled table">
              <thead>
                <tr>
                  <th>Recomendación</th>
                  <th>Recomendación Alterna</th>
                  <th></th>
                </tr>
              </thead>

              <FieldArray name="recomendations">
                {({ fields }) => (
                  <tbody>
                    {fields.map((name, index) => (
                      <tr>
                        <td>
                          <FieldTextDisplay name={`${name}.recomendation`} />
                        </td>
                        <td>
                          <FieldTextDisplay name={`${name}.secondRecomendation`} />
                        </td>
                        <td>
                          <Field
                            name={`${name}.selected`}
                            component="input"
                            type="checkbox"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </FieldArray>
            </table>

            <button className="ui primary button" type="submit">
              Agregar Regla
            </button>
            <button className="ui  button" type="submit" onClick={onDismiss}>
              Cancelar
            </button>
          </form>
        )}
      ></Form>
    </Modal>
  );
};

export default connect(null, { addRule })(AddRuleModal);
