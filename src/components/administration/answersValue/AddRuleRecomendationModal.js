import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { connect } from "react-redux";
import { updateRule } from "../../../actions";
import Modal from "../../Modal/Modal";
import arrayMutators from "final-form-arrays";
import { FieldTextDisplay } from "../../commond/CustomFields";

function AddRuleRecomendationModal({
  show,
  onDismiss,
  recomendations,
  selectedRule,
  updateRule,
}) {
  const [initialValues, setInitialValues] = useState({ recomendations: [] });
  const onSubmit = (formValues) => {
    const idRecomendations = formValues.recomendations
      .filter((rec) => rec.selected === true)
      .map((rec) => rec._id);

    updateRule({ ...selectedRule, recomendations: idRecomendations });

    onDismiss();
  };
  useEffect(() => {
    setInitialValues(
      recomendations.map((rec) => {
        return selectedRule?.recomendations.includes(rec._id)
          ? { ...rec, selected: true }
          : rec;
      })
    );
  }, [selectedRule]);
  if (!selectedRule) return null;

  return (
    <Modal show={show} onDismiss={onDismiss}>
      <h3 class="ui header">{selectedRule?.ruleName}</h3>
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={{ recomendations: initialValues }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
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
                          <FieldTextDisplay
                            name={`${name}.secondRecomendation`}
                          />
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
            <button class="ui primary button" type="submit">
              Agregar
            </button>
            <button onClick={onDismiss} type="button" class="ui button">
              Cancelar
            </button>
          </form>
        )}
      </Form>
    </Modal>
  );
}

export default connect(null, { updateRule })(AddRuleRecomendationModal);
