import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import Modal from "../../Modal/Modal";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { SimpleSpan } from "../../Global/CustomInputs";
import { connect } from "react-redux";
import { fetchAllQuestionnaires } from "../../../actions";

function AddDependentModal({ onDismiss, data, update }) {
  const { formValues, current, questionnaires } = data;
  const [initialValues, setInitialValues] = useState(null);

  const onSubmit = (localFormValues) => {
    const selectedAnswers = [];
    localFormValues.questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.selected) selectedAnswers.push(answer._id);
      });
    });
    const index = formValues.questions.findIndex((q) => q._id === current._id);
    update("questions", index, {
      ...current,
      answers: localFormValues.answers,
      dependantAnswers: selectedAnswers,
    });
    onDismiss();
  };

  useEffect(() => {
    const index = formValues?.questions.findIndex((q) => q._id === current._id);
    const questions = formValues?.questions.filter(
      (q, i) => q._id !== current?._id && i < index
    );
    setInitialValues({ ...current, questions });
    // fetchAllQuestionnaires();
  }, [data]);

  const renderCurrentAnswers = () => {
    console.log(questionnaires);
    const renderOptions = questionnaires?.map((questionnaire) => (
      <option value={questionnaire._id}> {questionnaire.formName}</option>
    ));
    return current?.answers.map((answer, i) => {
      return (
        <tr>
          <td>{answer.text}</td>
          <td>
            <Field name={`answers[${i}][dependantForm]formId`} component="select">
              <option value="">N/A</option>
              {renderOptions}
            </Field>
          </td>
          <td>
            <Field name={`answers[${i}][dependantForm]quantity`} component="select">
              <option value="">0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Field>
          </td>
        </tr>
      );
    });
  };

  return (
    <Modal show={data.visible} onDismiss={onDismiss}>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h4 className="ui header">Registro de dependientes</h4>
            <div className="ui segment">
              <h5 className="ui header">Formulario Dependiente de preguntas</h5>
              <table className="ui celled table">
                <thead>
                  <tr>
                    <th>Respuesta</th>
                    <th>Formulario Dependiente</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>{renderCurrentAnswers()}</tbody>
              </table>
            </div>
            <h6 className="ui header">
              Esta pregunta será dependiente de todas las respuesta que marque a
              continuación:
            </h6>
            <div className="ui divider"></div>

            <h4 className="ui header">
              <Field name="text" render={SimpleSpan} />
            </h4>
            <div className="ui divider"> </div>

            <FieldArray name="questions">
              {({ fields }) =>
                fields.map((name, index) => {
                  return (
                    <ul>
                      <li class="item">
                        <h4 className="ui header">
                          <Field name={`${name}.text`} render={SimpleSpan} />
                        </h4>
                        <ul>
                          <FieldArray name={`${name}.answers`}>
                            {({ fields }) =>
                              fields.map((name, index) => {
                                const isSelected = current.dependantAnswers?.includes(
                                  fields.value[index]._id
                                );
                                return (
                                  <li>
                                    <div class="ui checkbox">
                                      <Field
                                        name={`${name}.selected`}
                                        component="input"
                                        type="checkbox"
                                        defaultValue={isSelected}
                                      />
                                      <label>
                                        <Field
                                          name={`${name}.text`}
                                          render={SimpleSpan}
                                        />
                                      </label>
                                    </div>
                                  </li>
                                );
                              })
                            }
                          </FieldArray>
                        </ul>
                      </li>
                    </ul>
                  );
                })
              }
            </FieldArray>
            <div className="ui divider"></div>
            <button className="ui button" onClick={onDismiss}>
              Cerrar
            </button>
            <button type="submit" className="ui primary button">
              Agregar
            </button>
          </form>
        )}
      ></Form>
    </Modal>
  );
}

const mapsStateToProps = (state) => {};

export default connect(null, { fetchAllQuestionnaires })(AddDependentModal);
