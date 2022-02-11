import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import AddQuestionModal from "./AddQuestionModal";
import arrayMutators, { move } from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { getIn } from "final-form";
import { SimpleSpan } from "../../Global/CustomInputs";
import AddDependentModal from "./AddDependentModal";
import { connect } from "react-redux";
import {
  fetchAllQuestionnaires,
  fetchQuestionnaire,
  resetQuestionnaire,
  addQuestionnaire,
  updateQuestionnaire,
} from "../../../actions";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const renderAnswers = (name) => {
  return (
    <FieldArray name={`${name}.answers`}>
      {({ fields }) =>
        fields.map((name) => {
          return (
            <p>
              <Field name={`${name}.letter`} render={SimpleSpan} />){" "}
              <Field name={`${name}.text`} render={SimpleSpan} />
            </p>
          );
        })
      }
    </FieldArray>
  );
};

const NewQuestionnaire = (props) => {
  const [showAddNewQuestion, setShowAddNewQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [dependentModal, setDependentModal] = useState({ visible: false });
  const { id } = useParams();
  const a = useHistory();

  const addQuestionModal = (question, index) => {
    !!question ? setSelectedQuestion({ ...question, index }) : setSelectedQuestion(null);
    setShowAddNewQuestion(true);
  };
  const dependantModalHandle = (index, formValues) => {
    setDependentModal({
      visible: true,
      current: formValues.questions[index],
      formValues: formValues,
      questionnaires: props.questionnaires,
    });
  };

  useEffect(() => {
    if (id) {
      props.fetchQuestionnaire(id);
    } else {
      props.resetQuestionnaire();
    }
    props.fetchAllQuestionnaires();
  }, []);

  useEffect(() => {
    if (props.error) {
      swal(props.error, "", "error");
    }
  }, [props.error]);

  useEffect(() => {}, [props.questionnaire]);

  const renderQuestions = (formValues, name, index, fields) => {
    return (
      <tr key={name}>
        <td>{index + 1}</td>
        <td>
          <div class="ui vertical  icon buttons mini">
            <button
              type="button"
              class="ui button"
              onClick={() => fields.move(index, index - 1)}
              disabled={index === 0}
            >
              <i class="sort up icon"></i>
            </button>
            <button
              type="button"
              class="ui button"
              onClick={() => fields.move(index, index + 1)}
              disabled={index === fields.length - 1}
            >
              <i class="sort down icon"></i>
            </button>
          </div>
        </td>
        <td>
          <Field name={`${name}.text`} render={SimpleSpan} />
        </td>
        <td>{renderAnswers(name)}</td>
        <td>
          <div className="ui left labeled button" tabIndex="0">
            <span className="ui basic label">
              {getIn(formValues, name).dependantAnswers?.length ?? 0}
            </span>
            <button
              onClick={() => dependantModalHandle(index, formValues)}
              type="button"
              className="ui icon button"
            >
              <i className="edit icon"></i>
            </button>
          </div>
        </td>
        <td>
          <button
            onClick={() => addQuestionModal(getIn(formValues, name), index)}
            type="button"
            className="tiny ui compact primary icon button"
          >
            <i className="pencil alternate icon"></i>
          </button>
        </td>
        <td>
          <button
            onClick={() => fields.remove(index)}
            type="button"
            className="tiny ui compact negative icon button"
          >
            <i className="remove alternate icon"></i>
          </button>
        </td>
      </tr>
    );
  };

  const onSubmit = async (formValues) => {
    if (!formValues.isNew) props.updateQuestionnaire(formValues);
    else {
      props.addQuestionnaire(formValues);
      //a.replace(`new/${props.questionnaire?._id}`);
    }
  };

  return (
    <div className="ui segment">
      <Form
        initialValues={props.questionnaire ?? { isNew: true }}
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        validate={formValidator}
        render={({
          handleSubmit,
          form: {
            mutators: { push, update },
            change,
          },
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <AddQuestionModal
              show={showAddNewQuestion}
              addQuestion={push}
              updateQuestion={update}
              defaultQuestion={selectedQuestion}
              cleanDefaultQuesiton={() => setSelectedQuestion(null)}
              onDismiss={() => {
                setShowAddNewQuestion(false);
              }}
            />
            <AddDependentModal
              show={dependentModal.visible}
              dependentModal={dependentModal}
              onDismiss={() =>
                setDependentModal({
                  visible: false,
                })
              }
              update={update}
              data={dependentModal}
            />
            <div className="ui form">
              <Field name="formName">
                {({ input, meta }) => (
                  <div>
                    <div className="field">
                      <label>Nombre del Formulario</label>
                      <input {...input} type="text" placeholder="Nombre del formulario" />

                      {meta.error && meta.touched && (
                        <div className="ui pointing red basic label">{meta.error}</div>
                      )}
                    </div>
                  </div>
                )}
              </Field>
              {/* <div class="ui checkbox">
                <Field name="principalForm" component="input" type="checkbox" />
                <label>Marcar este formulario como principal</label>
              </div> */}
              <table className="ui compact celled definition table">
                <thead>
                  <tr>
                    <th className="collapsing">#</th>
                    <th className="collapsing">Orden</th>
                    <th>Pregunta</th>
                    <th>Respuestas</th>
                    <th className="collapsing">Dependientes</th>
                    <th className="collapsing">Editar</th>
                    <th className="collapsing">Eliminar</th>
                  </tr>
                </thead>
                <FieldArray name="questions">
                  {({ fields, meta }) => {
                    if (fields.length === 0 && meta.touched)
                      return (
                        <div className="ui pointing red basic label">{meta.error}</div>
                      );
                    return fields.map((name, index) => {
                      return (
                        <tbody>{renderQuestions(values, name, index, fields)}</tbody>
                      );
                    });
                  }}
                </FieldArray>

                <tfoot className="full-width">
                  <tr>
                    <th colSpan="7">
                      <div
                        className="ui right floated small primary labeled icon button"
                        onClick={() => addQuestionModal()}
                      >
                        <i className="question circle icon"></i> Nueva pregunta
                      </div>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <button className="ui primary button" onClick={handleSubmit} type="submit">
                Guardar Formulario
              </button>
            </div>
          </form>
        )}
      ></Form>
      {props.loading && (
        <div className={`ui  active  inverted dimmer`}>
          <div className="ui text loader">Cargando</div>
        </div>
      )}
    </div>
  );
};

const formValidator = (values) => {
  const errors = {};
  if (!values.formName) {
    errors.formName = "Este campo es requerido";
  }
  if (!values.questions) {
    errors.questions = "Es necesario al menos una pregunta";
  }
  return errors;
};

const mapsStateToProps = (state) => {
  return {
    questionnaires: state.questionnaires?.all,
    questionnaire: state.questionnaires?.current,
    loading: state.questionnaires.loading,
    error: state.questionnaires.error,
  };
};

export default connect(mapsStateToProps, {
  fetchAllQuestionnaires,
  fetchQuestionnaire,
  addQuestionnaire,
  resetQuestionnaire,
  updateQuestionnaire,
})(NewQuestionnaire);
